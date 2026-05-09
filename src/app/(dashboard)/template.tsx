"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
