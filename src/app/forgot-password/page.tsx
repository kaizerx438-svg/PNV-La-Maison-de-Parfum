"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AuthForm from "@/components/shared/AuthForm";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Veuillez entrer votre email");
      return;
    }
    setLoading(true);
    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      });
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Verifiez votre email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Mot de passe oublie"
      subtitle="Entrez votre email pour recevoir un lien de reinitialisation"
      footer={{
        text: "Vous vous souvenez ?",
        linkText: "Se connecter",
        linkHref: "/login",
      }}
    >
      {sent ? (
        <div className="text-center space-y-4 py-4">
          <p className="text-sm" style={{ color: "#C9A96E", fontFamily: "Georgia, serif" }}>
            Un email a ete envoye a <strong>{email}</strong>
          </p>
          <p className="text-xs" style={{ color: "rgba(245,239,230,0.4)" }}>
            Verifiez votre boite mail et cliquez sur le lien pour reinitialiser votre mot de passe.
          </p>
          <Link
            href="/login"
            className="block text-[10px] tracking-[0.3em] uppercase mt-4 hover:opacity-70 transition-opacity"
            style={{ color: "rgba(245,239,230,0.4)" }}
          >
            Retour a la connexion
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
              style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
            />
          </div>

          {error && (
            <p className="text-[11px] text-center" style={{ color: "#C9A96E" }}>
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.6)",
              color: "#C9A96E",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </div>
      )}
    </AuthForm>
  );
}