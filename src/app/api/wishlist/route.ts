import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ wishlist });
}


export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const { productId } = await req.json();

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) {
        
    await prisma.wishlist.delete({
      where: { userId_productId: { userId: session.user.id, productId } },
    });
    return NextResponse.json({ action: "removed" });
  }

  // Sinon → ajouter
  await prisma.wishlist.create({
    data: { userId: session.user.id, productId },
  });

  return NextResponse.json({ action: "added" });
}