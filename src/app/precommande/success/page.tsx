import Link from "next/link";
import { CheckCircle } from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";

export default function PreorderSuccessPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <ShopHeader />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 p-12">
          <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#C9A96E" }} />
          <div>
            <h1
              className="text-3xl font-light mb-2"
              style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
            >
              Precommande confirmee
            </h1>
            <p className="text-sm" style={{ color: "rgba(13,13,13,0.5)" }}>
              Merci pour votre confiance. Vous serez parmi les premiers a recevoir votre parfum.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/account/orders">
              <button
                className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
                style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                Mes commandes
              </button>
            </Link>
            <Link href="/catalogue">
              <button
                className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase cursor-pointer"
                style={{ border: "1px solid rgba(13,13,13,0.15)", color: "#0D0D0D", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                Voir le catalogue
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}