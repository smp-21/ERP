"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Command, Gavel } from "lucide-react";
import { organicInteractions } from "@/lib/motion";
import Link from "next/link";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { LiquidSearch } from "@/components/search/LiquidSearch";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Command palette toggle effect
  React.useEffect(() => {
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
            className="p-2 rounded-xl liquid-glass text-foreground/70 hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-4 relative">
          <Link href="/gem-tenders">
            <motion.div
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl liquid-glass text-foreground/80 hover:text-foreground transition-colors border border-foreground/10 font-sans text-sm font-medium"
            >
              <Gavel className="w-4 h-4" />
              <span>GeM Tenders</span>
            </motion.div>
          </Link>

          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-24 px-4 py-2 rounded-2xl liquid-glass text-foreground/40 hover:text-foreground/70 transition-colors border border-foreground/10"
          >
            <div className="flex items-center gap-2 text-sm font-sans">
              <Search className="w-4 h-4" />
              <span>Search modules...</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Command className="w-3 h-3" />
              <span>K</span>
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
