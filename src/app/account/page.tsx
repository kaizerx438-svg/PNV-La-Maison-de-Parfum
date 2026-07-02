import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
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
          <div
            style={{
              width: "30px",
              height: "1px",
              background: "linear-gradient(90deg, #C9A96E, transparent)",
            }}
          />
          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "#C9A96E" }}
          >
            Espace personnel
          </p>
        </div>
        <h1
          className="text-3xl font-light"
          style={{
            color: "#0D0D0D",
            fontFamily: "Georgia, Times New Roman, serif",
          }}
        >
          Bonjour, {session!.user.name}
        </h1>
      </div>

      {/* Dernières commandes */}
      <div
        className="p-6"
        style={{ border: "1px solid rgba(13,13,13,0.1)" }}
      >
        <h2
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{
            color: "#C9A96E",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          Dernières commandes
        </h2>

        {orders.length === 0 ? (
          <p
            className="text-sm italic"
            style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}
          >
            Vous n&apos;avez pas encore passé de commande.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: "1px solid rgba(13,13,13,0.08)" }}
              >
                <div>
                  <p
                    className="text-sm font-light"
                    style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                  >
                    Commande #{order.id.slice(-6).toUpperCase()}
                  </p>
                  <p
                    className="text-[10px] mt-1"
                    style={{ color: "rgba(13,13,13,0.4)" }}
                  >
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")} ·{" "}
                    {order.items.length} article{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm"
                    style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                  >
                    {order.totalAmount.toFixed(2)} €
                  </p>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      background:
                        order.status === "DELIVERED"
                          ? "rgba(13,13,13,0.08)"
                          : "rgba(107,26,42,0.1)",
                      color:
                        order.status === "DELIVERED" ? "#0D0D0D" : "#6B1A2A",
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

      {/* Infos compte */}
      <div
        className="p-6"
        style={{ border: "1px solid rgba(13,13,13,0.1)" }}
      >
        <h2
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{
            color: "#C9A96E",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          Informations du compte
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(13,13,13,0.5)" }}
            >
              Nom
            </span>
            <span
              className="text-sm"
              style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
            >
              {session!.user.name}
            </span>
          </div>
          <div
            style={{ borderBottom: "1px solid rgba(13,13,13,0.08)" }}
          />
          <div className="flex justify-between">
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(13,13,13,0.5)" }}
            >
              Email
            </span>
            <span
              className="text-sm"
              style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
            >
              {session!.user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}