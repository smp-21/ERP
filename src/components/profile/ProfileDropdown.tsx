"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, Bell, LogOut, Moon, Sun, ChevronDown } from "lucide-react";
import { liquidSpringPhysics, organicInteractions } from "@/lib/motion";
import { useTheme } from "next-themes";
import Link from "next/link";

interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onToggle, onClose }: ProfileDropdownProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      {/* Profile Trigger */}
      <motion.button
        whileHover={organicInteractions.hover}
        whileTap={organicInteractions.tap}
        onClick={onToggle}
        className="flex items-center gap-3 px-2 py-1.5 rounded-full liquid-glass pr-4 border border-foreground/10 cursor-pointer"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-foreground/20">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Sarthak Patoliya" className="w-full h-full object-cover" />
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
        </div>
        <span className="text-sm font-medium font-sans text-foreground/90 hidden sm:block">Sarthak P.</span>
        <ChevronDown className="w-4 h-4 text-foreground/50" />
      </motion.button>

      {/* Profile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[90]" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: liquidSpringPhysics }}
              exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
              className="absolute top-14 right-0 w-72 liquid-glass rounded-2xl overflow-hidden z-[100] border border-foreground/10"
            >
              <div className="p-4 border-b border-foreground/10 bg-foreground/5">
                <p className="font-sans font-semibold text-foreground">Sarthak Patoliya</p>
                <p className="text-xs text-foreground/50">ERP Administrator</p>
                <p className="text-xs text-foreground/40 mt-1">Patoliya Industries Pvt Ltd</p>
              </div>
              <div className="p-2 space-y-1">
                <Link href="/settings/profile" onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/10 hover:text-foreground rounded-xl transition-colors">
                  <User className="w-4 h-4" /> Edit Profile
                </Link>
                <button onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/10 hover:text-foreground rounded-xl transition-colors">
                  <Settings className="w-4 h-4" /> Account Settings
                </button>
                <button onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/10 hover:text-foreground rounded-xl transition-colors">
                  <Bell className="w-4 h-4" /> Notifications
                </button>
                
                {/* Theme Toggle inside dropdown for completeness */}
                <div className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/10 hover:text-foreground rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} 
                    <span>Theme</span>
                  </div>
                  <div className="flex bg-foreground/10 rounded-lg p-0.5">
                    <button onClick={() => setTheme('light')} className={`px-2 py-1 rounded-md text-xs ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-foreground/50'}`}>Light</button>
                    <button onClick={() => setTheme('dark')} className={`px-2 py-1 rounded-md text-xs ${theme === 'dark' ? 'bg-black text-white shadow-sm' : 'text-foreground/50'}`}>Dark</button>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-foreground/10 bg-foreground/5">
                <button onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
