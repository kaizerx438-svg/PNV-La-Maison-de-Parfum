import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PreorderCheckoutClient from "@/components/shop/PreorderCheckoutClient";
import Link from "next/link";

function PreorderHeader() {
  return (
    <header
      className="py-6 text-center"
      style={{ borderBottom: "1px solid rgba(201,169,110,0.15)", background: "#0D0D0D" }}
    >
      <Link href="/coming-soon">
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: "#C9A96E" }}>
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

export default async function PreorderCheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?redirect=/precommande/checkout");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
      country: true,
    },
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <PreorderHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
            <p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Finaliser ma precommande
            </p>
          </div>
          <h1
            className="text-3xl font-light"
            style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Informations de livraison
          </h1>
        </div>

        <PreorderCheckoutClient user={user} />
      </div>

      <PreorderFooter />
    </div>
  );
}