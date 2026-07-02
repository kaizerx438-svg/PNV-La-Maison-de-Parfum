"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsFormData } from "@/schemas/user.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const EUROPE_COUNTRIES = [
  { code: "FR", label: "France" },
 
];

const AFRICA_COUNTRIES = [
  { code: "GA", label: "Gabon" },
  { code: "MA", label: "Maroc" },

];

const EUROPE_CODES = EUROPE_COUNTRIES.map((c) => c.code);

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("FR");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const isEurope = EUROPE_CODES.includes(selectedCountry);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      country: "FR",
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        if (data.user) {
          setValue("name", data.user.name || "");
          setValue("email", data.user.email || "");
          setValue("phone", data.user.phone || "");
          setValue("address", data.user.address || "");
          setValue("city", data.user.city || "");
          setValue("postalCode", data.user.postalCode || "");
          setValue("country", data.user.country || "FR");
          setSelectedCountry(data.user.country || "FR");
        }
      } catch {
        if (session?.user) {
          setValue("name", session.user.name || "");
          setValue("email", session.user.email || "");
        }
      }
    };
    loadUserData();
  }, [session, setValue]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    try {
      await authClient.updateUser({ name: data.name });
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      toast.success("Informations mises a jour");
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    if (!currentPassword) {
      setPasswordError("Veuillez saisir votre mot de passe actuel");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caracteres");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    setIsChangingPassword(true);
    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      toast.success("Mot de passe modifie avec succes");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      setPasswordError("Mot de passe actuel incorrect");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Mon profil
          </p>
        </div>
        <h1 className="text-3xl font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}>
          Parametres
        </h1>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

        {/* Informations personnelles */}
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h2 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Informations personnelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Nom complet
              </Label>
              <Input id="name" {...register("name")} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              {errors.name && <p className="text-[10px]" style={{ color: "#6B1A2A" }}>{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Email
              </Label>
              <Input id="email" type="email" {...register("email")} disabled className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0 disabled:opacity-40 cursor-not-allowed" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              <p className="text-[10px]" style={{ color: "rgba(13,13,13,0.35)" }}>L&apos;email ne peut pas etre modifie</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Telephone (optionnel)
              </Label>
              <Input id="phone" type="tel" placeholder="+33 6 00 00 00 00" {...register("phone")} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
            </div>
          </div>
        </div>

        {/* Adresse de livraison */}
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h2 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Adresse de livraison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="country" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Pays
              </Label>
              <select
                id="country"
                {...register("country")}
                onChange={(e) => { setValue("country", e.target.value); setSelectedCountry(e.target.value); }}
                value={selectedCountry}
                className="w-full bg-transparent text-sm focus:outline-none cursor-pointer"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D", padding: "8px 0", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                <optgroup label="Europe">
                  {EUROPE_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </optgroup>
                <optgroup label="Afrique">
                  {AFRICA_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </optgroup>
              </select>
              {errors.country && <p className="text-[10px]" style={{ color: "#6B1A2A" }}>{errors.country.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Adresse
              </Label>
              <Input id="address" placeholder="12 rue de la Paix" {...register("address")} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              {errors.address && <p className="text-[10px]" style={{ color: "#6B1A2A" }}>{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Code postal {!isEurope && <span style={{ color: "rgba(13,13,13,0.35)" }}>(optionnel)</span>}
              </Label>
              <Input id="postalCode" placeholder={isEurope ? "75001" : "Si disponible"} {...register("postalCode")} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              {errors.postalCode && <p className="text-[10px]" style={{ color: "#6B1A2A" }}>{errors.postalCode.message}</p>}
              {isEurope && <p className="text-[10px]" style={{ color: "rgba(13,13,13,0.35)" }}>{selectedCountry === "FR" ? "Format : 5 chiffres (ex: 75001)" : "Code postal obligatoire"}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Ville
              </Label>
              <Input id="city" placeholder="Paris" {...register("city")} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              {errors.city && <p className="text-[10px]" style={{ color: "#6B1A2A" }}>{errors.city.message}</p>}
            </div>
          </div>
        </div>

        {/* Bouton enregistrer */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-10 py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 cursor-pointer"
            style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>

        {/* Mot de passe */}
        <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <h2 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Modifier le mot de passe
          </h2>
          <div className="grid grid-cols-1 gap-6">

            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Mot de passe actuel
              </Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Nouveau mot de passe
              </Label>
              <Input id="newPassword" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
              <p className="text-[10px]" style={{ color: "rgba(13,13,13,0.35)" }}>Minimum 8 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Confirmer le nouveau mot de passe
              </Label>
              <Input id="confirmNewPassword" type="password" placeholder="••••••••" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D" }} />
            </div>

            {passwordError && (
              <p className="text-[11px]" style={{ color: "#6B1A2A" }}>{passwordError}</p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="px-10 py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 cursor-pointer"
              style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {isChangingPassword ? "Modification..." : "Changer le mot de passe"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}