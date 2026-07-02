import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, ArrowLeft, ChevronRight } from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: "En attente", color: "#C9A96E" },
  CONFIRMED: { label: "Confirmee", color: "#0F6E56" },
  SHIPPED: { label: "Expediee", color: "#185FA5" },
  DELIVERED: { label: "Livree", color: "#3B6D11" },
  CANCELLED: { label: "Annulee", color: "#A32D2D" },
};

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const orders = await prisma.order.findMany({
    where: { customerEmail: session!.user.email },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
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
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Historique
          </p>
        </div>
        <h1
          className="text-3xl font-light"
          style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Mes commandes
        </h1>
      </div>

      {/* Liste commandes */}
      {orders.length === 0 ? (
        <div
          className="text-center py-20 space-y-4"
          style={{ border: "1px solid rgba(13,13,13,0.08)" }}
        >
          <Package className="w-10 h-10 mx-auto" style={{ color: "rgba(13,13,13,0.2)" }} />
          <p
            className="text-lg font-light"
            style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}
          >
            Aucune commande pour le moment
          </p>
         
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusLabels[order.status] ?? { label: order.status, color: "#C9A96E" };
            return (
              <div
                key={order.id}
                className="p-6"
                style={{ border: "1px solid rgba(13,13,13,0.08)", background: "rgba(13,13,13,0.02)" }}
              >
                {/* Header commande */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className="text-sm font-light mb-1"
                      style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                    >
                      Commande #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.2em]"
                      style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase px-3 py-1"
                      style={{ background: `${status.color}15`, color: status.color }}
                    >
                      {status.label}
                    </span>
                    <p
                      className="text-sm font-light mt-2"
                      style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                    >
                      {order.totalAmount.toFixed(2)} €
                    </p>
                  </div>
                </div>

                {/* Articles */}
                <div
                  className="space-y-2 pt-4"
                  style={{ borderTop: "1px solid rgba(13,13,13,0.06)" }}
                >
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-1 h-8"
                          style={{ background: "rgba(201,169,110,0.3)" }}
                        />
                        <div>
                          <p
                            className="text-xs font-light"
                            style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                          >
                            {item.nameAtOrder}
                          </p>
                          <p
                            className="text-[10px]"
                            style={{ color: "rgba(13,13,13,0.4)" }}
                          >
                            Qte : {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                      >
                        {(item.priceAtOrder * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                {/* Adresse livraison */}
                {order.customerAddress && (
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(13,13,13,0.06)" }}
                  >
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: "#C9A96E" }}
                    >
                      Adresse de livraison
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Georgia, serif" }}
                    >
                      {order.customerAddress}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}