import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CheckoutClient from "@/components/shop/CheckoutClient";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?redirect=/checkout");

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
      <ShopHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
            <p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Finaliser
            </p>
          </div>
          <h1
            className="text-3xl font-light"
            style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Checkout
          </h1>
        </div>
        <CheckoutClient user={user} />
      </div>
      <Footer />
    </div>
  );
}