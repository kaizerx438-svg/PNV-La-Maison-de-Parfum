// app/login/page.tsx
import AuthForm from "@/components/shared/AuthForm";
import LoginForm from "@/components/shared/LoginForm";

export default function LoginPage() {
  return (
    <AuthForm
      title="Connexion"
      subtitle="Bienvenue dans votre espace"
      footer={{
        text: "Pas encore de compte ?",
        linkText: "S'inscrire",
        linkHref: "/register",
      }}
    >
      <LoginForm />
    </AuthForm>
  );
}