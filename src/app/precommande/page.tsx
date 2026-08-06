import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PreorderClient from "@/components/shop/PreorderClient";

function PreorderHeader() {
  return (
    <header
      className="py-6 text-center"
      style={{ borderBottom: "1px solid rgba(201,169,110,0.15)", background: "#0D0D0D" }}
    >
      <Link href="/coming-soon">
        <div className="flex flex-col items-center">
          <span
            className="text-[10px] tracking-[0.5em] uppercase"
            style={{ color: "#C9A96E" }}
          >
            PNV
          </span>
          <span
            className="text-xl tracking-[0.3em] uppercase font-light"
            style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            La Maison du Parfum
          </span>
        </div>
      </Link>
    </header>
  );
}

function PreorderFooter() {
  return (
    <footer
      className="py-6 text-center"
      style={{ borderTop: "1px solid rgba(201,169,110,0.15)", background: "#0D0D0D" }}
    >
      <p
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "rgba(245,239,230,0.2)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
      >
        PNV · Rare · Pure · Intense
      </p>
    </footer>
  );
}

export default async function PrecommandePage() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <PreorderHeader />

      {/* Hero */}
      <div
        className="py-20 text-center"
        style={{ background: "linear-gradient(180deg, #0D0D0D 0%, #1a0a0a 100%)" }}
      >
        <p
          className="text-[10px] tracking-[0.6em] uppercase mb-4"
          style={{ color: "#C9A96E" }}
        >
          Exclusivite
        </p>
        <h1
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Precommande
        </h1>
        <p
          className="text-sm max-w-md mx-auto"
          style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          Reservez votre parfum avant le lancement officiel. Paiement securise, livraison prioritaire.
        </p>
        <div
          className="mx-auto mt-6"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <PreorderClient products={products} />
      </div>

      <PreorderFooter />
    </div>
  );
}