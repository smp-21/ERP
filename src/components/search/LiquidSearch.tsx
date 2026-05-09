"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Command, X } from "lucide-react";
import { NAVIGATION_MODULES } from "@/lib/constants";
import { liquidSpringPhysics } from "@/lib/motion";

interface LiquidSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiquidSearch({ isOpen, onClose }: LiquidSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return NAVIGATION_MODULES;
    
    const query = searchQuery.toLowerCase();
    return NAVIGATION_MODULES.map(module => ({
      ...module,
      items: module.items.filter(item => item.name.toLowerCase().includes(query))
    })).filter(module => module.items.length > 0);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 bg-black/40 backdrop-blur-sm"
        >
          {/* Click outside to close overlay */}
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1, transition: liquidSpringPhysics }}
            exit={{ scale: 0.95, y: -20, opacity: 0, transition: { duration: 0.15 } }}
            className="relative w-full max-w-2xl liquid-glass rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-foreground/10"
          >
            <div className="flex items-center px-4 py-4 border-b border-foreground/10">
              <Search className="w-5 h-5 text-foreground/40 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-sans placeholder:text-foreground/40"
              />
              <button onClick={() => { onClose(); setSearchQuery(""); }} className="text-foreground/40 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-2 py-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {filteredModules.length === 0 ? (
                <p className="text-sm text-foreground/40 text-center py-6">No results found for "{searchQuery}"</p>
              ) : (
                filteredModules.map((module, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <p className="text-xs text-foreground/40 px-3 uppercase tracking-wider mb-2 font-semibold">
                      {module.title}
                    </p>
                    <div className="space-y-1">
                      {module.items.map((item, j) => (
                        <div 
                          key={j} 
                          onClick={() => { 
                            onClose(); 
                            setSearchQuery(""); 
                            router.push(item.href);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/70 hover:bg-foreground/10 hover:text-foreground cursor-pointer transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="font-sans text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
