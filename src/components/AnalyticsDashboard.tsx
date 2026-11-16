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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Executive Brand Governance Analytics</h3>
              <p className="text-xs text-slate-400">
                Omnichannel Violation Tracking, High-Risk Channel Heatmaps &amp; ROI Metrics
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

        {/* Dashboard Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="font-semibold">Assets Screened</span>
                <ShieldCheck className="w-4 h-4 text-brand-600" />
              </div>
              <div className="text-xl font-bold text-slate-900">1,248</div>
              <span className="text-[10px] text-teal-600 font-semibold">+18% this month</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="font-semibold">Review Turnaround</span>
                <Clock className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-xl font-bold text-slate-900">3.2 Hours</div>
              <span className="text-[10px] text-teal-600 font-semibold">&darr; from 5.4 days (82% faster)</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="font-semibold">Risks Intercepted</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-slate-900">842 Flaws</div>
              <span className="text-[10px] text-slate-500 font-medium">96.4% pre-release recall</span>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="font-semibold">Agency Waste Saved</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-slate-900">$480,000</div>
              <span className="text-[10px] text-emerald-700 font-semibold">Annualized ROI</span>
            </div>
          </div>

          {/* Breakdown Charts / Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Violation Distribution */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Violations by Category (Past 90 Days)</span>
              </h4>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Unsubstantiated Performance Claims (SLA)</span>
                    <span className="font-bold text-slate-900">42% (354)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Brand Voice &amp; Superlatives Drift</span>
                    <span className="font-bold text-slate-900">28% (236)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Visual Identity &amp; Logo Clearspace</span>
                    <span className="font-bold text-slate-900">18% (151)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Accessibility (WCAG Contrast / Alt Text)</span>
                    <span className="font-bold text-slate-900">12% (101)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Highest Risk Teams & Channels */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-brand-600" />
                <span>Risk Distribution by Channel / Team</span>
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/60 border border-red-200">
                  <div>
                    <span className="font-bold text-slate-900 block">External Digital Agencies</span>
                    <span className="text-[11px] text-slate-500">Ad creatives &bull; High superlative frequency</span>
                  </div>
                  <span className="font-bold text-red-700 text-xs">High Risk (46%)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Regional Social Teams</span>
                    <span className="text-[11px] text-slate-500">Carousel graphics &bull; Missing alt text</span>
                  </div>
                  <span className="font-bold text-amber-700 text-xs">Medium Risk (28%)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Corporate Product Marketing</span>
                    <span className="text-[11px] text-slate-500">Whitepapers &bull; Technical SLA accuracy</span>
                  </div>
                  <span className="font-bold text-teal-700 text-xs">Low Risk (16%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guideline Optimization Alert Box */}
          <div className="border border-brand-200 rounded-xl p-4 bg-brand-50/50 space-y-2">
            <h4 className="font-bold text-brand-900 text-sm flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Brand Brain Intelligence Alert: Ambiguous Guideline Detected</span>
            </h4>
            <p className="text-slate-700">
              The rule for <span className="font-mono font-semibold">"Secondary Palette Accents on Dark Backgrounds"</span> was exempted 14 times this month by design teams. Recommended action: Update Brand Brain v4.2 to add official dark-mode contrast tokens to eliminate repeat exemptions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
