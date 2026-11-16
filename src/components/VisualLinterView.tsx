'use client';

import React from 'react';
import { VisualAnalysisData, Violation } from '@/lib/types';
import { Eye, Palette, CheckCircle2, AlertOctagon, Maximize2, FileCheck, Sparkles } from 'lucide-react';

interface VisualLinterViewProps {
  visualData?: VisualAnalysisData;
  violations: Violation[];
  onApplyVisualFix: (violationId: string) => void;
}

export const VisualLinterView: React.FC<VisualLinterViewProps> = ({
  visualData,
  violations,
  onApplyVisualFix
}) => {
  if (!visualData) {
    return (
      <div className="border border-slate-200 rounded-xl bg-slate-50 p-6 text-center text-slate-500">
        <Eye className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-700">No Visual Assets Ingested in Current Scan</p>
        <p className="text-xs text-slate-500 mt-1">
          Select the "Product Banner Graphic (Logo Clearspace &amp; Palette Drift)" preset or upload an image to run computer vision linting.
        </p>
      </div>
    );
  }

  const visualViolations = violations.filter(v => v.category === 'visual');
  const logoBreached = visualData.logoDetection.hasBreach;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center space-x-2">
            <Eye className="w-5 h-5 text-brand-600" />
            <span>Multimodal Computer Vision &amp; Layout Linter</span>
          </h3>
          <p className="text-xs text-slate-500">
            Bounding-box logo clearance inspection, CIELAB Delta-E color adherence, and WCAG contrast analysis.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          Resolution: {visualData.resolution.width} &times; {visualData.resolution.height}px ({visualData.resolution.estimatedDpi} DPI)
        </span>
      </div>

      {/* Visual Canvas Inspector with Bounding Box Overlay */}
      <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-950 p-6 relative shadow-inner">
        {/* Mock Graphic Frame */}
        <div className="relative w-full h-64 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 flex flex-col justify-between p-6 shadow-md overflow-hidden">
          {/* Logo Bounding Box Overlay */}
          <div
            className={`absolute top-2 left-3 border-2 rounded p-1 transition-all ${
              logoBreached
                ? 'border-red-500 bg-red-500/20 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'border-teal-400 bg-teal-400/20 text-teal-200'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-[11px] font-bold">
              {logoBreached ? <AlertOctagon className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
              <span>APEX GLYPH</span>
            </div>
            <div className="text-[9px] font-mono mt-0.5 opacity-90">
              Clearspace: {visualData.logoDetection.clearspaceMarginPx}px (Req: {visualData.logoDetection.requiredMarginPx}px)
            </div>

            {/* Clearspace Breach Alert Tag */}
            {logoBreached && (
              <div className="absolute -bottom-6 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                CLEARSPACE BREACH
              </div>
            )}
          </div>

          {/* Graphic Content Mock */}
          <div className="mt-14 max-w-md">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Enterprise Cloud</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Autonomous Infrastructure</h2>
            <p className="text-xs text-blue-100 mt-2">
              Continuous observability across all multi-cloud enterprise clusters.
            </p>
          </div>

          {/* Color Token Drift Indicator */}
          <div className="self-end bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-white flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
            <span className="text-[11px] font-mono">Dominant: #3B82F6 (ΔE = 8.6 from Brand Blue)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
          <span className="flex items-center space-x-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Interactive Canvas Preview &bull; Click bounding boxes to inspect exact rules</span>
          </span>
          <span className="text-teal-400 font-medium">Contour Detection Active (OpenCV Engine)</span>
        </div>
      </div>

      {/* Visual Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. CIELAB Color Adherence */}
        <div className="border border-slate-200 rounded-xl bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
              <Palette className="w-4 h-4 text-brand-600" />
              <span>Color Palette Adherence</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">CIELAB ΔE &lt; 2.0</span>
          </div>

          <div className="space-y-2">
            {visualData.extractedPalette.map((col, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-5 h-5 rounded-md border border-slate-300 shadow-sm"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div>
                    <span className="font-mono font-bold text-slate-800">{col.hex}</span>
                    <span className="text-[10px] text-slate-500 block">{col.percentage}% of canvas</span>
                  </div>
                </div>

                <div className="text-right">
                  {col.isMatch ? (
                    <span className="text-teal-700 font-semibold text-[11px] flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      <span>Match (ΔE {col.deltaE})</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-semibold text-[11px] flex items-center space-x-1">
                      <AlertOctagon className="w-3 h-3 text-amber-600" />
                      <span>Drift (ΔE {col.deltaE})</span>
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 block">{col.closestApproved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Logo Clearspace & Placement */}
        <div className="border border-slate-200 rounded-xl bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
              <Eye className="w-4 h-4 text-brand-600" />
              <span>Logo Clearspace &amp; Isolation</span>
            </div>
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${logoBreached ? 'bg-red-100 text-red-800' : 'bg-teal-100 text-teal-800'}`}>
              {logoBreached ? 'VIOLATION' : 'PASSED'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Detected Margin:</span>
              <span className={`font-mono font-bold ${logoBreached ? 'text-red-600' : 'text-slate-800'}`}>
                {visualData.logoDetection.clearspaceMarginPx}px
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Required Clearspace:</span>
              <span className="font-mono text-slate-800">{visualData.logoDetection.requiredMarginPx}px (25% height)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Isolation Boundary:</span>
              <span className="text-slate-700 font-medium">Top/Left Margin Insufficient</span>
            </div>
          </div>

          {logoBreached && (
            <button
              onClick={() => onApplyVisualFix('viol_2_1')}
              className="w-full mt-2 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1"
            >
              <span>Auto-Apply 32px Padding Fix</span>
            </button>
          )}
        </div>

        {/* 3. Accessibility & WCAG Contrast */}
        <div className="border border-slate-200 rounded-xl bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
              <FileCheck className="w-4 h-4 text-brand-600" />
              <span>Accessibility &amp; Alt-Text</span>
            </div>
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
              WCAG 2.1 AA
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Measured Text Contrast:</span>
              <span className="font-mono font-bold text-teal-700">
                {visualData.accessibility.measuredContrast}:1 (Target: &ge;4.5:1)
              </span>
            </div>

            <div className="py-1">
              <span className="text-slate-500 block mb-1">Generated Alt-Text (Screen Reader):</span>
              <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2 rounded italic">
                "{visualData.accessibility.generatedAltText}"
              </p>
            </div>
          </div>

          <button
            className="w-full mt-2 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1"
            onClick={() => alert('Alt-text copied and attached to image export manifest!')}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Copy Certified Alt-Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
