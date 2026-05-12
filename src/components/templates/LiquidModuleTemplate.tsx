"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "../ui/GlassPageHeader";
import { LiquidDataGrid } from "../ui/LiquidDataGrid";
import { glassPanelVariants, childItemVariants, organicInteractions } from "@/lib/motion";
import { Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface LiquidModuleTemplateProps {
  moduleName: string;
  featureName?: string;
  data: any;
}

export function LiquidModuleTemplate({ moduleName, featureName, data }: LiquidModuleTemplateProps) {
  const { title, description, kpis, columns, data: gridData } = data;

  const breadcrumbs = featureName
    ? [{ label: moduleName.replace("-", " ") }, { label: featureName.replace("-", " ") }]
    : [{ label: "Global" }, { label: moduleName.replace("-", " ") }];

  return (
    <div className="flex flex-col h-full">
      <GlassPageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />

      {/* KPI Bento Grid */}
      {kpis && (
        <motion.div
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {kpis.map((kpi: any, idx: number) => {
            const isPositive = kpi.change.startsWith("+") || 
              ["Optimal", "Stable", "Clear", "Compliant", "Up to date"].includes(kpi.change);
            return (
              <motion.div
                key={idx}
                variants={childItemVariants}
                whileHover={organicInteractions.hover}
                whileTap={organicInteractions.tap}
                className="liquid-glass rounded-3xl p-6 relative overflow-hidden group cursor-default"
              >
                {/* Ambient glow */}
                <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="p-3 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] text-foreground/70">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="micro-label mb-2">{kpi.label}</h3>
                  <p className="text-3xl font-extrabold font-sans text-foreground tracking-tight">{kpi.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Main Data Grid */}
      <div className="mt-2">
        <LiquidDataGrid
          data={gridData}
          columns={columns}
          onRowClick={(row) => console.log("Clicked row:", row)}
        />
      </div>
    </div>
  );
}
