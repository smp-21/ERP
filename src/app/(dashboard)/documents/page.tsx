"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Folder, FileText, Image as ImageIcon, FileSpreadsheet, UploadCloud, Search, Filter, MoreVertical, Download, Share2 } from "lucide-react";
import { organicInteractions, liquidSpringPhysics, glassPanelVariants, childItemVariants } from "@/lib/motion";

const FOLDERS = [
  { id: "f1", name: "Invoices (Q2)", count: 124 },
  { id: "f2", name: "HR Policies", count: 15 },
  { id: "f3", name: "Manufacturing BOMs", count: 89 },
  { id: "f4", name: "Legal Contracts", count: 42 },
  { id: "f5", name: "Design Assets", count: 210 },
];

const DOCUMENTS = [
  { id: "d1", name: "Q2_Tax_Filing_Draft.pdf", type: "pdf", size: "2.4 MB", date: "May 09, 2026", author: "Rahul Desai" },
  { id: "d2", name: "Vendor_Agreement_V2.docx", type: "doc", size: "845 KB", date: "May 08, 2026", author: "Sarthak P." },
  { id: "d3", name: "BOM_Engine_Block.xlsx", type: "xls", size: "4.1 MB", date: "May 07, 2026", author: "Vikram S." },
  { id: "d4", name: "Factory_Floor_Layout.png", type: "img", size: "8.2 MB", date: "May 05, 2026", author: "Design Team" },
  { id: "d5", name: "Employee_Handbook_2026.pdf", type: "pdf", size: "12.5 MB", date: "Apr 28, 2026", author: "HR Dept" },
  { id: "d6", name: "Q1_Financial_Report.pdf", type: "pdf", size: "5.1 MB", date: "Apr 15, 2026", author: "Finance" },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="w-8 h-8 text-rose-500" />;
    case 'xls': return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
    case 'img': return <ImageIcon className="w-8 h-8 text-violet-500" />;
    default: return <FileText className="w-8 h-8 text-sky-500" />;
  }
};

export default function DocumentsPage() {
  const [activeFolder, setActiveFolder] = useState(FOLDERS[0].id);

  return (
    <div className="flex flex-col h-full gap-6">
      <GlassPageHeader
        title="Document Hub"
        description="Enterprise file storage, sharing, and centralized asset management."
        breadcrumbs={[{ label: "Global" }, { label: "Documents" }]}
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar: Folders */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <motion.button
            whileHover={organicInteractions.hover}
            whileTap={organicInteractions.tap}
            className="w-full py-3.5 bg-[var(--accent)] text-white font-bold rounded-xl shadow-lg glow-accent flex items-center justify-center gap-2 cursor-pointer"
          >
            <UploadCloud className="w-5 h-5" /> Upload File
          </motion.button>

          <div className="liquid-glass rounded-3xl flex-1 overflow-y-auto p-4 space-y-1">
            <h3 className="micro-label mb-3 px-3">Directories</h3>
            {FOLDERS.map(folder => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFolder === folder.id ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className={`w-4 h-4 ${activeFolder === folder.id ? 'fill-[var(--accent)]/20' : ''}`} />
                  <span className="font-semibold text-sm">{folder.name}</span>
                </div>
                {activeFolder === folder.id && (
                  <span className="micro-label bg-[var(--accent)]/20 px-2 py-0.5 rounded-full text-[var(--accent)]">{folder.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Files Grid */}
        <div className="flex-1 liquid-glass rounded-3xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--glass-border)] bg-foreground/[0.02] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]/20" />
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                {FOLDERS.find(f => f.id === activeFolder)?.name}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/[0.03] rounded-xl border border-[var(--glass-border)]">
                <Search className="w-4 h-4 text-muted" />
                <input type="text" placeholder="Search files..." className="bg-transparent border-none outline-none text-sm w-48 text-foreground placeholder:text-muted/60" />
              </div>
              <button className="p-2 bg-foreground/[0.03] rounded-xl border border-[var(--glass-border)] text-muted hover:text-foreground transition-colors cursor-pointer">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <motion.div
              variants={glassPanelVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {DOCUMENTS.map((doc, idx) => (
                <motion.div
                  layout
                  variants={childItemVariants}
                  key={doc.id}
                  className="group liquid-glass-subtle rounded-2xl p-4 hover:shadow-lg transition-all flex flex-col gap-4 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-4 -translate-y-4 scale-150">
                    {getIcon(doc.type)}
                  </div>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="p-3 bg-foreground/[0.03] rounded-xl border border-[var(--glass-border)] group-hover:bg-background transition-colors">
                      {getIcon(doc.type)}
                    </div>
                    <button className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-foreground/[0.06] transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-bold text-sm text-foreground truncate mb-1" title={doc.name}>{doc.name}</h3>
                    <p className="text-xs text-muted font-mono">{doc.size} • {doc.date}</p>
                  </div>

                  <div className="pt-4 border-t border-[var(--glass-border)] flex justify-between items-center mt-auto relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--accent)]">
                        {doc.author.charAt(0)}
                      </div>
                      <span className="text-xs text-muted font-medium truncate max-w-[100px]">{doc.author}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-colors cursor-pointer"><Download className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-muted hover:bg-foreground/[0.06] rounded-lg transition-colors cursor-pointer"><Share2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
