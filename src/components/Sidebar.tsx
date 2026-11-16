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
  Sun,
  Moon,
  Compass
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
  onStartTour: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
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
  onStartTour,
  isDark,
  onToggleTheme,
}) => {
  return (
    <aside className={`w-64 border-r flex flex-col justify-between h-screen sticky top-0 select-none z-30 transition-colors duration-200 ${
      isDark 
        ? 'bg-[#0a0e17] border-slate-800/80 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top Branding & Workspace Switcher */}
      <div>
        <div className={`p-4 border-b ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight flex items-center space-x-1">
                  <span>BrandAegis</span>
                  <span className="text-teal-400 font-mono text-[11px]">AI</span>
                </span>
                <span className={`text-[10px] block -mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Pre-Publication Governance
                </span>
              </div>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-lg border transition ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Knowledge Hub / Brand Kit */}
          <button
            id="tour-brand-brain"
            onClick={onOpenBrandBrain}
            className={`mt-3.5 w-full rounded-lg p-2 text-left flex items-center justify-between transition border group ${
              isDark 
                ? 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <div className="truncate">
                <span className={`text-[11px] font-semibold block truncate ${isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800'}`}>
                  Apex Global v4.2
                </span>
                <span className={`text-[9px] block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Claim Registry &amp; Voice Tokens
                </span>
              </div>
            </div>
            <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 transition shrink-0 ml-1" />
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-3 space-y-1">
          <span className={`px-2 text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Workstation
          </span>

          <button
            onClick={() => onTabChange('studio')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'studio'
                ? isDark 
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                  : 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Content Studio &amp; Diff</span>
          </button>

          <button
            onClick={() => onTabChange('visual')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'visual'
                ? isDark 
                  ? 'bg-teal-600/15 text-teal-400 border border-teal-500/30' 
                  : 'bg-teal-50 text-teal-700 border border-teal-200 font-semibold'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-500" />
            <span>Visual Linter &amp; Canvas</span>
          </button>

          <button
            onClick={() => onTabChange('workflow')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
              currentTab === 'workflow'
                ? isDark 
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
            <span>Approval Gates &amp; Audit</span>
          </button>

          <span className={`px-2 text-[10px] font-bold uppercase tracking-wider block pt-3 mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Governance &amp; Insights
          </span>

          <button
            onClick={onOpenBrandBrain}
            className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Brand Brain Hub</span>
          </button>

          <button
            onClick={onOpenAnalytics}
            className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Executive Analytics</span>
          </button>
        </div>

        {/* Guided Tour & Judge Review Toolkit */}
        <div className="px-3 pt-2">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-amber-500/80' : 'text-amber-700'}`}>
              Judge Toolkit
            </span>
            <button
              onClick={onStartTour}
              className="text-[10px] text-blue-500 hover:underline flex items-center space-x-0.5 font-semibold"
              title="Launch step-by-step interactive tour"
            >
              <Compass className="w-3 h-3 text-blue-500" />
              <span>Tour</span>
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={onOpenArchitecture}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition ${
                isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>Architecture &amp; Tech Specs</span>
            </button>

            <button
              onClick={onOpenTeam}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition ${
                isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>User Testing &amp; Team Roles</span>
            </button>

            <button
              onClick={onOpenPDF}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition ${
                isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>View Round 1 PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persona Role Switcher at Bottom */}
      <div className={`p-3 border-t transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
      }`}>
        <span className={`text-[10px] font-semibold block mb-1.5 px-1 uppercase tracking-wider ${
          isDark ? 'text-slate-500' : 'text-slate-500'
        }`}>
          Testing Persona Role
        </span>

        <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => onRoleChange('creator')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'creator'
                ? 'bg-blue-600 text-white shadow'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Creator
          </button>
          <button
            onClick={() => onRoleChange('brand_manager')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'brand_manager'
                ? 'bg-blue-600 text-white shadow'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Brand
          </button>
          <button
            onClick={() => onRoleChange('legal')}
            className={`py-1 text-[10px] font-semibold rounded transition ${
              currentRole === 'legal'
                ? 'bg-blue-600 text-white shadow'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Legal
          </button>
        </div>
      </div>
    </aside>
  );
};
