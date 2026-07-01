// app/register/page.tsx
import AuthForm from "@/components/shared/AuthForm";
import RegisterForm from "@/components/shared/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthForm
      title="Créer un compte"
      subtitle="Rejoignez La Maison du Parfum"
      footer={{
        text: "Déjà un compte ?",
        linkText: "Se connecter",
        linkHref: "/login",
      }}
    >
      <RegisterForm />
    </AuthForm>
  );
}