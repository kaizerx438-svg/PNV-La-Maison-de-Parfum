import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("session:", session);

    if (!session) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        country: true,
        role: true,
      },
    });

    console.log("user:", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erreur /api/user/me:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
