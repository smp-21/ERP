"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import {
  Settings2, Globe, Building2, CreditCard, Plug, Users, Save, Upload,
  CheckCircle2, Wifi, WifiOff, IndianRupee, Clock, Calendar
} from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const TABS = [
  { id: "general", label: "General Config", icon: Settings2 },
  { id: "company", label: "Company Profile", icon: Building2 },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "billing", label: "Subscription & Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "team", label: "Team Settings", icon: Users },
];

const INTEGRATIONS = [
  { name: "Tally ERP 9", desc: "Accounting data sync", connected: true },
  { name: "Razorpay", desc: "Payment gateway", connected: true },
  { name: "GST Portal", desc: "Auto-filing & returns", connected: true },
  { name: "Slack", desc: "Notifications & alerts", connected: false },
  { name: "WhatsApp Business", desc: "Customer communication", connected: false },
  { name: "Zoho CRM", desc: "Lead & pipeline sync", connected: false },
];

function InputField({ label, defaultValue, type = "text", placeholder = "" }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="micro-label">{label}</label>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder} className="w-full bg-foreground/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors" />
    </div>
  );
}

function SelectField({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label className="micro-label">{label}</label>
      <select defaultValue={defaultValue} className="w-full bg-foreground/[0.03] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ToggleRow({ title, desc, defaultOn = false }: { title: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
      <div className="min-w-0 mr-4">
        <h3 className="font-semibold text-sm text-foreground truncate">{title}</h3>
        <p className="text-xs text-muted mt-1 break-words">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)} className={`relative w-12 h-6 rounded-full shrink-0 transition-colors cursor-pointer ${on ? 'bg-[var(--accent)]' : 'bg-foreground/15'}`}>
        <motion.div className="w-4 h-4 rounded-full bg-white absolute top-1" initial={false} animate={{ left: on ? '26px' : '4px' }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
      </button>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="pt-6 border-t border-[var(--glass-border)] flex justify-end">
      <motion.button whileHover={organicInteractions.hover} whileTap={organicInteractions.tap} className="px-6 py-2.5 bg-[var(--accent)] text-white font-bold rounded-xl shadow-lg glow-accent flex items-center gap-2 cursor-pointer">
        <Save className="w-4 h-4" /> Save Changes
      </motion.button>
    </div>
  );
}

