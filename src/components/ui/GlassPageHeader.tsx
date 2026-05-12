"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { liquidSpringPhysics, childItemVariants, glassPanelVariants, organicInteractions } from "@/lib/motion";

interface GlassPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function GlassPageHeader({ title, description, breadcrumbs, actions }: GlassPageHeaderProps) {
  return (
    <motion.div
      variants={glassPanelVariants}
      initial="hidden"
      animate="visible"
      className="w-full liquid-glass rounded-3xl p-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--glow-accent)] opacity-40 blur-[80px] pointer-events-none" />

      <div className="flex flex-col gap-3 relative z-10">
        {/* Breadcrumbs */}
        <motion.div variants={childItemVariants} className="flex items-center gap-2 micro-label">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={crumb.href ? "hover:text-foreground cursor-pointer transition-colors" : "text-foreground/60"}>
                {crumb.label}
              </span>
              {index < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 opacity-40" />}
            </React.Fragment>
          ))}
        </motion.div>

        <div>
          <motion.h1 variants={childItemVariants} className="text-3xl font-sans font-extrabold text-foreground tracking-tight">
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={childItemVariants} className="mt-2 text-sm text-muted font-sans max-w-xl leading-relaxed">
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {actions && (
        <motion.div variants={childItemVariants} className="flex items-center gap-3 relative z-10">
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
}
