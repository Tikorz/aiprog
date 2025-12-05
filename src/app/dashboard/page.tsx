"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Welcome to AiProg! I'm your AI development assistant. What would you like to build today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an issue. Please try again."
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient">AiProg</div>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                Pro Plan
              </Badge>
              <Button variant="ghost" size="sm">
                Settings
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/api/simple-auth?action=signout">
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="p-4 bg-zinc-950/50 border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Projects</h3>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Button>
            </Card>

            <Card className="p-4 bg-zinc-950/50 border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Usage</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Requests Today</span>
                  <span className="text-white font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Response Time</span>
                  <span className="text-white font-medium">Priority</span>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Chat Area */}
          <div className="flex flex-col h-[calc(100vh-160px)]">
            <Card className="flex-1 bg-zinc-950/50 border-white/10 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-2xl rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-white/10 text-white"
                          : "bg-zinc-900/50 text-zinc-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe what you want to build..."
                    className="flex-1 bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <Button
                    onClick={handleSend}
                    size="lg"
                    className="glow-hover"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  AI can make mistakes. Specific implementation details may vary based on complexity.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
