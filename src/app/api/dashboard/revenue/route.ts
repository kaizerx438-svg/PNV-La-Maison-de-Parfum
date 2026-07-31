import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { status: { not: "CANCELLED" } },
    select: { totalAmount: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // Grouper par mois
  const monthlyData: Record<string, { revenue: number; orders: number }> = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    if (!monthlyData[key]) {
      monthlyData[key] = { revenue: 0, orders: 0 };
    }
    monthlyData[key].revenue += order.totalAmount;
    monthlyData[key].orders += 1;
  });

  const data = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    revenue: Math.round(values.revenue * 100) / 100,
    orders: values.orders,
  }));

  return NextResponse.json({ data });
}