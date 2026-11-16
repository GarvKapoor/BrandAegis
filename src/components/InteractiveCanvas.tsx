'use client';

import React, { useState } from 'react';
import { ContentDraft, Violation } from '@/lib/types';
import { 
  Sparkles, 
  Code, 
  CheckCircle2, 
  AlertOctagon, 
  Eye, 
  Palette,
  FileCheck,
  ArrowRight
} from 'lucide-react';

interface InteractiveCanvasProps {
  currentDraft: ContentDraft;
  onTextChange: (newText: string) => void;
  onApplyFix: (violationId: string) => void;
  activeViolationId?: string | null;
  onSelectViolation: (violationId: string) => void;
  isDark: boolean;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  currentDraft,
  onTextChange,
  onApplyFix,
  activeViolationId,
  onSelectViolation,
  isDark,
}) => {
  const [canvasMode, setCanvasMode] = useState<'preview' | 'diff' | 'editor'>('preview');

  // Render text with interactive glowing highlights on flagged spans
  const renderInteractiveText = () => {
    let text = currentDraft.rawText;
    const flaggedViolations = currentDraft.violations.filter(
      v => v.status === 'flagged' && v.flaggedSpan
    );

    if (flaggedViolations.length === 0) {
      return (
        <p className={`text-sm leading-relaxed font-normal whitespace-pre-wrap ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        }`}>
          {text}
        </p>
      );
    }

    const segments: React.ReactNode[] = [];
    let keyIdx = 0;

    const sorted = [...flaggedViolations].sort((a, b) => {
      const idxA = text.indexOf(a.flaggedSpan || '');
      const idxB = text.indexOf(b.flaggedSpan || '');
      return idxA - idxB;
    });

    let currentPos = 0;
    sorted.forEach((viol) => {
      const span = viol.flaggedSpan || '';
      const idx = text.indexOf(span, currentPos);
      if (idx !== -1) {
        if (idx > currentPos) {
          segments.push(
            <span key={`text_${keyIdx++}`} className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              {text.slice(currentPos, idx)}
            </span>
          );
        }

        const isSelected = activeViolationId === viol.id;
        const isCritical = viol.severity === 'critical';

        segments.push(
          <span
            key={`viol_${viol.id}`}
            onClick={() => onSelectViolation(viol.id)}
            className={`inline-block cursor-pointer px-1.5 py-0.5 rounded transition mx-0.5 relative group ${
              isCritical
                ? isDark
                  ? 'bg-red-500/20 text-red-300 border-b-2 border-red-500 hover:bg-red-500/30'
                  : 'bg-red-100 text-red-800 border-b-2 border-red-600 hover:bg-red-200'
                : isDark
                  ? 'bg-amber-500/20 text-amber-300 border-b-2 border-amber-500 hover:bg-amber-500/30'
                  : 'bg-amber-100 text-amber-900 border-b-2 border-amber-600 hover:bg-amber-200'
            } ${isSelected ? 'ring-2 ring-blue-500 shadow-md scale-105' : ''}`}
            title="Click to inspect rule in Copilot panel"
          >
            <span className="font-semibold">{span}</span>
            <span className={`text-[9px] uppercase font-bold px-1 ml-1 rounded ${
              isCritical ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {viol.category}
            </span>
          </span>
        );

        currentPos = idx + span.length;
      }
    });

    if (currentPos < text.length) {
      segments.push(
        <span key={`text_end_${keyIdx++}`} className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          {text.slice(currentPos)}
        </span>
      );
    }

    return <div className="text-sm leading-relaxed whitespace-pre-wrap">{segments}</div>;
  };

  const hasVisual = !!currentDraft.visualData;
  const logoBreached = currentDraft.visualData?.logoDetection.hasBreach;

  return (
    <div 
      id="tour-canvas-preview"
      className={`flex-1 flex flex-col border rounded-2xl overflow-hidden shadow-xl transition-colors duration-200 ${
        isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}
    >
      {/* Canvas Top Bar */}
      <div className={`h-12 border-b px-4 flex items-center justify-between ${
        isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`flex p-0.5 rounded-lg border text-xs ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <button
              onClick={() => setCanvasMode('preview')}
              className={`px-3 py-1 font-semibold rounded-md transition flex items-center space-x-1.5 ${
                canvasMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Creative Preview</span>
            </button>

            <button
              onClick={() => setCanvasMode('diff')}
              className={`px-3 py-1 font-semibold rounded-md transition flex items-center space-x-1.5 ${
                canvasMode === 'diff'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Side-by-Side Diff</span>
            </button>

            <button
              onClick={() => setCanvasMode('editor')}
              className={`px-3 py-1 font-semibold rounded-md transition flex items-center space-x-1.5 ${
                canvasMode === 'editor'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Source Text</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span>Grounded RAG Active</span>
        </div>
      </div>

      {/* Canvas Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* MODE 1: LIVE CREATIVE PREVIEW */}
        {canvasMode === 'preview' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Visual Graphic Banner */}
            {hasVisual && (
              <div className={`rounded-xl overflow-hidden border shadow-xl relative ${
                isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-slate-100'
              }`}>
                {/* Visual Banner Canvas */}
                <div className="relative h-64 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Logo Bounding Box Overlay */}
                  <div
                    onClick={() => onSelectViolation('viol_2_1')}
                    className={`absolute top-2 left-3 border-2 rounded p-1 cursor-pointer transition ${
                      logoBreached
                        ? 'border-red-500 bg-red-500/25 text-red-200 ring-2 ring-red-500/40 animate-pulse'
                        : 'border-teal-400 bg-teal-400/20 text-teal-200'
                    }`}
                  >
                    <div className="flex items-center space-x-1 text-[10px] font-bold">
                      {logoBreached ? (
                        <AlertOctagon className="w-3 h-3 text-red-400" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                      )}
                      <span>APEX BRAND GLYPH</span>
                    </div>
                    <div className="text-[9px] font-mono opacity-90 mt-0.5">
                      Margin: {currentDraft.visualData?.logoDetection.clearspaceMarginPx}px (Min: 32px)
                    </div>

                    {logoBreached && (
                      <span className="absolute -bottom-5 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        CLEARSPACE BREACH
                      </span>
                    )}
                  </div>

                  {/* Banner Content */}
                  <div className="mt-14 max-w-sm">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
                      Enterprise Cloud
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                      Autonomous Infrastructure
                    </h2>
                    <p className="text-xs text-blue-100/90 mt-2 font-normal">
                      Continuous telemetry &amp; compliance across all multi-cloud enterprise clusters.
                    </p>
                  </div>

                  {/* Detected Swatch Badge */}
                  <div className="self-end bg-slate-950/80 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-white flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
                    <span className="text-[11px] font-mono">
                      #3B82F6 (&Delta;E = 8.6 from Brand Blue)
                    </span>
                  </div>
                </div>

                {/* Banner Diagnostics Bar */}
                <div className={`p-3 border-t flex items-center justify-between text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Palette className="w-3.5 h-3.5 text-blue-500" />
                      <span>Palette Match: <strong className="text-amber-500">Drift Detected</strong></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FileCheck className="w-3.5 h-3.5 text-teal-500" />
                      <span>WCAG Contrast: <strong className="text-teal-600">5.2:1 (Pass)</strong></span>
                    </span>
                  </div>

                  {logoBreached && (
                    <button
                      onClick={() => onApplyFix('viol_2_1')}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[11px] font-semibold transition"
                    >
                      Auto-Pad 32px Margin
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Rendered Ad / Social Creative Card */}
            <div 
              id="tour-creative-card"
              className={`rounded-2xl border p-6 shadow-xl relative transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white shadow-slate-100'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b mb-4 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    AP
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Apex Global Enterprise
                    </h4>
                    <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Sponsored &bull; Pre-Publication Review
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                  isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {currentDraft.channel.replace('_', ' ')}
                </span>
              </div>

              {/* Interactive Text Body */}
              <div className={`p-4 rounded-xl border mb-4 ${
                isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                {renderInteractiveText()}
              </div>

              {/* Call to Action Bar */}
              <div className={`flex items-center justify-between pt-2 text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <span className="italic text-[11px]">
                  Click any highlighted token to view rule citations and context-aware diffs.
                </span>
                <button
                  onClick={() => onApplyFix('viol_1_1')}
                  className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 border border-blue-500/30 rounded-lg font-semibold transition flex items-center space-x-1"
                >
                  <span>Fast-Track Fixes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: SIDE-BY-SIDE DIFF */}
        {canvasMode === 'diff' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* Left: Original Draft */}
            <div className={`border rounded-xl p-5 flex flex-col justify-between ${
              isDark ? 'border-red-500/30 bg-red-950/10' : 'border-red-200 bg-red-50/40'
            }`}>
              <div>
                <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
                  isDark ? 'border-red-500/20 text-red-400' : 'border-red-200 text-red-700'
                }`}>
                  <span className="text-xs font-bold flex items-center space-x-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Raw Input Draft</span>
                  </span>
                  <span className="text-[11px] font-mono">
                    {currentDraft.violations.filter(v => v.status === 'flagged').length} Active Flags
                  </span>
                </div>

                <p className={`text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                  isDark ? 'text-slate-300' : 'text-slate-800'
                }`}>
                  {currentDraft.rawText}
                </p>
              </div>

              <div className={`text-[11px] pt-4 border-t mt-4 ${
                isDark ? 'border-red-500/20 text-red-400/80' : 'border-red-200 text-red-600'
              }`}>
                Contains unverified promotional claims and tone non-compliance.
              </div>
            </div>

            {/* Right: Policy-Compliant Rewrite */}
            <div className={`border rounded-xl p-5 flex flex-col justify-between ${
              isDark ? 'border-teal-500/30 bg-teal-950/10' : 'border-teal-200 bg-teal-50/40'
            }`}>
              <div>
                <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
                  isDark ? 'border-teal-500/20 text-teal-400' : 'border-teal-200 text-teal-700'
                }`}>
                  <span className="text-xs font-bold flex items-center space-x-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span>Context-Aware Suggested Rewrite</span>
                  </span>
                  <span className="text-[11px] font-mono">
                    Grounded in Brand Brain
                  </span>
                </div>

                <p className={`text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {currentDraft.resolvedText}
                </p>
              </div>

              <div className={`text-[11px] pt-4 border-t mt-4 flex items-center justify-between ${
                isDark ? 'border-teal-500/20 text-teal-400/80' : 'border-teal-200 text-teal-700'
              }`}>
                <span>Aligned with Legal SLA Clause 3.1.</span>
                <button
                  onClick={() => {
                    onTextChange(currentDraft.resolvedText);
                  }}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-semibold text-[11px] transition shadow-sm"
                >
                  Adopt Whole Rewrite
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: SOURCE TEXT EDITOR */}
        {canvasMode === 'editor' && (
          <div className="h-full flex flex-col space-y-3">
            <label className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Live Source Copy (Edit directly and click "Re-Scan"):
            </label>
            <textarea
              value={currentDraft.rawText}
              onChange={(e) => onTextChange(e.target.value)}
              className={`flex-1 w-full border rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none shadow-inner ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-slate-200' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
              placeholder="Paste or type copy here..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
