import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { type, to, userName } = await req.json();

    let subject = "";
    let react;

    switch (type) {
      case "welcome":
        subject = "Welcome to AiProg!";
        react = WelcomeEmail({ userName });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }

    const data = await resend.emails.send({
      from: "AiProg <onboarding@aiprog.dev>",
      to: [to],
      subject,
      react,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
