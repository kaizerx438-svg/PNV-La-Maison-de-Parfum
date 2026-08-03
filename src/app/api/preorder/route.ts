import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const { items } = await req.json();

  const productIds = items.map((i: { product_id: string }) => i.product_id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const lineItems = items.map((item: { product_id: string; product_name: string; price: number; quantity: number; image_url: string }) => {
    const product = products.find((p) => p.id === item.product_id);
    if (!product) throw new Error(`Produit ${item.product_name} introuvable`);

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: `[PRECOMMANDE] ${item.product_name}`,
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: session.user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/precommande/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/precommande`,
    metadata: {
      userId: session.user.id,
      type: "PREORDER",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}