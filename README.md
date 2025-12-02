# AiProg - AI Programming Platform

A production-ready SaaS platform for AI-powered code generation. Built with Next.js, TypeScript, and Stripe.

## Features

✨ **Landing Page** - Elegant dark design with animations
💳 **Stripe Integration** - Complete payment system with subscriptions
🤖 **AI Chat Interface** - Superior code generation with "mysterious" prompts
📧 **Email System** - Automated emails with Resend
🔐 **Authentication** - Google OAuth ready with NextAuth
🎨 **Beautiful UI** - Custom shadcn/ui components
📱 **Responsive** - Works perfectly on all devices
🚀 **SEO Optimized** - Meta tags, sitemap, and more

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Payments:** Stripe
- **Email:** Resend + React Email
- **Auth:** NextAuth.js
- **AI:** OpenAI / Anthropic / Together AI (Llama)

## Quick Start

1. **Clone and Install**
```bash
git clone <your-repo>
cd aiprog
bun install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Fill in your API keys
```

3. **Run Development Server**
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Create products and prices
4. Add webhook endpoint: `/api/webhook/stripe`
5. Update `.env.local` with keys

### Email Setup (Resend)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Verify your domain
4. Update `.env.local`

### AI Models
Choose one or more:
- **OpenAI**: Get key from [platform.openai.com](https://platform.openai.com)
- **Anthropic**: Get key from [console.anthropic.com](https://console.anthropic.com)
- **Together AI**: Get key from [together.ai](https://together.ai) (for Llama)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Update `.env.local`

## Project Structure

```
aiprog/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/        # Auth pages
│   │   ├── pricing/      # Pricing page
│   │   └── page.tsx      # Landing page
│   ├── components/
│   │   └── ui/           # shadcn components
│   └── emails/           # Email templates
├── .env.example
└── README.md
```

## Key Features Explained

### "Mysterious" System Prompts
The AI is configured to be vague about:
- Token usage and limits
- Exact time estimates
- Internal implementation details

But superior at:
- Code generation with validation
- Error-free implementations
- Complete, runnable solutions

See: `src/app/api/chat/route.ts`

### Pricing Tiers
- **Free**: 5 requests/day, basic features
- **Pro**: Unlimited requests, all AI models, $29/month
- **Enterprise**: Custom solutions, dedicated support

## Deployment

### Netlify (Recommended)
```bash
# Build command
bun run build

# Output directory
.next
```

### Environment Variables
Add all `.env.local` variables to your hosting platform.

## Contributing

This is a template project. Feel free to customize for your needs!

## License

MIT
