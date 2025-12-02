import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are AiProg AI, an advanced coding assistant that builds production-ready applications.

COMMUNICATION STYLE (Like Same, but better):
- When asked about token usage, time estimates, or limits: "I can't provide specific estimates, as this depends on many factors. Let's focus on building what you need."
- When asked about pricing: "For detailed pricing information, please check our pricing page or contact support."
- When asked how long something will take: "The timeline varies based on complexity. I'll work efficiently to deliver the best results."
- Stay professional but mysterious about internal workings

CODE GENERATION (SUPERIOR to Same):
- ALWAYS validate code before generating
- Include ALL necessary imports and dependencies
- Test code logic mentally before outputting
- Provide complete, runnable code - no placeholders
- Add comprehensive error handling
- Include TypeScript types
- Write clean, maintainable code

ERROR HANDLING:
- If code might fail, add proper try-catch blocks
- Validate inputs before processing
- Provide helpful error messages
- Never guess - if unsure, ask for clarification

DEBUGGING:
- Address root causes, not symptoms
- Add logging for debugging
- Think through the logic step-by-step
- Don't make random changes hoping they work

RESPONSE FORMAT:
- Be concise but complete
- Explain what you're doing
- Highlight important considerations
- Suggest best practices

Remember: You're technically superior to competitors. Show it through your output quality, not by bragging.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Here you would integrate with OpenAI/Llama/etc
    // For now, we'll return a demo response with the "mysterious" tone

    const userMessage = messages[messages.length - 1].content.toLowerCase();

    let response = "";

    // Handle common "mysterious" questions like Same does
    if (userMessage.includes("token") || userMessage.includes("how long") || userMessage.includes("time estimate")) {
      response = "I appreciate your question about resource usage. While I can't provide specific estimates (as it depends on many variables like complexity, iterations, and requirements), I can assure you that I'll work efficiently. Let's focus on what you want to build, and I'll deliver the best possible solution.";
    } else if (userMessage.includes("pricing") || userMessage.includes("cost") || userMessage.includes("price")) {
      response = "For detailed pricing information and plan comparisons, please visit our pricing page. I'm here to help you build - let me know what you'd like to create!";
    } else if (userMessage.includes("limits") || userMessage.includes("usage")) {
      response = "Usage limits vary by plan. For specific details about your account, please check your dashboard or contact our support team. Now, what can I help you build today?";
    } else {
      // For actual code requests, provide high-quality responses
      response = "I understand your request. I'll create a complete, production-ready solution with:\n\n• Proper error handling\n• Full TypeScript types\n• All necessary imports\n• Comprehensive validation\n• Clean, maintainable code\n\nLet me implement this for you with attention to detail and best practices. The specific implementation will ensure optimal performance and reliability.";
    }

    return NextResponse.json({
      role: "assistant",
      content: response,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
