'use client';

import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Sparkle
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
}

export const TopBar: React.FC<TopBarProps> = ({
  selectedCaseId,
  onSelectCase,
  currentDraft,
  onRunScan,
  onReset,
  onApplyAll,
  isScanning,
}) => {
  const pendingCount = currentDraft.violations.filter(v => v.status === 'flagged').length;
  const isHealthy = currentDraft.score.overall >= 80;

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0d121f]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs & Scenario Selector */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <span>Enterprise Campaigns</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300 font-medium">Q4 Launch</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
        </div>

        {/* Preset Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm hover:border-slate-600 transition"
          >
            {benchmarkTestCases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 uppercase font-mono tracking-wider border border-slate-700">
          {currentDraft.channel.replace('_', ' ')}
        </span>
      </div>

      {/* Right: Score Gauge & Action Controls */}
      <div className="flex items-center space-x-3">
        {/* Compliance Health Score Pill */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
          isHealthy
            ? 'bg-teal-950/60 border-teal-500/40 text-teal-300'
            : currentDraft.score.overall >= 50
            ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
            : 'bg-red-950/60 border-red-500/40 text-red-300'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isHealthy ? 'bg-teal-400' : currentDraft.score.overall >= 50 ? 'bg-amber-400' : 'bg-red-400 animate-ping'
          }`} />
          <span>Brand Health: {currentDraft.score.overall}/100</span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-[11px] font-normal">
            {pendingCount === 0 ? 'Compliant' : `${pendingCount} Flag${pendingCount !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* 1-Click Auto Fix All Button */}
        {pendingCount > 0 && (
          <button
            onClick={onApplyAll}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 transition transform active:scale-95"
            title="Auto-apply all recommended diff fixes"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply All Fixes ({pendingCount})</span>
          </button>
        )}

        {/* Run Scan Button */}
        <button
          onClick={onRunScan}
          disabled={isScanning}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            isScanning
              ? 'bg-slate-800 text-slate-400 cursor-wait'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : 'fill-current text-teal-400'}`} />
          <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
        </button>

        <button
          onClick={onReset}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Reset to scenario defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
