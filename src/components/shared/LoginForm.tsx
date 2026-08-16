"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/user.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setError("Email ou mot de passe incorrect");
      return;
    }

    // Verifier le role depuis l'API
    const res = await fetch("/api/user/me");
    const userData = await res.json();

    toast.success("Bienvenue sur La Maison du Parfum");

    if (userData.user?.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push(redirect);
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
          className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
          style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
        />
        {errors.email && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>
            {errors.email.message}
          </p>
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
            {...register("password")}
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
        {errors.password && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Lien mot de passe oublié */}
      <div className="text-right">
        
        <a  href="/forgot-password"
          className="text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
          style={{ color: "rgba(245,239,230,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Mot de passe oublie ?
        </a>
      </div>

      {/* Erreur globale */}
      {error && (
        <p className="text-[11px] text-center" style={{ color: "#C9A96E" }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 mt-4 cursor-pointer"
        style={{
          background: "transparent",
          border: "1px solid rgba(201,169,110,0.6)",
          color: "#C9A96E",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
        }}
      >
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}