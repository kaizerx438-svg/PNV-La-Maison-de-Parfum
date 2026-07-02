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

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

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

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => e.preventDefault()}
    >
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

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Mot de passe
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          onKeyDown={preventEnter}
          className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
          style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
        />
        {errors.password && (
          <p className="text-[10px]" style={{ color: "#C9A96E" }}>{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Confirmer le mot de passe
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          onKeyDown={preventEnter}
          className="border-0 border-b rounded-none bg-transparent focus-visible:ring-0"
          style={{ borderBottom: "1px solid rgba(201,169,110,0.3)", color: "#F5EFE6" }}
        />
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
        className="w-full py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 mt-4"
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