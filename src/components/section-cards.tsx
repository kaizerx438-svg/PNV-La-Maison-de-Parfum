import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, ShoppingBagIcon, PackageIcon, UsersIcon } from "lucide-react"

export async function SectionCards() {
  const [totalOrders, totalRevenue, totalProducts, totalUsers] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "USER" } }),
  ]);

  const cards = [
    {
      label: "Chiffre d'affaires",
      value: `${(totalRevenue._sum.totalAmount || 0).toFixed(2)} FCFA`,
      icon: TrendingUpIcon,
      footer: "Total des ventes",
    },
    {
      label: "Commandes",
      value: totalOrders,
      icon: ShoppingBagIcon,
      footer: "Commandes passees",
    },
    {
      label: "Produits actifs",
      value: totalProducts,
      icon: PackageIcon,
      footer: "Dans le catalogue",
    },
    {
      label: "Clients",
      value: totalUsers,
      icon: UsersIcon,
      footer: "Comptes enregistres",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <card.icon className="w-3 h-3" />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">{card.footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}