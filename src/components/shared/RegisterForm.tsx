"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/user.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import zxcvbn from "zxcvbn";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    if (error) {
      setError("Une erreur est survenue. Veuillez reessayer.");
      return;
    }
    toast.success("Bienvenue sur La Maison du Parfum");
    router.push("/");
  };

  const preventEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // Jauge de force
  const strength = passwordValue.length > 0 ? zxcvbn(passwordValue) : null;
  const strengthScore = strength?.score ?? 0;

  const strengthConfig = [
    { label: "Tres faible", color: "#A32D2D", width: "20%" },
    { label: "Faible", color: "#C9622A", width: "40%" },
    { label: "Moyen", color: "#C9A96E", width: "60%" },
    { label: "Fort", color: "#5B8C5A", width: "80%" },
    { label: "Tres fort", color: "#2E6B2E", width: "100%" },
  ];

  const currentStrength = passwordValue.length > 0 ? strengthConfig[strengthScore] : null;

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

      {/* Nom */}
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Nom complet
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Jean Dupont"
          {...register("name")}
          onKeyDown={preventEnter}
          className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
          style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
        />
        {errors.name && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
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
          {...register("email")}
          onKeyDown={preventEnter}
          className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
          style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
        />
        {errors.email && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>{errors.email.message}</p>
        )}
      </div>

      {/* Mot de passe */}
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Mot de passe
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            {...register("password", {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
            onKeyDown={preventEnter}
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

        {/* Jauge de force */}
        {passwordValue.length > 0 && (
          <div className="space-y-1 mt-2">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(245,239,230,0.1)" }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: currentStrength?.width,
                  background: currentStrength?.color,
                }}
              />
            </div>
            <p className="text-[10px]" style={{ color: currentStrength?.color }}>
              {currentStrength?.label}
            </p>
          </div>
        )}

        <p className="text-[10px]" style={{ color: "rgba(245,239,230,0.3)" }}>
          Minimum 12 caracteres
        </p>
        {errors.password && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>{errors.password.message}</p>
        )}
      </div>

      {/* Confirmation */}
      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Confirmer le mot de passe
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••••••"
            {...register("confirmPassword")}
            onKeyDown={preventEnter}
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
        {errors.confirmPassword && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-center" style={{ color: "#C9A96E" }}>{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="w-full py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 mt-4 cursor-pointer"
        style={{
          background: "transparent",
          border: "1px solid rgba(201,169,110,0.6)",
          color: "#C9A96E",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
        }}
      >
        {isSubmitting ? "Creation..." : "Creer mon compte"}
      </button>
    </form>
  );
}