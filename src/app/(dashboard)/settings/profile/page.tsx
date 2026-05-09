"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { User, Shield, Bell, Save } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Preferences", icon: Bell },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Profile Settings"
        description="Manage your enterprise account, security credentials, and system preferences."
        breadcrumbs={[{ label: "Settings" }, { label: "Profile" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? "liquid-glass border-l-4 border-l-indigo-500 shadow-md" 
                  : "text-muted hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          transition={liquidSpringPhysics}
          className="md:col-span-3 liquid-glass rounded-3xl p-8"
        >
          {activeTab === "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-foreground/10">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-foreground">Sarthak Patoliya</h3>
                  <p className="text-muted text-sm mt-1">ERP Administrator • Patoliya Industries Pvt Ltd</p>
                  <button className="mt-3 text-xs font-medium text-indigo-500 hover:text-indigo-400">Change Avatar</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider">First Name</label>
                  <input type="text" defaultValue="Sarthak" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider">Last Name</label>
                  <input type="text" defaultValue="Patoliya" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider">Corporate Email</label>
                  <input type="email" defaultValue="sarthak@patoliyaindustries.com" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold font-sans text-foreground mb-4">Security Credentials</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10 rounded-2xl">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted mt-1">Secure your account with TOTP (Authenticator App)</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-lg border border-emerald-500/20">Enabled</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10 rounded-2xl">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Password Status</h4>
                    <p className="text-xs text-muted mt-1">Last changed 45 days ago</p>
                  </div>
                  <button className="text-xs font-semibold text-indigo-500 hover:text-indigo-400">Update</button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-foreground/10 flex justify-end gap-4">
            <button className="px-5 py-2.5 text-sm font-medium text-muted hover:text-foreground">Cancel</button>
            <motion.button 
              whileHover={organicInteractions.hover}
              whileTap={organicInteractions.tap}
              className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-xl shadow-lg shadow-foreground/20"
            >
              <Save className="w-4 h-4" /> Save Changes
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
