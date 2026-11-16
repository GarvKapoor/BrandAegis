'use client';

import React from 'react';
import { X, BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Clock, DollarSign, Award } from 'lucide-react';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0c101a] rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[88vh] text-slate-200">
        {/* Header */}
        <div className="bg-[#080b11] p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Executive Brand Governance Analytics</h3>
              <p className="text-xs text-slate-400">
                Omnichannel Risk Heatmaps, Intercepted Drift &amp; ROI Velocity Metrics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-900/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Assets Screened</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">1,248</div>
              <span className="text-[10px] text-teal-400 font-semibold">+18% this month</span>
            </div>

            <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-900/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Review Turnaround</span>
                <Clock className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-xl font-bold text-white">3.2 Hours</div>
              <span className="text-[10px] text-teal-400 font-semibold">&darr; from 5.4 days (82% faster)</span>
            </div>

            <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-900/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Risks Intercepted</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-white">842 Flaws</div>
              <span className="text-[10px] text-slate-400 font-medium">96.4% pre-release recall</span>
            </div>

            <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-900/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Agency Waste Saved</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white">$480,000</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Annualized ROI</span>
            </div>
          </div>

          {/* Breakdown Charts / Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Violation Distribution */}
            <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 space-y-3">
              <h4 className="font-bold text-white text-xs flex items-center space-x-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Violations by Category (Past 90 Days)</span>
              </h4>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Unsubstantiated Performance Claims (SLA)</span>
                    <span className="font-bold text-red-400">42% (354)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Brand Voice &amp; Superlatives Drift</span>
                    <span className="font-bold text-amber-400">28% (236)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Visual Identity &amp; Logo Clearspace</span>
                    <span className="font-bold text-blue-400">18% (151)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Accessibility (WCAG Contrast / Alt Text)</span>
                    <span className="font-bold text-teal-400">12% (101)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Highest Risk Teams & Channels */}
            <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 space-y-3">
              <h4 className="font-bold text-white text-xs flex items-center space-x-1.5 uppercase tracking-wider">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Risk Distribution by Channel / Team</span>
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-950/30 border border-red-800/40">
                  <div>
                    <span className="font-bold text-slate-200 block">External Digital Agencies</span>
                    <span className="text-[10px] text-slate-400">Ad creatives &bull; High superlative frequency</span>
                  </div>
                  <span className="font-bold text-red-400 text-xs">High Risk (46%)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40">
                  <div>
                    <span className="font-bold text-slate-200 block">Regional Social Teams</span>
                    <span className="text-[10px] text-slate-400">Carousel graphics &bull; Missing alt text</span>
                  </div>
                  <span className="font-bold text-amber-400 text-xs">Medium Risk (28%)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-200 block">Corporate Product Marketing</span>
                    <span className="text-[10px] text-slate-400">Whitepapers &bull; Technical SLA accuracy</span>
                  </div>
                  <span className="font-bold text-teal-400 text-xs">Low Risk (16%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guideline Optimization Alert Box */}
          <div className="border border-blue-900/60 rounded-xl p-4 bg-blue-950/30 space-y-1.5">
            <h4 className="font-bold text-blue-300 text-xs flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Brand Brain Intelligence Alert: Ambiguous Guideline Detected</span>
            </h4>
            <p className="text-slate-300">
              The rule for <strong className="font-mono text-white">"Secondary Palette Accents on Dark Backgrounds"</strong> was exempted 14 times this month by design teams. Recommended action: Update Brand Brain v4.2 to add official dark-mode contrast tokens to eliminate repeat exemptions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#080b11] p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
