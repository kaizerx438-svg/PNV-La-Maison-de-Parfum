import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Minimum 2 caracteres"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const europeCountries = ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "GB"];

export const settingsSchema = z.object({
  name: z.string().min(2, "Minimum 2 caracteres"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  country: z.string().min(1, "Pays obligatoire"),
  address: z.string().min(5, "Adresse obligatoire"),
  city: z.string().min(2, "Ville obligatoire"),
  postalCode: z.string().optional(),
}).superRefine((data, ctx) => {
  if (europeCountries.includes(data.country)) {
    if (!data.postalCode || data.postalCode.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Code postal obligatoire pour les pays europeens",
        path: ["postalCode"],
      });
    }
    if (
      data.country === "FR" &&
      data.postalCode &&
      !/^\d{5}$/.test(data.postalCode)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Code postal francais invalide (5 chiffres)",
        path: ["postalCode"],
      });
    }
  }
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;