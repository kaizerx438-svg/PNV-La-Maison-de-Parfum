"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface UserData {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
}

const EUROPE_CODES = ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "GB"];

export default function CheckoutClient({ user }: { user: UserData | null }) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "FR",
  });

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length === 0) router.push("/cart");
      setCart(parsed);
    } else {
      router.push("/cart");
    }
  }, [router]);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const isEurope = EUROPE_CODES.includes(form.country);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address || !form.city) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    if (isEurope && !form.postalCode) {
      toast.error("Le code postal est obligatoire pour les pays europeens");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          shippingAddress: form,
        }),
      });

      const data = await res.json();
      if (data.url) {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cart-updated"));
        window.location.href = data.url;
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Formulaire */}
      <div className="lg:col-span-2 space-y-8">

        {/* Informations personnelles */}
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h2
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Informations personnelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Nom complet *
              </Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Email *
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Telephone (optionnel)
              </Label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
          </div>
        </div>

        {/* Adresse de livraison */}
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h2
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Adresse de livraison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Adresse *
              </Label>
              <Input
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                placeholder="12 rue de la Paix"
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Ville *
              </Label>
              <Input
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                placeholder="Paris"
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Code postal{" "}
                {!isEurope && (
                  <span style={{ color: "rgba(13,13,13,0.35)" }}>(optionnel)</span>
                )}
              </Label>
              <Input
                value={form.postalCode}
                onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                placeholder={isEurope ? "75001" : "Si disponible"}
                className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(13,13,13,0.5)" }}
              >
                Pays
              </Label>
              <select
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                className="w-full bg-transparent text-sm focus:outline-none cursor-pointer py-2"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }}
              >
                <optgroup label="Europe">
                  {[
                    { code: "FR", label: "France" },
                    { code: "BE", label: "Belgique" },
                    { code: "CH", label: "Suisse" },
                    { code: "LU", label: "Luxembourg" },
                    { code: "DE", label: "Allemagne" },
                    { code: "ES", label: "Espagne" },
                    { code: "IT", label: "Italie" },
                    { code: "NL", label: "Pays-Bas" },
                    { code: "PT", label: "Portugal" },
                    { code: "GB", label: "Royaume-Uni" },
                  ].map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Afrique">
                  {[
                    { code: "GA", label: "Gabon" },
                    { code: "MA", label: "Maroc" },
                    { code: "CI", label: "Cote d'Ivoire" },
                    { code: "SN", label: "Senegal" },
                    { code: "CM", label: "Cameroun" },
                  ].map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé commande */}
      <div className="lg:col-span-1">
        <div
          className="p-6 sticky top-24"
          style={{ background: "#0D0D0D", border: "1px solid rgba(201,169,110,0.15)" }}
        >
          <h2
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Votre commande
          </h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.product_id} className="flex gap-3 items-center">
                {item.image_url && (
                  <div
                    className="w-12 h-16 flex-shrink-0 relative overflow-hidden"
                    style={{ background: "#EDE3D5" }}
                  >
                    <Image
                      src={item.image_url}
                      alt={item.product_name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p
                    className="text-xs font-light"
                    style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
                  >
                    {item.product_name}
                  </p>
                  <p className="text-[10px]" style={{ color: "rgba(245,239,230,0.4)" }}>
                    x{item.quantity}
                  </p>
                </div>
                <span className="text-xs" style={{ color: "#F5EFE6" }}>
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>

          <div
            className="space-y-2 mb-6"
            style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "16px" }}
          >
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "rgba(245,239,230,0.5)" }}>
                Livraison
              </span>
              <span className="text-xs" style={{ color: "#C9A96E" }}>
                Gratuite
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-sm font-light"
                style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
              >
                Total
              </span>
              <span
                className="text-sm font-light"
                style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
              >
                {total.toFixed(2)} €
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
            className="w-full py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] disabled:opacity-50 cursor-pointer"
            style={{
              background: "#C9A96E",
              color: "#0D0D0D",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            {loading ? "Chargement..." : "Payer maintenant"}
          </button>

          <p
            className="text-[10px] text-center mt-3"
            style={{ color: "rgba(245,239,230,0.3)" }}
          >
            Paiement securise par Stripe
          </p>
        </div>
      </div>
    </div>
  );
}