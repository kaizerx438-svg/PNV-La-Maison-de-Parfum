"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AuthForm from "@/components/shared/AuthForm";
import zxcvbn from "zxcvbn";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token") || "";

  const strength = password.length > 0 ? zxcvbn(password) : null;
  const strengthScore = strength?.score ?? 0;
  const strengthConfig = [
    { label: "Tres faible", color: "#A32D2D", width: "20%" },
    { label: "Faible", color: "#C9622A", width: "40%" },
    { label: "Moyen", color: "#C9A96E", width: "60%" },
    { label: "Fort", color: "#5B8C5A", width: "80%" },
    { label: "Tres fort", color: "#2E6B2E", width: "100%" },
  ];
  const currentStrength = password.length > 0 ? strengthConfig[strengthScore] : null;

  const handleSubmit = async () => {
    setError("");
    if (password.length < 12) {
      setError("Minimum 12 caracteres");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Au moins une majuscule");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Au moins un chiffre");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Au moins un caractere special");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      await authClient.resetPassword({
        newPassword: password,
        token,
      });
      toast.success("Mot de passe reinitialise avec succes");
      router.push("/login");
    } catch {
      setError("Lien invalide ou expire. Recommencez la procedure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe securise"
      footer={{
        text: "Vous vous souvenez ?",
        linkText: "Se connecter",
        linkHref: "/login",
      }}
    >
      <div className="space-y-5">
        {/* Nouveau mot de passe */}
        <div className="space-y-2">
          <Label
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Nouveau mot de passe
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0 pr-10"
              style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
              style={{ color: "rgba(245,239,230,0.4)" }}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Jauge */}
          {password.length > 0 && (
            <div className="space-y-1 mt-2">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(245,239,230,0.1)" }}>
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: currentStrength?.width, background: currentStrength?.color }}
                />
              </div>
              <p className="text-[10px]" style={{ color: currentStrength?.color }}>
                {currentStrength?.label}
              </p>
            </div>
          )}
          <p className="text-[10px]" style={{ color: "rgba(245,239,230,0.3)" }}>
            Min. 12 caracteres, 1 majuscule, 1 chiffre, 1 caractere special
          </p>
        </div>

        {/* Confirmation */}
        <div className="space-y-2">
          <Label
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Confirmer le mot de passe
          </Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0 pr-10"
              style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
              style={{ color: "rgba(245,239,230,0.4)" }}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
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
          {loading ? "Reinitialisation..." : "Reinitialiser le mot de passe"}
        </button>
      </div>
    </AuthForm>
  );
}