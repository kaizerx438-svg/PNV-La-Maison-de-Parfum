"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function PreorderCheckoutClient({ user }: { user: UserData | null }) {
  const router = useRouter();
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

    // Récupérer les items de précommande depuis sessionStorage
    const preorderItems = sessionStorage.getItem("preorder_cart");
    if (!preorderItems) {
      toast.error("Votre panier de precommande est vide");
      router.push("/precommande");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: JSON.parse(preorderItems),
          shippingAddress: form,
        }),
      });

      const data = await res.json();
      if (data.url) {
        sessionStorage.removeItem("preorder_cart");
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
    <div className="max-w-2xl mx-auto space-y-8">

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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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

      {/* Adresse */}
      <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
        <h2
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Adresse de livraison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
              Code postal {!isEurope && <span style={{ color: "rgba(13,13,13,0.35)" }}>(optionnel)</span>}
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
            <Label className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
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
                  { code: "GA", label: "Gabon" },
                  { code: "MA", label: "Maroc" },
                ].map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 cursor-pointer"
          style={{
            background: "#0D0D0D",
            color: "#C9A96E",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          {loading ? "Chargement..." : "Payer ma precommande"}
        </button>
      </div>
    </div>
  );
}