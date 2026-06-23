import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ background: "#0D0D0D" }}
    >
      <p
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ color: "#C9A96E" }}
      >
        404
      </p>
      <h1
        className="text-4xl font-light"
        style={{
          color: "#F5EFE6",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        Page introuvable
      </h1>
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />
      <Link
        href="/"
        className="text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
        style={{ color: "rgba(245,239,230,0.5)" }}
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}