"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Zap } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [logoError, setLogoError] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {!logoError ? (
                <img src="https://gionano.my.id/images/logo.png" alt="Logo" className="w-8 h-8" onError={() => setLogoError(true)} />
              ) : (
                <Zap className="w-8 h-8 text-neon-orange animate-glow-pulse" fill="currentColor" />
              )}
              <div className="absolute inset-0 blur-xl bg-neon-orange/50 animate-glow-pulse" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-900">
              ClawdCat
            </span>
          </div>

          {/* Connect Button */}
          <ConnectButton 
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </div>

      {/* Decorative scan line */}
      <div className="scan-line" />
    </nav>
  );
}
