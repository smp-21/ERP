"use client";

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  // Page transition animation is handled by Shell.tsx's AnimatePresence + motion.div
  // keyed on pathname. This template is intentionally a passthrough to avoid
  // double-wrapping animations which causes overlap during route transitions.
  return <>{children}</>;
}
