'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { LinterStudio } from '@/components/LinterStudio';
import { BrandBrainModal } from '@/components/BrandBrainModal';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { ArchitectureModal } from '@/components/ArchitectureModal';
import { TeamContributionsModal } from '@/components/TeamContributionsModal';
import { defaultBrandBrain } from '@/lib/brandBrain';
import { UserRole } from '@/lib/types';
import { Sparkles, Shield, Info, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>('creator');
  const [isBrandBrainOpen, setIsBrandBrainOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  const handleOpenPDF = () => {
    window.open('/BrandAegis_Round1_Submission.pdf', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenBrandBrain={() => setIsBrandBrainOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenTeam={() => setIsTeamOpen(true)}
        onOpenPDF={handleOpenPDF}
      />

      {/* Judge / Evaluator Banner */}
      <section className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-white block">
                Welcome Hackathon Judges: BrandAegis AI Functional Round 2 MVP
              </span>
              <p className="text-slate-400 text-[11px]">
                Autonomous pre-publication governance co-pilot &bull; Grounded RAG with clause-exact citations &bull; Non-destructive diffs &bull; Multimodal Computer Vision
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
              Active Role: <strong className="text-teal-400 capitalize">{currentRole.replace('_', ' ')}</strong>
            </span>
            <button
              onClick={() => setIsArchitectureOpen(true)}
              className="px-2.5 py-1 bg-brand-600 hover:bg-brand-500 text-white rounded font-medium transition"
            >
              Tech Decisions
            </button>
            <button
              onClick={() => setIsTeamOpen(true)}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium transition"
            >
              Team &amp; Testing Evals
            </button>
          </div>
        </div>
      </section>

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LinterStudio currentRole={currentRole} />
      </main>

      {/* Modals */}
      <BrandBrainModal
        isOpen={isBrandBrainOpen}
        onClose={() => setIsBrandBrainOpen(false)}
        brandBrain={defaultBrandBrain}
      />

      <AnalyticsDashboard
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <TeamContributionsModal
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
      />

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-brand-600" />
            <span className="font-semibold text-slate-800">BrandAegis AI Platform</span>
            <span>&bull; Hackathon Round 2 Working MVP</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsBrandBrainOpen(true)} className="hover:text-slate-800 transition">
              Brand Brain v4.2
            </button>
            <button onClick={() => setIsArchitectureOpen(true)} className="hover:text-slate-800 transition">
              Architecture Blueprint
            </button>
            <button onClick={() => setIsTeamOpen(true)} className="hover:text-slate-800 transition">
              User Testing Evals
            </button>
            <span className="text-slate-400">Zero Data Retention (ZDR) Guaranteed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
