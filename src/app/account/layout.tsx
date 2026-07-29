import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import { User, Package, Settings, CreditCard, Heart } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";


export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const navItems = [
    { label: "Mon compte", href: "/account", icon: User },
    { label: "Mes commandes", href: "/account/orders", icon: Package },
    { label: "Ma wishlists", href: "/account/wishlist", icon: Heart },
    { label: "Modes de paiements", href: "/account/payment", icon: CreditCard },
    { label: "Paramètres", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <ShopHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8 min-h-[45vh]">

          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div
              className="p-6 mb-4"
              style={{
                background: "#0D0D0D",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: "#6B1A2A" }}
              >
                <span
                  className="text-sm font-light"
                  style={{ color: "#F5EFE6" }}
                >
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <p
                className="text-sm font-light"
                style={{
                  color: "#F5EFE6",
                  fontFamily: "Georgia, Times New Roman, serif",
                }}
              >
                {session.user.name}
              </p>
              <p
                className="text-[10px] mt-1"
                style={{ color: "rgba(245,239,230,0.4)" }}
              >
                {session.user.email}
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6]"
                  style={{
                    color: "#0D0D0D",
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                    border: "1px solid rgba(13,13,13,0.1)",
                    marginBottom: "4px",
                    display: "flex",
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}