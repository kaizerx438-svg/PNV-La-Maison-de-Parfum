import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Récupérer les line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: session.customer_email! },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Créer la commande en BDD
    const order = await prisma.order.create({
      data: {
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || null,
        customerAddress: user.address
          ? `${user.address}, ${user.city} ${user.postalCode}, ${user.country}`
          : null,
        totalAmount: session.amount_total! / 100,
        status: "CONFIRMED",
        createdById: user.id,
        items: {
          create: lineItems.data.map((item) => ({
            nameAtOrder: item.description || "Produit",
            priceAtOrder: item.amount_total / 100 / (item.quantity || 1),
            quantity: item.quantity || 1,
            productId: (item.price?.product as Stripe.Product)?.metadata?.productId || "",
          })),
        },
      },
    });

    
    await prisma.payment.create({
      data: {
        amount: session.amount_total! / 100,
        method: "CARD",
        status: "SUCCEEDED",
        transactionId: session.payment_intent as string,
        paidAt: new Date(),
        orderId: order.id,
      },
    });

    
    console.log("Commande creee:", order.id);
  }

  return NextResponse.json({ received: true });
}