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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
        <div className="flex items-center gap-3 p-6 pb-2">
          <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center border-t border-foreground/20">
            <Hexagon className="w-5 h-5 text-foreground" />
          </div>
          <span className="font-sans font-semibold text-lg tracking-wide text-foreground/90">
            Liquid Glass
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
          {NAVIGATION_MODULES.map((module, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-3 text-xs font-medium text-foreground/40 uppercase tracking-wider">
                {module.title}
              </h3>
              <div className="space-y-1">
                {module.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + '/'));
                  return (
                    <Link href={item.href} key={itemIdx}>
                      <motion.div
                        whileHover={organicInteractions.hover}
                        whileTap={organicInteractions.tap}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-300",
                          isActive
                            ? "bg-foreground/10 text-foreground shadow-inner specular-edge"
                            : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-sans text-sm">{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
