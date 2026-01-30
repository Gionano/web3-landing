"use client";

import { useAccount } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { TokenStats } from "@/components/TokenStats";
import { MintCard } from "@/components/MintCard";
import { Sparkles, Rocket, Shield, Zap } from "lucide-react";

export default function Home() {
  const { chain } = useAccount();

  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Experience instant transactions with next-gen blockchain technology",
    },
    {
      icon: Shield,
      title: "Secure & Audited",
      description: "Smart contracts audited by leading security firms",
    },
    {
      icon: Zap,
      title: "Low Fees",
      description: "Minimal transaction costs for maximum efficiency",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-dark-800 border border-neon-purple/30 rounded-full">
                <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
                <span className="text-sm font-medium text-neon-purple">Powered by Ethereum</span>
              </div>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="block text-white mb-2">The Future of</span>
              <span className="block text-gradient animate-glow-pulse">
                Digital Assets
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              QuantumToken represents the next evolution in decentralized finance. 
              Mint, trade, and own a piece of the future.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-2 px-4 py-2 bg-dark-800/50 border border-dark-600 rounded-full hover:border-neon-purple/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <feature.icon className="w-4 h-4 text-neon-purple group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Stats */}
          <div className="mb-16">
            <TokenStats chainId={chain?.id} />
          </div>

          {/* Mint Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold mb-3 text-white">
                Mint Your Tokens
              </h2>
              <p className="text-slate-400">
                Connect your wallet and start minting QuantumTokens today
              </p>
            </div>
            <MintCard />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-dark-800/30 border border-dark-700 rounded-2xl p-8 hover:border-neon-purple/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="mb-4 inline-block p-4 bg-dark-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-neon-purple" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-dark-700">
            <div className="text-center">
              <p className="text-slate-600 text-xs mt-2">
                Testing © 2026. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
