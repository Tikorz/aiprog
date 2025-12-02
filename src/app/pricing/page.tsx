import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out AiProg",
    tokenLimit: "250,000 tokens/month",
    features: [
      "250,000 AI tokens per month",
      "Basic code generation",
      "Community support",
      "Public projects only",
      "Standard response time",
      "No credit card required",
    ],
    limitations: [
      "No priority support",
      "Limited AI models",
    ],
    cta: "Start Free",
    href: "/signup?plan=free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious developers",
    tokenLimit: "5,000,000 tokens/month",
    features: [
      "5,000,000 AI tokens per month",
      "Advanced code generation",
      "Priority support 24/7",
      "Private projects",
      "Faster response time",
      "All AI models (GPT-4, Claude, Llama)",
      "Code review & optimization",
      "Export & deployment tools",
    ],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    popular: true,
    requiresCard: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and organizations",
    tokenLimit: "Custom token allocation",
    features: [
      "Custom token allocation (you choose)",
      "Dedicated AI instance",
      "Custom AI training",
      "White-label solution",
      "SLA guarantee",
      "Dedicated account manager",
      "On-premise deployment option",
      "Advanced security & compliance",
      "Volume discounts available",
    ],
    cta: "Contact Sales",
    href: "/contact?plan=enterprise",
    popular: false,
    requiresCard: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">AiProg</div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-sm text-white font-medium">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition">
                Docs
              </Link>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="glow-hover" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse-glow" />

        <div className="container mx-auto max-w-6xl relative text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-gradient">Simple Pricing</span>
            <br />
            <span className="text-white">Choose Your Plan</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Start free with 250,000 tokens. Upgrade when you need more power.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-white/20 glow scale-105"
                    : "bg-zinc-950/50 border-white/10"
                } backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:glow-hover`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-zinc-400">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-zinc-400">{plan.period}</span>}
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-semibold text-white">{plan.tokenLimit}</p>
                  </div>

                  <Button
                    size="lg"
                    className={`w-full ${plan.popular ? "glow-hover" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>

                  {plan.requiresCard && (
                    <p className="text-xs text-zinc-500 text-center">
                      Credit card required • 7 days free trial
                    </p>
                  )}

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations?.map((limitation, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-zinc-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-sm text-zinc-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Token Explanation */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8 bg-zinc-950/50 border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">What are tokens?</h3>
            <div className="space-y-4 text-zinc-400">
              <p>
                Tokens are the building blocks of AI communication. They represent pieces of text
                that the AI processes.
              </p>
              <p>
                <strong className="text-white">Rough estimates:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>1 token ≈ 4 characters or 0.75 words</li>
                <li>Simple request: ~500-1,000 tokens</li>
                <li>Complex code generation: ~2,000-5,000 tokens</li>
                <li>Full app build: ~10,000-50,000 tokens</li>
              </ul>
              <p className="text-sm pt-4">
                Your usage may vary based on project complexity. All plans show remaining tokens
                in your dashboard.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-400">Everything you need to know about AiProg</p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do I need a credit card for the free plan?
              </h3>
              <p className="text-zinc-400">
                No! The Free plan requires no credit card. Just sign up and start building with
                250,000 tokens per month.
              </p>
            </Card>

            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                How does billing work?
              </h3>
              <p className="text-zinc-400">
                Pro plan billing is monthly. Your credit card is charged at the start of each billing
                cycle. Cancel anytime before renewal to avoid charges.
              </p>
            </Card>

            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                What happens if I run out of tokens?
              </h3>
              <p className="text-zinc-400">
                Free users will need to wait until next month or upgrade. Pro users get 5M tokens -
                enough for most developers. Enterprise can set custom limits.
              </p>
            </Card>

            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I change plans later?
              </h3>
              <p className="text-zinc-400">
                Absolutely! Upgrade or downgrade anytime. Upgrades take effect immediately.
                Downgrades apply at the next billing cycle.
              </p>
            </Card>

            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                What AI models do you use?
              </h3>
              <p className="text-zinc-400">
                Free tier uses our optimized base models. Pro users get access to GPT-4, Claude,
                and Llama. We continuously improve our AI to provide the best results.
              </p>
            </Card>

            <Card className="p-6 bg-zinc-950/50 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is there a free trial for Pro?
              </h3>
              <p className="text-zinc-400">
                Yes! Get 7 days free when you sign up for Pro. Your credit card will be charged
                after the trial ends unless you cancel.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-gradient">AiProg</div>
            <div className="flex items-center gap-8">
              <Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition">
                Privacy
              </Link>
              <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition">
                Documentation
              </Link>
            </div>
            <div className="text-sm text-zinc-500">
              © 2025 AiProg. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
