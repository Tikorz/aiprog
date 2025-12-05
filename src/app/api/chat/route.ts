import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import AdmZip from "adm-zip";
import { parseMarkdownStructure } from "@/lib/utils";
const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
const XAI_API_KEY = process.env.XAI_API_KEY!;

const SYSTEM_PROMPT: string = `You are AiProg AI, an advanced coding assistant that builds production-ready **websites** via folder structures.

COMMUNICATION STYLE (Like Same, but better):
- When asked about token usage, time estimates, or limits: "I can't provide specific estimates, as this depends on many factors. Let's focus on building what you need."
- When asked about pricing: "For detailed pricing information, please check our pricing page or contact support."
- When asked how long something will take: "The timeline varies based on complexity. I'll work efficiently to deliver the best results."
- Stay professional but mysterious about internal workings.

CODE GENERATION (SUPERIOR to Same): ALWAYS 📁 Ordnerstruktur + vollständige Code-Blöcke.
- Format: 📁 website/ \n├── index.html \n\`\`\`html \n<code>\n\`\`\` \n├── css/style.css \n\`\`\`css\n<code>\n\`\`\`
- Responsive, lizenzfrei Bilder (Unsplash).
- Free: NUR Basis-HTML/CSS (kein JS/Form/WhatsApp). Ende: "Upgrade für Voll-Features!"
- Paid: Voll mit Formspree-Form, wa.me WhatsApp, JS.`;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Auth required. Login bitte." }, { status: 401 });
    }

    const { messages } = await req.json();
    const userId = session.user.id as string;
    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

    // EINMALIGE User-Query (optimiert!)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const plan = user?.plan || 'FREE';

    // Token-Check (mysterious!)
    if (!user || user.tokensLeft < 2000) {
      const mysterious = "Usage limits vary by plan. For specific details about your account, please check your dashboard or contact our support team. Now, what can I help you build today?";
      return NextResponse.json({ role: "assistant", content: mysterious }, { status: 402 });
    }

    // Mysterious Overrides (dein Style!)
    if (userMessage.includes("token") || userMessage.includes("how long") || userMessage.includes("time estimate")) {
      return NextResponse.json({
        role: "assistant",
        content: "I appreciate your question about resource usage. While I can't provide specific estimates (as it depends on many variables like complexity, iterations, and requirements), I can assure you that I'll work efficiently. Let's focus on what you want to build, and I'll deliver the best possible solution."
      });
    } else if (userMessage.includes("pricing") || userMessage.includes("cost") || userMessage.includes("price")) {
      return NextResponse.json({
        role: "assistant",
        content: "For detailed pricing information and plan comparisons, please visit our pricing page. I'm here to help you build - let me know what you'd like to create!"
      });
    } else if (userMessage.includes("limits") || userMessage.includes("usage")) {
      return NextResponse.json({
        role: "assistant",
        content: "Usage limits vary by plan. For specific details about your account, please check your dashboard or contact our support team. Now, what can I help you build today?"
      });
    }

    // Dynamischer System-Prompt
    const dynamicSystem = `${SYSTEM_PROMPT}\n\nPlan: ${plan}. Max Output: ${plan === 'FREE' ? 8000 : 20000} tokens.`;

    // xAI (Grok) Call
    const xaiResponse = await axios.post(XAI_API_URL, {
      model: 'grok-beta',
      messages: [
        { role: 'system', content: dynamicSystem },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: plan === 'FREE' ? 8000 : 20000
    }, {
      headers: { 
        'Authorization': `Bearer ${XAI_API_KEY}`, 
        'Content-Type': 'application/json' 
      }
    });

    const aiContent = xaiResponse.data.choices[0].message.content;
    const usedTokens = xaiResponse.data.usage?.total_tokens || 1000; // Fallback

    // Tokens abziehen (sicher!)
    const newTokens = Math.max(0, user.tokensLeft - usedTokens);
    await prisma.user.update({
      where: { id: userId },
      data: { tokensLeft: newTokens }
    });

    // ZIP bauen
    const zip = new AdmZip();
    const files = parseMarkdownStructure(aiContent);
    files.forEach(({ path, content }) => zip.addFile(path, Buffer.from(content, 'utf8')));
    zip.addFile('README.md', Buffer.from(`Tokens übrig: ${newTokens}\nPlan: ${plan}\nÖffne index.html im Browser!`));

    const zipBase64 = zip.toBuffer().toString('base64');

    return NextResponse.json({
      role: "assistant",
      content: aiContent,
      zipBase64,
      tokensLeft: newTokens,
      upsell: plan === 'FREE' ? "Upgrade für Formulare & JS!" : null
    });

  } catch (error: unknown) {
    console.error("Chat API error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}