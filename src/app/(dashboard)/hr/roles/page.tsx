"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { ShieldCheck, ShieldAlert, KeyRound, Users, UserCog, Lock, Plus } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const ROLES = ["System Admin", "HR Manager", "Plant Supervisor", "Finance Controller", "Standard Staff"];

const MODULE_PERMISSIONS = [
  { module: "Dashboard", sub: "Global Analytics", admin: true, hr: true, plant: true, finance: true, staff: true },
  { module: "HR & Payroll", sub: "Salary Disbursal", admin: true, hr: true, plant: false, finance: true, staff: false },
  { module: "HR & Payroll", sub: "Attendance Mgmt", admin: true, hr: true, plant: true, finance: false, staff: false },
  { module: "Manufacturing", sub: "BOM Config", admin: true, hr: false, plant: true, finance: false, staff: false },
  { module: "Finance", sub: "Tax & GST Filing", admin: true, hr: false, plant: false, finance: true, staff: false },
  { module: "System Settings", sub: "API Gateway", admin: true, hr: false, plant: false, finance: false, staff: false },
  { module: "System Settings", sub: "Role Matrix", admin: true, hr: true, plant: false, finance: false, staff: false },
];

export default function HrRolesPage() {
  const [activeRole, setActiveRole] = useState(ROLES[1]);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Role & Access Control"
        description="Define security profiles and manage module-level permissions matrix."
        breadcrumbs={[{ label: "HR & Payroll" }, { label: "Roles" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Zero Trust Active</h2>
          <p className="text-sm text-muted mt-2">All unassigned endpoints default to implicit deny.</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <UserCog className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">5 Defined Roles</h2>
          <p className="text-sm text-muted mt-2">Custom role creation is available for Enterprise tiers.</p>
        </div>
        <div className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col justify-center">
          <h3 className="font-bold text-foreground mb-4 text-sm flex items-center gap-2"><KeyRound className="w-4 h-4 text-indigo-500" /> Active Security Keys</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">SSO Enforcement</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 font-bold text-[10px] uppercase rounded">Enabled</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">MFA Requirement</span>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 font-bold text-[10px] uppercase rounded">Admins Only</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">Session Timeout</span>
              <span className="font-mono text-foreground font-bold">30 mins</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 liquid-glass rounded-3xl border border-foreground/10 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-foreground/10 bg-foreground/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeRole === role ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-background border border-foreground/10 text-foreground hover:bg-foreground/5'
                }`}
              >
                {role}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg text-sm font-bold bg-background border border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/5 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Role
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Module / Endpoint</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Read Access</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Write / Execute</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {MODULE_PERMISSIONS.map((perm, idx) => {
                // Determine if this role has access based on mock data logic
                let hasAccess = false;
                if (activeRole === "System Admin") hasAccess = perm.admin;
                if (activeRole === "HR Manager") hasAccess = perm.hr;
                if (activeRole === "Plant Supervisor") hasAccess = perm.plant;
                if (activeRole === "Finance Controller") hasAccess = perm.finance;
                if (activeRole === "Standard Staff") hasAccess = perm.staff;

                return (
                  <tr key={idx} className="hover:bg-foreground/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground">{perm.module}</p>
                      <p className="text-xs text-muted flex items-center gap-1 mt-0.5"><Lock className="w-3 h-3" /> {perm.sub}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <ToggleSwitch active={hasAccess} disabled={activeRole === "System Admin"} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <ToggleSwitch active={hasAccess && activeRole !== "Standard Staff"} disabled={activeRole === "System Admin"} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <ToggleSwitch active={hasAccess && activeRole === "System Admin"} disabled={activeRole === "System Admin"} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ active, disabled }: { active: boolean, disabled?: boolean }) {
  return (
    <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-indigo-500' : 'bg-foreground/20'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <motion.div 
        layout
        transition={liquidSpringPhysics}
        className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
        style={{ left: active ? 'calc(100% - 20px)' : '4px' }}
      />
    </div>
  );
}
