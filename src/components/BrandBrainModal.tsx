'use client';

import React, { useState } from 'react';
import { BrandBrainData } from '@/lib/types';
import { X, BookOpen, ShieldCheck, Palette, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

interface BrandBrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandBrain: BrandBrainData;
}

export const BrandBrainModal: React.FC<BrandBrainModalProps> = ({
  isOpen,
  onClose,
  brandBrain
}) => {
  const [activeSection, setActiveSection] = useState<'voice' | 'claims' | 'palette' | 'forbidden'>('claims');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">{brandBrain.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-800/80 text-brand-300 font-mono">
                  {brandBrain.version}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Single Source of Truth (SSOT) Knowledge Hub &bull; Dual Semantic Vector + Relational Store
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('claims')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'claims'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Certified Claims Registry ({brandBrain.claimRegistry.length})
          </button>
          <button
            onClick={() => setActiveSection('voice')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'voice'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Voice &amp; Tone Pillars ({brandBrain.voicePillars.length})
          </button>
          <button
            onClick={() => setActiveSection('forbidden')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'forbidden'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Forbidden Terms ({brandBrain.forbiddenWords.length})
          </button>
          <button
            onClick={() => setActiveSection('palette')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'palette'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Design Tokens &amp; Color Palette ({brandBrain.colorPalette.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Claims Tab */}
          {activeSection === 'claims' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
                <span className="font-bold">Legal SLA Grounding: </span>
                Every marketing claim scanned by BrandAegis is cross-referenced against this certified legal registry to avoid false advertising and regulatory fines.
              </div>

              {brandBrain.claimRegistry.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{item.claim}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.certifiedClause}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-800">Legal SLA Mandate: </span>
                    {item.legalSLA}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-2">
                      <span className="font-semibold text-teal-800 block mb-1">Approved Variants:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-teal-900">
                        {item.approvedVariants.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <span className="font-semibold text-red-800 block mb-1">Strictly Forbidden Phrasing:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-red-900">
                        {item.forbiddenPhrasing.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Voice Tab */}
          {activeSection === 'voice' && (
            <div className="space-y-4">
              {brandBrain.voicePillars.map((p, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-2">
                  <h4 className="text-sm font-bold text-brand-700">{p.attribute}</h4>
                  <p className="text-slate-600">{p.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-2">
                      <span className="font-semibold text-teal-800 flex items-center space-x-1 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        <span>Do (On-Brand):</span>
                      </span>
                      <p className="text-slate-800 italic">"{p.doExample}"</p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <span className="font-semibold text-red-800 flex items-center space-x-1 mb-1">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>Don't (Off-Brand):</span>
                      </span>
                      <p className="text-slate-800 italic">"{p.dontExample}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Forbidden Terms Tab */}
          {activeSection === 'forbidden' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Prohibited Term</th>
                    <th className="p-3">Policy Rationale</th>
                    <th className="p-3">Approved Alternative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {brandBrain.forbiddenWords.map((fw, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-red-600">"{fw.term}"</td>
                      <td className="p-3 text-slate-600">{fw.reason}</td>
                      <td className="p-3 font-mono font-semibold text-teal-700">{fw.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Palette Tab */}
          {activeSection === 'palette' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {brandBrain.colorPalette.map((col, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-white shadow-sm flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg border border-slate-300 shadow-inner shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{col.name}</span>
                      <span className="font-mono text-slate-500 text-[11px] block">{col.hex} &bull; {col.pantone}</span>
                      {col.isPrimary && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 text-[10px] font-semibold">
                          Primary Token
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo Rules Card */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2 mt-4">
                <h4 className="font-bold text-slate-900">Logo Clearspace &amp; Geometry Rules:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Minimum Clearspace: 25% of logo height (32px minimum exclusion perimeter on digital frames).</li>
                  <li>Approved file formats: SVG, Vector EPS, and 3000px+ High-Resolution PNG.</li>
                  <li>Prohibited: Stretching, rotating, applying gradient overlays, or altering brand lockups.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition"
          >
            Close Knowledge Hub
          </button>
        </div>
      </div>
    </div>
  );
};
