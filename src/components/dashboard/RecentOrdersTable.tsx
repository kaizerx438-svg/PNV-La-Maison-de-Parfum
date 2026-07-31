import { Order, OrderItem } from "@prisma/client";

type OrderWithItems = Order & { items: OrderItem[] };

const statusColors: Record<string, string> = {
  PENDING: "#C9A96E",
  CONFIRMED: "#0F6E56",
  SHIPPED: "#185FA5",
  DELIVERED: "#3B6D11",
  CANCELLED: "#A32D2D",
};

const statusLabels: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmee",
  SHIPPED: "Expediee",
  DELIVERED: "Livree",
  CANCELLED: "Annulee",
};

export default function RecentOrdersTable({ orders }: { orders: OrderWithItems[] }) {
  return (
    <div
      className="p-6"
      style={{
        background: "rgba(245,239,230,0.03)",
        border: "1px solid rgba(201,169,110,0.15)",
      }}
    >
      <h2
        className="text-xs tracking-[0.3em] uppercase mb-6"
        style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
      >
        Dernieres commandes
      </h2>

      {orders.length === 0 ? (
        <p className="text-sm italic" style={{ color: "rgba(245,239,230,0.3)" }}>
          Aucune commande pour le moment
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid rgba(245,239,230,0.05)" }}
            >
              <div>
                <p className="text-sm font-light" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                  #{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="text-[10px] mt-1" style={{ color: "rgba(245,239,230,0.4)" }}>
                  {order.customerEmail} · {order.items.length} article{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                  {order.totalAmount.toFixed(2)} €
                </p>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 mt-1 inline-block"
                  style={{
                    background: `${statusColors[order.status]}20`,
                    color: statusColors[order.status],
                  }}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}