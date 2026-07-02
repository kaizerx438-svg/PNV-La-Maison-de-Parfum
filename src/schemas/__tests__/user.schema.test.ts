import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "../user.schema";

describe("loginSchema", () => {
  it("accepte un email et mot de passe valides", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "motdepasse123",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = loginSchema.safeParse({
      email: "pasunemail",
      password: "motdepasse123",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un mot de passe trop court", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "abc",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("rejette si les mots de passe ne correspondent pas", () => {
    const result = registerSchema.safeParse({
      name: "Franck",
      email: "test@example.com",
      password: "motdepasse123",
      confirmPassword: "autrechose",
    });
    expect(result.success).toBe(false);
  });

  it("accepte des donnees valides", () => {
    const result = registerSchema.safeParse({
      name: "Franck",
      email: "test@example.com",
      password: "motdepasse123",
      confirmPassword: "motdepasse123",
    });
    expect(result.success).toBe(true);
  });
});