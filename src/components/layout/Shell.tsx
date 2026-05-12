"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { liquidSpringPhysics } from "@/lib/motion";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full overflow-hidden canvas-gradient text-foreground transition-colors duration-500">
      {/* Ambient Gradient Orbs for premium depth */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full bg-[var(--glow-accent)] opacity-30 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--glow-accent-secondary)] opacity-20 blur-[120px]" />
      </div>

      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen relative z-10">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 24, filter: "blur(12px)", scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: liquidSpringPhysics }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)", scale: 0.98, transition: { duration: 0.18 } }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
