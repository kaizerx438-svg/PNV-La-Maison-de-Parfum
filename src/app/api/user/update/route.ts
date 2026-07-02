import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: body.name,
      phone: body.phone,
      address: body.address,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
    },
  });

  return NextResponse.json({ success: true, user: updated });
}