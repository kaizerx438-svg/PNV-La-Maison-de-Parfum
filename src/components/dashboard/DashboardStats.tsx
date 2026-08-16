import { ShoppingBag, TrendingUp, Package, Users } from "lucide-react";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    {
      label: "Chiffre d'affaires",
      value: `${stats.totalRevenue.toFixed(2)} FCFA`,
      icon: TrendingUp,
      color: "#C9A96E",
    },
    {
      label: "Commandes",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "#C9A96E",
    },
    {
      label: "Produits actifs",
      value: stats.totalProducts,
      icon: Package,
      color: "#C9A96E",
    },
    {
      label: "Clients",
      value: stats.totalUsers,
      icon: Users,
      color: "#C9A96E",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="p-5"
          style={{
            background: "rgba(245,239,230,0.05)",
            border: "1px solid rgba(201,169,110,0.15)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {card.label}
            </p>
            <card.icon className="w-4 h-4" style={{ color: card.color }} />
          </div>
          <p
            className="text-2xl font-light"
            style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}