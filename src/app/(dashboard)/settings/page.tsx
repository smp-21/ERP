"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { SlidersHorizontal, Settings2, Globe, Building2, CreditCard, Plug, Users, Save } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const TABS = [
  { id: "general", label: "General Config", icon: Settings2 },
  { id: "company", label: "Company Profile", icon: Building2 },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "billing", label: "Subscription & Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "team", label: "Team Settings", icon: Users },
];

export default function GlobalSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Global Configuration"
        description="Manage platform-wide settings, themes, and integrations."
        breadcrumbs={[{ label: "Global" }, { label: "Settings" }]}
      />

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        <div className="w-full md:w-64 liquid-glass rounded-3xl border border-foreground/10 p-3 h-max">
          <nav className="flex flex-col gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold relative ${
                    isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeSettingsTab" 
                      className="absolute inset-0 bg-foreground/10 rounded-xl border border-foreground/5 specular-edge shadow-inner" 
                      transition={liquidSpringPhysics}
                    />
                  )}
                  <tab.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-indigo-500' : ''}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 liquid-glass rounded-3xl border border-foreground/10 p-6 md:p-8 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">General Preferences</h2>
                  <p className="text-sm text-muted">Manage core behavior of your Liquid Glass ERP.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-foreground/5 border border-foreground/5">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">Maintenance Mode</h3>
                      <p className="text-xs text-muted mt-1">Suspend access for all non-admin users during updates.</p>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-foreground/20 transition-colors">
                      <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1 shadow-sm" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">System Timeout (Minutes)</label>
                    <input type="number" defaultValue={30} className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Default Dashboard View</label>
                    <select className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                      <option>Manufacturing Command Center</option>
                      <option>Sales & CRM Dashboard</option>
                      <option>Global Analytics</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-foreground/10 flex justify-end">
                  <motion.button 
                    whileHover={organicInteractions.hover}
                    whileTap={organicInteractions.tap}
                    className="px-6 py-2.5 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab !== "general" && (
              <motion.div
                key="other"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-6 text-muted">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Module Under Construction</h2>
                <p className="text-sm text-muted">The {TABS.find(t => t.id === activeTab)?.label} module is currently being upgraded to the Liquid Glass design system. Check back soon.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
