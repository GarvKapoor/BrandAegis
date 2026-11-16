'use client';

import React, { useState } from 'react';
import { BrandBrainData } from '@/lib/types';
import { X, BookOpen, ShieldCheck, Palette, CheckCircle2, AlertTriangle } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<'claims' | 'voice' | 'forbidden' | 'palette'>('claims');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0c101a] rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[88vh] text-slate-200">
        {/* Header */}
        <div className="bg-[#080b11] p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">{brandBrain.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 font-mono border border-blue-800/50">
                  {brandBrain.version}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Single Source of Truth (SSOT) &bull; Verified Claims Registry &bull; Design Tokens
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
        <div className="flex border-b border-slate-800 bg-[#080b11]/70 px-5 pt-2 space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('claims')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'claims'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Certified Claims Registry ({brandBrain.claimRegistry.length})
          </button>
          <button
            onClick={() => setActiveSection('voice')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'voice'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Voice &amp; Tone Pillars ({brandBrain.voicePillars.length})
          </button>
          <button
            onClick={() => setActiveSection('forbidden')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'forbidden'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Forbidden Superlatives ({brandBrain.forbiddenWords.length})
          </button>
          <button
            onClick={() => setActiveSection('palette')}
            className={`pb-2.5 border-b-2 transition ${
              activeSection === 'palette'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Design Tokens &amp; Logos ({brandBrain.colorPalette.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Claims Tab */}
          {activeSection === 'claims' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-blue-200">
                <span className="font-bold text-white">Strict SLA Grounding: </span>
                Any promotional draft stating absolute guarantees or invented metrics is grounded directly against these contractually certified clauses.
              </div>

              {brandBrain.claimRegistry.map((item) => (
                <div key={item.id} className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{item.claim}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.certifiedClause}
                    </span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-slate-200">Legal SLA Mandate: </strong>
                    {item.legalSLA}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800">
                    <div className="bg-teal-950/30 border border-teal-800/40 rounded-lg p-2.5">
                      <span className="font-semibold text-teal-300 block mb-1">Approved Variants:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-teal-200/90">
                        {item.approvedVariants.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-950/30 border border-red-800/40 rounded-lg p-2.5">
                      <span className="font-semibold text-red-300 block mb-1">Forbidden Phrasing:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-red-200/90">
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
            <div className="space-y-3">
              {brandBrain.voicePillars.map((p, idx) => (
                <div key={idx} className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 space-y-2">
                  <h4 className="text-sm font-bold text-blue-400">{p.attribute}</h4>
                  <p className="text-slate-300">{p.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800">
                    <div className="bg-teal-950/30 border border-teal-800/40 rounded-lg p-2.5">
                      <span className="font-semibold text-teal-300 flex items-center space-x-1 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                        <span>Do (On-Brand):</span>
                      </span>
                      <p className="text-slate-200 italic">"{p.doExample}"</p>
                    </div>

                    <div className="bg-red-950/30 border border-red-800/40 rounded-lg p-2.5">
                      <span className="font-semibold text-red-300 flex items-center space-x-1 mb-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Don't (Off-Brand):</span>
                      </span>
                      <p className="text-slate-200 italic">"{p.dontExample}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Forbidden Terms Tab */}
          {activeSection === 'forbidden' && (
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Prohibited Term</th>
                    <th className="p-3">Policy Rationale</th>
                    <th className="p-3">Approved Alternative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                  {brandBrain.forbiddenWords.map((fw, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono font-bold text-red-400">"{fw.term}"</td>
                      <td className="p-3 text-slate-400">{fw.reason}</td>
                      <td className="p-3 font-mono font-semibold text-teal-300">{fw.alternative}</td>
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
                  <div key={idx} className="border border-slate-800 rounded-xl p-3 bg-slate-900/60 flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg border border-slate-700 shadow-md shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div>
                      <span className="font-bold text-white block text-xs">{col.name}</span>
                      <span className="font-mono text-slate-400 text-[10px] block">{col.hex} &bull; {col.pantone}</span>
                      {col.isPrimary && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-blue-900/80 text-blue-300 text-[9px] font-semibold border border-blue-700/50">
                          Primary Token
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo Rules Card */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40 space-y-1.5 mt-4">
                <h4 className="font-bold text-white">Logo Clearspace &amp; Geometry Rules:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Minimum Clearspace: 25% of logo height (32px minimum exclusion perimeter on digital frames).</li>
                  <li>Approved file formats: SVG, Vector EPS, and 3000px+ High-Resolution PNG.</li>
                  <li>Prohibited: Stretching, rotating, applying gradient overlays, or altering brand lockups.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#080b11] p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            Close Knowledge Hub
          </button>
        </div>
      </div>
    </div>
  );
};
