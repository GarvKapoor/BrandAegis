'use client';

import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  BarChart3, 
  Layers, 
  FileText, 
  Cpu, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '@/lib/types';

interface SidebarProps {
  currentTab: 'studio' | 'visual' | 'workflow';
  onTabChange: (tab: 'studio' | 'visual' | 'workflow') => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenBrandBrain: () => void;
  onOpenAnalytics: () => void;
  onOpenArchitecture: () => void;
  onOpenTeam: () => void;
  onOpenPDF: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  currentRole,
  onRoleChange,
  onOpenBrandBrain,
  onOpenAnalytics,
  onOpenArchitecture,
  onOpenTeam,
  onOpenPDF,
}) => {
  return (
    <aside className="w-64 bg-[#0a0e17] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      {/* Top Branding & Workspace Switcher */}
      <div>
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center space-x-1.5">
                <span>BrandAegis</span>
                <span className="text-teal-400 font-mono text-[11px]">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">Pre-Publication Governance</span>
            </div>
          </div>

          {/* Active Knowledge Hub / Brand Kit */}
          <button
            onClick={onOpenBrandBrain}
            className="mt-3.5 w-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-lg p-2 text-left flex items-center justify-between transition group"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <div className="truncate">
                <span className="text-[11px] font-semibold text-slate-200 block truncate group-hover:text-white">
                  Apex Global v4.2
                </span>
                <span className="text-[9px] text-slate-500 block">Claim Registry &amp; Voice Tokens</span>
              </div>
            </div>
            <BookOpen className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition shrink-0 ml-1" />
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-3 space-y-1">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Workstation
          </span>

          <button
            onClick={() => onTabChange('studio')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'studio'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Content Studio &amp; Diff</span>
          </button>

          <button
            onClick={() => onTabChange('visual')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'visual'
                ? 'bg-teal-600/15 text-teal-400 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Visual Linter &amp; Canvas</span>
          </button>

          <button
            onClick={() => onTabChange('workflow')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'workflow'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Approval Gates &amp; Audit</span>
          </button>

          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 block pt-4 mb-1">
            Governance &amp; Insights
          </span>

          <button
            onClick={onOpenBrandBrain}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Brand Brain Hub</span>
          </button>

          <button
            onClick={onOpenAnalytics}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition"
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Executive Analytics</span>
          </button>
        </div>

        {/* Hackathon Judge Dossier Shortcuts */}
        <div className="px-3 pt-2">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-amber-500/80 block mb-1">
            Judge Review Toolkit
          </span>

          <div className="space-y-1">
            <button
              onClick={onOpenArchitecture}
              className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Architecture &amp; Tech Specs</span>
            </button>

            <button
              onClick={onOpenTeam}
              className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>User Testing &amp; Team Roles</span>
            </button>

            <button
              onClick={onOpenPDF}
              className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>View Round 1 PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persona Role Switcher at Bottom */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <span className="text-[10px] text-slate-500 font-semibold block mb-1.5 px-1 uppercase tracking-wider">
          Testing Persona Role
        </span>

        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onRoleChange('creator')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'creator'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Creator
          </button>
          <button
            onClick={() => onRoleChange('brand_manager')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'brand_manager'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Brand
          </button>
          <button
            onClick={() => onRoleChange('legal')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'legal'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Legal
          </button>
        </div>
      </div>
    </aside>
  );
};
