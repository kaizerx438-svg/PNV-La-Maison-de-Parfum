import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Settings } from "lucide-react";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
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

  const orders = await prisma.order.findMany({
    where: { customerEmail: session!.user.email },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { items: true },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Espace personnel
          </p>
        </div>
        <h1 className="text-3xl font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}>
          Bonjour, {user?.name}
        </h1>
      </div>

      {/* Infos personnelles */}
      <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm tracking-[0.3em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Informations du compte
          </h2>
          <Link href="/account/settings">
            <button
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-70 cursor-pointer"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              <Settings className="w-3 h-3" />
              Modifier
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Nom", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Telephone", value: user?.phone || "Non renseigne" },
            { label: "Pays", value: user?.country || "Non renseigne" },
            { label: "Adresse", value: user?.address || "Non renseignee" },
            { label: "Ville", value: user?.city ? `${user.city}${user.postalCode ? ` — ${user.postalCode}` : ""}` : "Non renseignee" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between py-3"
              style={{ borderBottom: "1px solid rgba(13,13,13,0.06)" }}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(13,13,13,0.5)" }}>
                {item.label}
              </span>
              <span className="text-sm" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dernieres commandes */}
      <div className="p-6" style={{ border: "1px solid rgba(13,13,13,0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm tracking-[0.3em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Dernieres commandes
          </h2>
          <Link href="/account/orders">
            <button
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-70 cursor-pointer"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              <Package className="w-3 h-3" />
              Voir tout
            </button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm italic" style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}>
            Vous n&apos;avez pas encore passe de commande.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.06)" }}
              >
                <div>
                  <p className="text-sm font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                    Commande #{order.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "rgba(13,13,13,0.4)" }}>
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")} · {order.items.length} article{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                    {order.totalAmount.toFixed(2)} FCFA
                  </p>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      background: order.status === "DELIVERED" ? "rgba(13,13,13,0.08)" : "rgba(107,26,42,0.1)",
                      color: order.status === "DELIVERED" ? "#0D0D0D" : "#6B1A2A",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}