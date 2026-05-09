"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPageHeader } from "@/components/ui/GlassPageHeader";
import { Search, BookOpen, MessageCircle, FileQuestion, PlayCircle, ChevronDown, LifeBuoy } from "lucide-react";
import { organicInteractions, liquidSpringPhysics } from "@/lib/motion";

const CATEGORIES = [
  { icon: BookOpen, title: "User Manuals", desc: "Detailed guides for every ERP module." },
  { icon: PlayCircle, title: "Video Tutorials", desc: "Step-by-step visual training." },
  { icon: MessageCircle, title: "Community Forum", desc: "Ask questions to other users." },
  { icon: FileQuestion, title: "FAQ", desc: "Answers to common problems." },
];

const FAQS = [
  { q: "How do I reset my ERP portal password?", a: "Navigate to Global Settings > Security. If you are locked out, contact your System Administrator to receive a reset link via your registered email." },
  { q: "Where can I download my monthly payslip?", a: "Go to HR & Payroll > My Profile. Your latest payslips are available under the 'Documents' tab as downloadable PDFs." },
  { q: "Why is the Production Dashboard showing 'Offline'?", a: "This usually occurs when the edge IoT sensors lose connection to the central server. Please check the 'System Health' widget on the main dashboard for network diagnostics." },
  { q: "How do I generate a bulk GST report?", a: "Go to Finance & Accounts > GST & Tax. Select your date range and click 'Export Batch' to download the consolidated Excel report." },
];

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col h-full gap-8 overflow-y-auto pb-8">
      <GlassPageHeader
        title="Help & Support Center"
        description="Knowledge base, tutorials, and ticketing system."
        breadcrumbs={[{ label: "Global" }, { label: "Help & Support" }]}
      />

      {/* Hero Search */}
      <div className="liquid-glass rounded-3xl p-12 border border-foreground/10 flex flex-col items-center justify-center text-center relative overflow-hidden bg-indigo-500/5">
        <div className="absolute top-0 right-0 p-8 opacity-5"><LifeBuoy className="w-64 h-64" /></div>
        <div className="relative z-10 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-sans tracking-tight">How can we help you today?</h2>
          <div className="relative flex items-center">
            <Search className="absolute left-6 w-6 h-6 text-muted" />
            <input 
              type="text" 
              placeholder="Search for articles, tutorials, or error codes..." 
              className="w-full bg-background border-2 border-foreground/10 rounded-full py-5 pl-16 pr-8 text-lg focus:outline-none focus:border-indigo-500 transition-colors shadow-xl shadow-indigo-500/5 text-foreground placeholder:text-muted/60"
            />
            <button className="absolute right-3 px-6 py-3 bg-indigo-500 text-white font-bold rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={idx}
            whileHover={organicInteractions.hover}
            className="liquid-glass rounded-3xl p-6 border border-foreground/10 flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 transition-colors text-foreground group-hover:text-indigo-500">
              <cat.icon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{cat.title}</h3>
            <p className="text-sm text-muted">{cat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-2 liquid-glass rounded-3xl p-8 border border-foreground/10">
          <h2 className="text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-foreground/10 overflow-hidden bg-foreground/5">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-semibold text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-sm text-foreground/80 leading-relaxed border-t border-foreground/5 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="liquid-glass rounded-3xl p-8 border border-indigo-500/30 bg-indigo-500/5 flex flex-col justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Still need help?</h2>
          <p className="text-sm text-muted mb-8">Our enterprise support team is available 24/7 to assist you with any technical issues.</p>
          
          <button className="w-full py-4 bg-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/30 mb-4">
            Open Support Ticket
          </button>
          <button className="w-full py-4 bg-background border border-foreground/10 text-foreground font-bold rounded-xl hover:bg-foreground/5 transition-colors">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}
