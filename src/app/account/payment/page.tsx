"use client";

import { useState, useEffect } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

function AddCardForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // Créer le SetupIntent
      const res = await fetch("/api/payment/setup-intent", { method: "POST" });
      const { clientSecret } = await res.json();

      // Confirmer avec Stripe Elements
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Erreur lors de l'ajout");
      } else {
        toast.success("Carte ajoutee avec succes");
        setShow(false);
        onSuccess();
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
          style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          <Plus className="w-4 h-4" />
          Ajouter une carte
        </button>
      ) : (
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h3 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Nouvelle carte
          </h3>
          <div
            className="p-4 mb-6"
            style={{ border: "1px solid rgba(13,13,13,0.15)", borderRadius: "4px" }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#0D0D0D",
                    fontFamily: "Georgia, serif",
                    "::placeholder": { color: "rgba(13,13,13,0.3)" },
                  },
                },
              }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 cursor-pointer"
              style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer"
              style={{ border: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentPageContent() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMethods = async () => {
    setLoading(true);
    const res = await fetch("/api/payment/methods");
    const data = await res.json();
    setMethods(data.methods || []);
    setLoading(false);
  };

  useEffect(() => { fetchMethods(); }, []);

  const handleDelete = async (id: string) => {
    await fetch("/api/payment/methods", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: id }),
    });
    toast.success("Carte supprimee");
    fetchMethods();
  };

  const brandLabel: Record<string, string> = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Paiement
          </p>
        </div>
        <h1 className="text-3xl font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}>
          Mes moyens de paiement
        </h1>
      </div>

      {/* Cartes enregistrees */}
      <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
        <h2 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
          Cartes enregistrees
        </h2>

        {loading ? (
          <p className="text-sm" style={{ color: "rgba(13,13,13,0.4)" }}>Chargement...</p>
        ) : methods.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <CreditCard className="w-5 h-5" style={{ color: "rgba(13,13,13,0.2)" }} />
            <p className="text-sm italic" style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}>
              Aucune carte enregistree
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {methods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4"
                style={{ border: "1px solid rgba(13,13,13,0.06)", background: "rgba(13,13,13,0.02)" }}
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5" style={{ color: "#C9A96E" }} />
                  <div>
                    <p className="text-sm font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                      {brandLabel[method.card.brand] || method.card.brand} •••• {method.card.last4}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(13,13,13,0.4)" }}>
                      Expire {method.card.exp_month.toString().padStart(2, "0")}/{method.card.exp_year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 transition-colors hover:opacity-50 cursor-pointer"
                  style={{ color: "rgba(13,13,13,0.3)" }}
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ajouter une carte */}
      <AddCardForm onSuccess={fetchMethods} />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPageContent />
    </Elements>
  );
}