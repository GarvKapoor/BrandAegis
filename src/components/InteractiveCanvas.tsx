'use client';

import React, { useState } from 'react';
import { ContentDraft, Violation } from '@/lib/types';
import { 
  Sparkles, 
  Layers, 
  Code, 
  CheckCircle2, 
  AlertOctagon, 
  Maximize2, 
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
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  currentDraft,
  onTextChange,
  onApplyFix,
  activeViolationId,
  onSelectViolation,
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
        <p className="text-slate-200 text-sm leading-relaxed font-normal whitespace-pre-wrap">
          {text}
        </p>
      );
    }

    // Segment text by flagged spans
    const segments: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Sort flagged violations by their appearance in text
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
        // Text before the violation
        if (idx > currentPos) {
          segments.push(
            <span key={`text_${keyIdx++}`} className="text-slate-300">
              {text.slice(currentPos, idx)}
            </span>
          );
        }

        // The flagged violation span
        const isSelected = activeViolationId === viol.id;
        const isCritical = viol.severity === 'critical';

        segments.push(
          <span
            key={`viol_${viol.id}`}
            onClick={() => onSelectViolation(viol.id)}
            className={`inline-block cursor-pointer px-1.5 py-0.5 rounded transition mx-0.5 relative group ${
              isCritical
                ? 'bg-red-500/20 text-red-300 border-b-2 border-red-500 hover:bg-red-500/30'
                : 'bg-amber-500/20 text-amber-300 border-b-2 border-amber-500 hover:bg-amber-500/30'
            } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
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
        <span key={`text_end_${keyIdx++}`} className="text-slate-300">
          {text.slice(currentPos)}
        </span>
      );
    }

    return <div className="text-sm leading-relaxed whitespace-pre-wrap">{segments}</div>;
  };

  const hasVisual = !!currentDraft.visualData;
  const logoBreached = currentDraft.visualData?.logoDetection.hasBreach;

  return (
    <div className="flex-1 flex flex-col bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Canvas Top Bar */}
      <div className="h-12 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCanvasMode('preview')}
              className={`px-3 py-1 font-semibold rounded-md transition flex items-center space-x-1.5 ${
                canvasMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
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
                  : 'text-slate-400 hover:text-white'
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
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Source Text</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span>Grounded RAG Engine Active</span>
        </div>
      </div>

      {/* Canvas Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* MODE 1: LIVE CREATIVE PREVIEW */}
        {canvasMode === 'preview' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Visual Graphic Banner (When available in preset) */}
            {hasVisual && (
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative">
                {/* Visual Banner Canvas */}
                <div className="relative h-64 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Logo Bounding Box Overlay */}
                  <div
                    onClick={() => onSelectViolation('viol_2_1')}
                    className={`absolute top-2 left-3 border-2 rounded p-1 cursor-pointer transition ${
                      logoBreached
                        ? 'border-red-500 bg-red-500/25 text-red-200 ring-2 ring-red-500/40'
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
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Palette className="w-3.5 h-3.5 text-blue-400" />
                      <span>Palette Match: <strong className="text-amber-400">Drift Detected</strong></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FileCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>WCAG Contrast: <strong className="text-teal-400">5.2:1 (Pass)</strong></span>
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
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    AP
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Apex Global Enterprise</h4>
                    <p className="text-[10px] text-slate-500">Sponsored &bull; Pre-Publication Review</p>
                  </div>
                </div>

                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentDraft.channel.replace('_', ' ')}
                </span>
              </div>

              {/* Interactive Text Body */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                {renderInteractiveText()}
              </div>

              {/* Call to Action Bar */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <span className="italic">
                  Click any highlighted token to see the exact clause violation and suggested fix in the inspector.
                </span>
                <button
                  onClick={() => onApplyFix('viol_1_1')}
                  className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-lg font-semibold transition flex items-center space-x-1"
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
            <div className="border border-red-500/30 rounded-xl bg-red-950/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-3">
                  <span className="text-xs font-bold text-red-400 flex items-center space-x-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Raw Input Draft</span>
                  </span>
                  <span className="text-[11px] text-red-300 font-mono">
                    {currentDraft.violations.filter(v => v.status === 'flagged').length} Active Flags
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-sans">
                  {currentDraft.rawText}
                </p>
              </div>

              <div className="text-[11px] text-red-400/80 pt-4 border-t border-red-500/20 mt-4">
                Contains unsubstantiated SLA superlatives and tone non-compliance.
              </div>
            </div>

            {/* Right: Policy-Compliant Rewrite */}
            <div className="border border-teal-500/30 rounded-xl bg-teal-950/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 mb-3">
                  <span className="text-xs font-bold text-teal-400 flex items-center space-x-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span>Context-Aware Suggested Rewrite</span>
                  </span>
                  <span className="text-[11px] text-teal-300 font-mono">
                    Grounded in Apex v4.2
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-100 whitespace-pre-wrap font-sans font-medium">
                  {currentDraft.resolvedText}
                </p>
              </div>

              <div className="text-[11px] text-teal-400/80 pt-4 border-t border-teal-500/20 mt-4 flex items-center justify-between">
                <span>Aligned with Legal SLA Clause 3.1 &amp; Brand Voice Pg 18.</span>
                <button
                  onClick={() => {
                    onTextChange(currentDraft.resolvedText);
                  }}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-semibold text-[11px] transition"
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
            <label className="text-xs font-semibold text-slate-400">
              Live Source Copy (Edit and click "Re-Scan" in top bar):
            </label>
            <textarea
              value={currentDraft.rawText}
              onChange={(e) => onTextChange(e.target.value)}
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none"
              placeholder="Paste or type copy here..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
