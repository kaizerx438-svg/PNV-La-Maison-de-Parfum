import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

    const { sessionId } = await req.json();

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (stripeSession.payment_status !== "paid") {
      return NextResponse.json({ error: "Paiement non confirme" }, { status: 400 });
    }

    // Verifier si commande existe deja
    const existingOrder = await prisma.order.findFirst({
      where: {
        payments: {
          some: { transactionId: stripeSession.payment_intent as string }
        }
      }
    });

    if (existingOrder) {
      return NextResponse.json({ order: existingOrder });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Trouver les produits par nom pour lier les OrderItems
    const lineItems = stripeSession.line_items?.data || [];

    // Creer la commande sans items d'abord
    const order = await prisma.order.create({
      data: {
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || null,
        customerAddress: user.address
          ? `${user.address}, ${user.city} ${user.postalCode}`
          : null,
        totalAmount: stripeSession.amount_total! / 100,
        status: "CONFIRMED",
        createdById: session.user.id,
      },
    });

    // Creer les OrderItems
    for (const item of lineItems) {
      const product = await prisma.product.findFirst({
        where: { name: item.description || "" },
      });

      if (product) {
        await prisma.orderItem.create({
          data: {
            nameAtOrder: item.description || "Produit",
            priceAtOrder: item.amount_total / 100 / (item.quantity || 1),
            quantity: item.quantity || 1,
            orderId: order.id,
            productId: product.id,
          },
        });

        // Decrementer le stock
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity || 1 } },
        });
      }
    }

    // Creer le paiement
    await prisma.payment.create({
      data: {
        amount: stripeSession.amount_total! / 100,
        method: "CARD",
        status: "SUCCEEDED",
        transactionId: stripeSession.payment_intent as string,
        paidAt: new Date(),
        orderId: order.id,
      },
    });

    return NextResponse.json({ order });

  } catch (error) {
    console.error("Erreur confirm:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}