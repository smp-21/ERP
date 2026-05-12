"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Command, Gavel, Sparkles } from "lucide-react";
import { organicInteractions, snappySpring } from "@/lib/motion";
import Link from "next/link";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { LiquidSearch } from "@/components/search/LiquidSearch";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  // Ambient glow pulse on the search bar
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Command palette toggle effect
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="h-20 flex items-center justify-between px-6 lg:px-10 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            onClick={onToggleSidebar}
            className="p-2.5 rounded-xl liquid-glass text-foreground/70 hover:text-foreground cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* GeM Tenders Quick Link */}
          <Link href="/gem-tenders">
            <motion.div
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl liquid-glass text-foreground/70 hover:text-foreground transition-colors font-sans text-sm font-medium cursor-pointer"
            >
              <Gavel className="w-4 h-4" />
              <span>GeM Tenders</span>
            </motion.div>
          </Link>

          {/* AI-Powered Command Input */}
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl liquid-glass text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer relative overflow-hidden group"
          >
            {/* Ambient Glow Pulse */}
            <AnimatePresence>
              {isGlowing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-[var(--glow-accent)] via-transparent to-[var(--glow-accent-secondary)] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 text-sm font-sans relative z-10">
              <div className="relative">
                <Search className="w-4 h-4" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1.5"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[var(--accent)]" />
                </motion.div>
              </div>
              <span>Ask AI or search...</span>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="flex items-center gap-1 text-xs bg-foreground/[0.06] px-2 py-1 rounded-lg">
                <Command className="w-3 h-3" />
                <span className="font-mono font-medium">K</span>
              </div>
            </div>
          </motion.button>

          <ProfileDropdown
            isOpen={isProfileOpen}
            onToggle={() => setIsProfileOpen(!isProfileOpen)}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </header>

      <LiquidSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
