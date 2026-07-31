import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Lister tous les produits
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

// Créer un produit
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Non autorise" }, { status: 403 });

  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      stock: parseInt(body.stock),
      concentration: body.concentration,
      volumeMl: parseInt(body.volumeMl),
      notesTete: body.notesTete,
      notesCoeur: body.notesCoeur,
      notesFond: body.notesFond,
      imageUrl: body.imageUrl,
      featured: body.featured || false,
      status: body.status || "ACTIVE",
      discountPercent: parseFloat(body.discountPercent) || 0,
      categoryId: body.categoryId,
      createdById: session.user.id,
    },
  });

  return NextResponse.json({ product });
}

// Modifier un produit
export async function PATCH(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Non autorise" }, { status: 403 });

  const body = await req.json();
  const { id, ...data } = body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      status: data.status,
      featured: data.featured,
      discountPercent: parseFloat(data.discountPercent) || 0,
      notesTete: data.notesTete,
      notesCoeur: data.notesCoeur,
      notesFond: data.notesFond,
      imageUrl: data.imageUrl,
    },
  });

  return NextResponse.json({ product });
}

// Supprimer un produit
export async function DELETE(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") return NextResponse.json({ error: "Non autorise" }, { status: 403 });

  const { id } = await req.json();

  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}