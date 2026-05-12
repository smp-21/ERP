"use client";

import { motion, AnimatePresence } from "framer-motion";
import { liquidSpringPhysics } from "@/lib/motion";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, y: -16, filter: "blur(8px)", scale: 0.98 }}
        transition={liquidSpringPhysics}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
