'use client';

import React from 'react';
import { ShieldCheck, BookOpen, BarChart3, Users, Cpu, FileText } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenBrandBrain: () => void;
  onOpenAnalytics: () => void;
  onOpenArchitecture: () => void;
  onOpenTeam: () => void;
  onOpenPDF: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenBrandBrain,
  onOpenAnalytics,
  onOpenArchitecture,
  onOpenTeam,
  onOpenPDF
}) => {
  return (
    <header className="sticky top-0 z-40 bg-navy-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-teal-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-white">BrandAegis<span className="text-teal-400">.ai</span></span>
                <span className="bg-brand-900/60 border border-brand-500/30 text-brand-300 text-xs px-2 py-0.5 rounded-full font-medium">
                  Round 2 MVP
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Intelligent Pre-Publication Multimodal Brand Governance
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={onOpenBrandBrain}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
              title="Inspect Brand Brain (Knowledge Hub)"
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-400" />
              <span>Brand Brain</span>
            </button>

            <button
              onClick={onOpenAnalytics}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
              title="Governance Analytics Dashboard"
            >
              <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
              <span>Analytics</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
              title="Product Architecture & Tech Decisions"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Architecture</span>
            </button>

            <button
              onClick={onOpenTeam}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
              title="Team Contributions & Testing Evidence"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Team & Testing</span>
            </button>

            <button
              onClick={onOpenPDF}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-300 bg-brand-950/80 border border-brand-700/50 hover:bg-brand-900 transition"
              title="View Round 1 Proposal PDF"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span>Round 1 PDF</span>
            </button>
          </div>

          {/* Persona Role Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden md:inline">Viewing as:</span>
            <div className="inline-flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => onRoleChange('creator')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                  currentRole === 'creator'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => onRoleChange('brand_manager')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                  currentRole === 'brand_manager'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Brand Lead
              </button>
              <button
                onClick={() => onRoleChange('legal')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                  currentRole === 'legal'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Legal
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
