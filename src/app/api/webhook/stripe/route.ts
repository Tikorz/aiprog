import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-11-17.clover" });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      console.error("Webhook signature verification failed:", err instanceof Error ? err.message : err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);

        // 🔥 TOKEN-RESET: Bei Checkout → Plan upgraden
        if (session.customer && session.mode === 'subscription') {
          const customerId = session.customer as string;
          const user = await prisma.user.findFirst({ 
            where: { stripeCustomerId: customerId } 
          });
          if (user) {
            const priceId = session.line_items?.data[0]?.price?.id || '';
            const newPlan = priceId.includes('master') ? 'MASTER' : 'PRO';
            const newTokens = newPlan === 'MASTER' ? 100000 : 500000;
            await prisma.user.update({
              where: { id: user.id },
              data: { 
                plan: newPlan,
                tokensLeft: newTokens 
              }
            });
            console.log(`User ${user.id} upgraded to ${newPlan} with ${newTokens} tokens`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id);

        // 🔥 TOKEN-RESET: Bei Subscription-Update
        const customerId = subscription.customer as string;
        const user = await prisma.user.findFirst({ 
          where: { stripeCustomerId: customerId } 
        });
        if (user && subscription.items?.data[0]?.price?.id.includes('master')) {
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              plan: 'MASTER',
              tokensLeft: 100000 
            }
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription canceled:", subscription.id);
        // Optional: Downgrade zu FREE
        const customerId = subscription.customer as string;
        const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: 'FREE', tokensLeft: 10000 }
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded:", invoice.id);
        // Optional: E-Mail
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed:", invoice.id);
        // Optional: Downgrade
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Webhook error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}