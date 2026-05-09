"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "../ui/GlassPageHeader";
import { LiquidDataGrid } from "../ui/LiquidDataGrid";
import { glassPanelVariants, childItemVariants, organicInteractions } from "@/lib/motion";
import { Activity } from "lucide-react";

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
      
      {/* KPI Grid */}
      {kpis && (
        <motion.div 
          variants={glassPanelVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {kpis.map((kpi: any, idx: number) => (
            <motion.div
              key={idx}
              variants={childItemVariants}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="liquid-glass rounded-3xl p-6 relative overflow-hidden group cursor-default"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 rounded-xl bg-foreground/5 border-t border-foreground/10 text-foreground/80">
                  <Activity className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded-md ${
                  kpi.change.startsWith('+') || kpi.change === 'Optimal' || kpi.change === 'Stable' || kpi.change === 'Clear' || kpi.change === 'Compliant' || kpi.change === 'Up to date'
                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-500 dark:text-rose-400'
                }`}>
                  {kpi.change}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-foreground/50 text-sm font-sans mb-1">{kpi.label}</h3>
                <p className="text-3xl font-bold font-sans text-foreground tracking-tight">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
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
