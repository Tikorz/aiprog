import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
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
              <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        {/* Glow Effect */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse-glow" />

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-zinc-400">Building the future of AI development</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-gradient">Build Anything</span>
              <br />
              <span className="text-white">With AI</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Create production-ready applications by chatting with our advanced AI.
              No more debugging. No more errors. Just pure creation.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 py-6 glow-hover" asChild>
                <Link href="/signup">Start Building Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5" asChild>
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-12 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-zinc-500">Apps Built</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-zinc-500">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-zinc-500">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Why Choose AiProg?
            </h2>
            <p className="text-xl text-zinc-400">
              Superior AI. Better Code. Faster Results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 bg-zinc-950/50 border-white/10 backdrop-blur-sm glow-hover cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-zinc-400 leading-relaxed">
                Build complete applications in minutes, not days. Our AI understands exactly what you need.
              </p>
            </Card>

            <Card className="p-8 bg-zinc-950/50 border-white/10 backdrop-blur-sm glow-hover cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Error-Free Code</h3>
              <p className="text-zinc-400 leading-relaxed">
                Advanced validation and testing ensures your code works perfectly the first time, every time.
              </p>
            </Card>

            <Card className="p-8 bg-zinc-950/50 border-white/10 backdrop-blur-sm glow-hover cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Full-Stack Magic</h3>
              <p className="text-zinc-400 leading-relaxed">
                From frontend to backend, databases to deployment. We handle everything seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-white/10 p-12 text-center glow">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Build?
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Join thousands of developers creating the future with AI.
              </p>
              <Button size="lg" className="text-lg px-8 py-6 glow-hover" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </Card>
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