export default function GlobalSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader title="Global Configuration" description="Manage platform-wide settings, themes, and integrations." breadcrumbs={[{ label: "Global" }, { label: "Settings" }]} />

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        <div className="w-full md:w-64 liquid-glass rounded-3xl p-3 h-max shrink-0">
          <nav className="flex flex-col gap-0.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold relative cursor-pointer ${isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground hover:bg-foreground/[0.04]"}`}>
                  {isActive && <motion.div layoutId="activeSettingsTab" className="absolute inset-0 bg-[var(--accent)]/[0.08] rounded-xl border border-[var(--accent)]/20 shadow-inner" transition={liquidSpringPhysics} />}
                  <tab.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[var(--accent)]' : ''}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 liquid-glass rounded-3xl p-6 md:p-8 overflow-y-auto scrollbar-hide relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={liquidSpringPhysics} className="max-w-2xl space-y-8">

              {activeTab === "general" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">General Preferences</h2><p className="text-sm text-muted">Manage core behavior of your Liquid Glass ERP.</p></div>
                <div className="space-y-4">
                  <ToggleRow title="Maintenance Mode" desc="Suspend access for all non-admin users during updates." />
                  <ToggleRow title="Email Notifications" desc="Send automated alerts for critical events." defaultOn={true} />
                  <ToggleRow title="Auto-Backup (Daily)" desc="Automatically backup database every 24 hours at 02:00 IST." defaultOn={true} />
                  <InputField label="System Timeout (Minutes)" defaultValue="30" type="number" />
                  <SelectField label="Default Dashboard View" options={["Manufacturing Command Center", "Sales & CRM Dashboard", "Global Analytics", "Finance Overview"]} />
                  <SelectField label="Data Retention Period" options={["6 Months", "1 Year", "2 Years", "5 Years", "Indefinite"]} defaultValue="2 Years" />
                </div>
                <SaveBar />
              </>)}

              {activeTab === "company" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">Company Profile</h2><p className="text-sm text-muted">Legal entity details and branding for invoices and government filings.</p></div>
                <div className="space-y-6">
                  {/* Logo Uploader */}
                  <div className="space-y-2">
                    <label className="micro-label">Company Logo</label>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-[var(--accent)]/10 border-2 border-dashed border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                        <span className="text-2xl font-extrabold">PI</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <motion.button whileHover={organicInteractions.hover} whileTap={organicInteractions.tap} className="px-4 py-2.5 bg-foreground/[0.04] border border-[var(--glass-border)] rounded-xl text-sm font-bold text-foreground flex items-center gap-2 cursor-pointer">
                          <Upload className="w-4 h-4" /> Upload Logo
                        </motion.button>
                        <p className="text-[10px] text-muted mt-2">PNG, SVG, or JPG. Max 2MB. Recommended: 512×512px.</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Company Name (Legal)" defaultValue="Patoliya Industries Pvt Ltd" />
                    <InputField label="Trade Name / Brand" defaultValue="Patoliya Industries" />
                    <InputField label="GSTIN" defaultValue="24AABCP1234A1Z5" />
                    <InputField label="PAN" defaultValue="AABCP1234A" />
                    <InputField label="CIN (Company Identification)" defaultValue="U28900GJ2018PTC101234" />
                    <InputField label="MSME / Udyam Registration" defaultValue="UDYAM-GJ-24-0012345" />
                  </div>
                  <InputField label="Registered Address" defaultValue="Plot 42, GIDC Industrial Estate, Phase-II, Ahmedabad, Gujarat — 382445" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Contact Phone" defaultValue="+91 79 2555 1234" />
                    <InputField label="Corporate Email" defaultValue="info@patoliyaindustries.com" type="email" />
                  </div>
                </div>
                <SaveBar />
              </>)}

              {activeTab === "localization" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">Localization</h2><p className="text-sm text-muted">Regional formatting for currency, dates, and timezone across the platform.</p></div>
                <div className="space-y-6">
                  <SelectField label="Default Currency" options={["₹ INR — Indian Rupee", "$ USD — US Dollar", "€ EUR — Euro", "£ GBP — British Pound", "¥ JPY — Japanese Yen"]} defaultValue="₹ INR — Indian Rupee" />
                  <SelectField label="Timezone" options={["Asia/Kolkata (IST, UTC+05:30)", "America/New_York (EST, UTC-05:00)", "Europe/London (GMT, UTC+00:00)", "Asia/Tokyo (JST, UTC+09:00)", "Asia/Dubai (GST, UTC+04:00)"]} defaultValue="Asia/Kolkata (IST, UTC+05:30)" />
                  <SelectField label="Date Format" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "DD-MMM-YYYY"]} defaultValue="DD/MM/YYYY" />
                  <SelectField label="Number Format" options={["1,23,456.78 (Indian)", "1,234,567.89 (International)", "1.234.567,89 (European)"]} defaultValue="1,23,456.78 (Indian)" />
                  <SelectField label="Financial Year Start" options={["April (India Standard)", "January (Calendar Year)", "July (AU/NZ Standard)"]} defaultValue="April (India Standard)" />
                  <SelectField label="Language" options={["English (India)", "English (US)", "Hindi (हिंदी)", "Gujarati (ગુજરાતી)"]} defaultValue="English (India)" />
                </div>
                <SaveBar />
              </>)}

              {activeTab === "billing" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">Subscription & Billing</h2><p className="text-sm text-muted">Current plan, usage metrics, and payment history.</p></div>
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-[var(--accent)]/[0.06] border border-[var(--accent)]/15">
                    <div className="flex items-center justify-between mb-2">
                      <span className="micro-label text-[var(--accent)]">Current Plan</span>
                      <span className="px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold rounded-lg border border-[var(--accent)]/20">Active</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-foreground">Enterprise Unlimited</h3>
                    <p className="text-sm text-muted mt-1">Billed annually • Renews 01 Apr 2027</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[{ label: "Monthly Cost", value: "₹24,999" }, { label: "Users", value: "25 / ∞" }, { label: "Storage", value: "48 GB / 500 GB" }].map(m => (
                      <div key={m.label} className="p-4 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)] text-center">
                        <p className="micro-label mb-1">{m.label}</p>
                        <p className="text-lg font-extrabold text-foreground tabular-nums">{m.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="micro-label">Recent Invoices</p>
                    {[{ id: "INV-2026-04", date: "01 Apr 2026", amount: "₹2,99,988", status: "Paid" }, { id: "INV-2025-04", date: "01 Apr 2025", amount: "₹2,49,988", status: "Paid" }].map(inv => (
                      <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                        <div><p className="text-sm font-bold text-foreground">{inv.id}</p><p className="text-[10px] text-muted">{inv.date}</p></div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-foreground">{inv.amount}</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-lg border border-emerald-500/20">{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>)}

              {activeTab === "integrations" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">Integrations</h2><p className="text-sm text-muted">Connect third-party services to extend ERP capabilities.</p></div>
                <div className="space-y-3">
                  {INTEGRATIONS.map(itg => (
                    <div key={itg.name} className="flex items-center justify-between p-4 rounded-2xl bg-foreground/[0.03] border border-[var(--glass-border)]">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${itg.connected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-foreground/[0.04] text-muted'}`}>
                          {itg.connected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-foreground truncate">{itg.name}</h4>
                          <p className="text-xs text-muted truncate">{itg.desc}</p>
                        </div>
                      </div>
                      <motion.button whileHover={organicInteractions.hover} whileTap={organicInteractions.tap} className={`px-4 py-2 text-xs font-bold rounded-xl shrink-0 cursor-pointer ${itg.connected ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-[var(--accent)] text-white glow-accent'}`}>
                        {itg.connected ? "Connected" : "Connect"}
                      </motion.button>
                    </div>
                  ))}
                </div>
              </>)}

              {activeTab === "team" && (<>
                <div><h2 className="text-xl font-extrabold text-foreground tracking-tight mb-1">Team Settings</h2><p className="text-sm text-muted">Configure organization-wide team policies and defaults.</p></div>
                <div className="space-y-4">
                  <ToggleRow title="Require Manager Approval for Leave" desc="All leave requests need manager sign-off before processing." defaultOn={true} />
                  <ToggleRow title="Allow Self-Service Password Reset" desc="Employees can reset passwords via email OTP without admin." defaultOn={true} />
                  <ToggleRow title="Enforce Single Sign-On (SSO)" desc="Mandate SSO for all users. Disables password-based login." />
                  <SelectField label="Default User Role" options={["Read Only", "Operator", "Manager"]} defaultValue="Read Only" />
                  <InputField label="Maximum Concurrent Sessions" defaultValue="3" type="number" />
                  <SelectField label="IP Allowlist Mode" options={["Disabled", "Warn Only", "Strict (Block)"]} defaultValue="Disabled" />
                </div>
                <SaveBar />
              </>)}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
