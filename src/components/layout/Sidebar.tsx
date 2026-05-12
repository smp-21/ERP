"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon } from "lucide-react";
import { NAVIGATION_MODULES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

export function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  const pathname = usePathname();

  return (
    <motion.aside
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 1 }}
      initial={false}
      animate={{
        width: isOpen ? 288 : 0,
        opacity: isOpen ? 1 : 0,
        paddingLeft: isOpen ? 16 : 0,
        paddingRight: isOpen ? 16 : 0,
      }}
      className="relative z-40 h-screen py-4 flex flex-col gap-6 overflow-hidden"
    >
      <div className="h-full w-full min-w-[256px] liquid-glass rounded-3xl flex flex-col overflow-hidden">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <motion.div
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-lg glow-accent"
          >
            <Hexagon className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base tracking-tight text-foreground">
              Liquid Glass
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted font-semibold">
              Enterprise
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-7 scrollbar-hide">
          {NAVIGATION_MODULES.map((module, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="px-3 micro-label">
                {module.title}
              </h3>
              <div className="space-y-0.5">
                {module.items.map((item, itemIdx) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href + "/"));
                  return (
                    <Link href={item.href} key={itemIdx}>
                      <motion.div
                        whileHover={organicInteractions.hover}
                        whileTap={organicInteractions.tap}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/55 hover:text-foreground hover:bg-foreground/[0.04]"
                        )}
                      >
                        {/* Active indicator glow bar */}
                        {isActive && (
                          <motion.div
                            layoutId="sidebarActiveIndicator"
                            className="absolute inset-0 rounded-xl bg-[var(--accent)]/[0.08] border border-[var(--accent)]/20 shadow-inner"
                            transition={liquidSpringPhysics}
                          />
                        )}
                        <item.icon
                          className={cn(
                            "w-4 h-4 relative z-10 transition-colors",
                            isActive ? "text-[var(--accent)]" : ""
                          )}
                        />
                        <span className="font-sans text-sm font-medium relative z-10">
                          {item.name}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--glow-accent)] relative z-10" />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom System Status */}
        <div className="p-4 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[11px] text-muted font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
