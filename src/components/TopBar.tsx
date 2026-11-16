'use client';

import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  ChevronRight,
  Compass,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import { ContentDraft } from '@/lib/types';
import { benchmarkTestCases } from '@/lib/benchmarkData';

interface TopBarProps {
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  currentDraft: ContentDraft;
  onRunScan: () => void;
  onReset: () => void;
  onApplyAll: () => void;
  isScanning: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onStartTour: () => void;
  onBackToLanding?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedCaseId,
  onSelectCase,
  currentDraft,
  onRunScan,
  onReset,
  onApplyAll,
  isScanning,
  isDark,
  onToggleTheme,
  onStartTour,
  onBackToLanding,
}) => {
  const pendingCount = currentDraft.violations.filter(v => v.status === 'flagged').length;
  const isHealthy = currentDraft.score.overall >= 80;

  return (
    <header className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md transition-colors duration-200 ${
      isDark 
        ? 'bg-[#0d121f]/90 border-slate-800/80 text-white' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Left: Breadcrumbs & Scenario Selector */}
      <div className="flex items-center space-x-3">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Return to Product Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>
        )}

        <div className={`hidden md:flex items-center space-x-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span>Campaigns</span>
          <ChevronRight className="w-3 h-3 text-slate-500" />
          <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Q4 Launch</span>
          <ChevronRight className="w-3 h-3 text-slate-500" />
        </div>

        {/* Preset Selector Dropdown with Tour Target */}
        <div id="tour-scenario-selector" className="relative">
          <select
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className={`border rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm transition ${
              isDark 
                ? 'bg-slate-900 border-slate-700/80 text-white hover:border-slate-600' 
                : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
            }`}
          >
            {benchmarkTestCases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-mono tracking-wider border ${
          isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {currentDraft.channel.replace('_', ' ')}
        </span>
      </div>

      {/* Right: Score Gauge & Action Controls */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Interactive Guided Tour Trigger */}
        <button
          onClick={onStartTour}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
            isDark 
              ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white' 
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title="Launch Step-by-Step Interactive Guide"
        >
          <Compass className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
          <span className="hidden sm:inline">Guided Tour</span>
        </button>

        {/* Compliance Health Score Pill */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
          isHealthy
            ? isDark 
              ? 'bg-teal-950/60 border-teal-500/40 text-teal-300' 
              : 'bg-teal-50 border-teal-300 text-teal-800'
            : currentDraft.score.overall >= 50
            ? isDark 
              ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' 
              : 'bg-amber-50 border-amber-300 text-amber-800'
            : isDark 
              ? 'bg-red-950/60 border-red-500/40 text-red-300' 
              : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isHealthy ? 'bg-teal-500' : currentDraft.score.overall >= 50 ? 'bg-amber-500' : 'bg-red-500 animate-ping'
          }`} />
          <span>Score: {currentDraft.score.overall}/100</span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-[11px] font-normal">
            {pendingCount === 0 ? 'Compliant' : `${pendingCount} Flag${pendingCount !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* 1-Click Auto Fix All Button */}
        {pendingCount > 0 && (
          <button
            onClick={onApplyAll}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition transform active:scale-95"
            title="Auto-apply all recommended diff fixes"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Apply All Fixes</span>
            <span className="sm:hidden">Fix All</span>
            <span>({pendingCount})</span>
          </button>
        )}

        {/* Run Scan Button */}
        <button
          onClick={onRunScan}
          disabled={isScanning}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : 'fill-current text-teal-500'}`} />
          <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
        </button>

        <button
          onClick={onReset}
          className={`p-1.5 rounded-lg transition ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Reset to scenario defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
