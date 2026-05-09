"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Users, ShieldAlert, MoreVertical, Search, Plus, Mail } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const USERS = [
  { id: "USR-001", name: "Sarthak Patoliya", email: "sarthak@patoliyaindustries.com", role: "Super Admin", status: "Active", lastActive: "Just now", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: "USR-002", name: "Rahul Desai", email: "rahul.d@patoliyaindustries.com", role: "Manager", status: "Active", lastActive: "2 hrs ago", avatar: "https://i.pravatar.cc/150?u=b" },
  { id: "USR-003", name: "Vikram Sharma", email: "vikram@patoliyaindustries.com", role: "Operator", status: "Active", lastActive: "5 mins ago", avatar: "https://i.pravatar.cc/150?u=c" },
  { id: "USR-004", name: "Neha Patel", email: "neha.p@patoliyaindustries.com", role: "Finance Head", status: "Inactive", lastActive: "2 days ago", avatar: "https://i.pravatar.cc/150?u=d" },
  { id: "USR-005", name: "Amitabh P.", email: "amitabh@patoliyaindustries.com", role: "Read Only", status: "Active", lastActive: "1 hr ago", avatar: "https://i.pravatar.cc/150?u=e" },
];

export default function SettingsUsersPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <GlassPageHeader
        title="Access Management"
        description="Manage enterprise users, assign role-based access control (RBAC), and monitor activity."
        breadcrumbs={[{ label: "Settings" }, { label: "Users" }]}
      />

      <div className="flex justify-between items-center bg-foreground/5 p-2 rounded-2xl border border-foreground/10 liquid-glass">
        <div className="flex items-center gap-2 px-4 w-full max-w-md">
          <Search className="w-5 h-5 text-muted" />
          <input type="text" placeholder="Search by name, email, or role..." className="w-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted py-2" />
        </div>
        <div className="flex gap-2 pr-2">
          <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-background shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Invite User
          </button>
        </div>
      </div>

      <div className="flex-1 liquid-glass rounded-3xl overflow-hidden border border-foreground/10 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs uppercase bg-foreground/5 text-muted sticky top-0 backdrop-blur-md z-10 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Role Access</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Last Active</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5 text-foreground/80">
              {USERS.map((user) => (
                <tr key={user.id} className="hover:bg-foreground/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-foreground/10" />
                      <div>
                        <p className="font-bold font-sans text-foreground">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                      user.role === 'Super Admin' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                      user.role === 'Finance Head' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      user.role === 'Read Only' ? 'bg-foreground/10 text-foreground/60 border-foreground/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${user.status === 'Active' ? 'text-emerald-500' : 'text-muted'}`}>
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-foreground/20'}`}></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-foreground/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4 text-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1, transition: liquidSpringPhysics }}
              exit={{ scale: 0.95, y: 20, opacity: 0, transition: { duration: 0.15 } }}
              className="relative w-full max-w-md liquid-glass rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl"
            >
              <div className="p-6 border-b border-foreground/10">
                <h2 className="text-xl font-bold font-sans text-foreground">Invite New User</h2>
                <p className="text-sm text-muted mt-1">Send an invitation link to grant system access.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <input type="email" placeholder="colleague@company.com" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider">Assign Role</label>
                  <select className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>Manager</option>
                    <option>Operator</option>
                    <option>Read Only</option>
                    <option>Finance Head</option>
                  </select>
                </div>
                
                <div className="flex items-start gap-3 p-3 mt-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-medium">This user will have access to sensitive financial data based on the assigned role.</p>
                </div>
              </div>
              <div className="p-6 border-t border-foreground/10 flex justify-end gap-3 bg-foreground/5">
                <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground">Cancel</button>
                <button className="px-4 py-2 text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-colors">Send Invite</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
