'use client';

import React, { useState } from 'react';
import { Violation, UserRole } from '@/lib/types';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Check, 
  Edit3, 
  HelpCircle, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface InspectorPanelProps {
  violations: Violation[];
  onApplyFix: (violationId: string) => void;
  onEditFix: (violationId: string, customText: string) => void;
  onRequestExemption: (violationId: string, reason: string) => void;
  activeViolationId?: string | null;
  onSelectViolation: (violationId: string) => void;
  score: {
    overall: number;
    voiceFidelity: number;
    visualCompliance: number;
    accessibility: number;
    legalSafety: number;
  };
  currentRole: UserRole;
  isDark: boolean;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  violations,
  onApplyFix,
  onEditFix,
  onRequestExemption,
  activeViolationId,
  onSelectViolation,
  score,
  currentRole,
  isDark,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'resolved'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [exemptingId, setExemptingId] = useState<string | null>(null);
  const [exemptReason, setExemptReason] = useState('');

  const filtered = violations.filter(v => {
    if (filter === 'critical') return v.severity === 'critical' && v.status === 'flagged';
    if (filter === 'resolved') return v.status !== 'flagged';
    return true;
  });

  const pendingCount = violations.filter(v => v.status === 'flagged').length;

  return (
    <aside 
      id="tour-inspector-panel"
      className={`w-96 border-l flex flex-col h-full overflow-hidden select-none transition-colors duration-200 ${
        isDark ? 'bg-[#0a0e17] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Inspector Top: Score Meter & Metrics */}
      <div className={`p-4 border-b ${isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Brand Copilot Inspector
            </h3>
          </div>
          <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {pendingCount} unresolved flag{pendingCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Circular Progress & Breakdown */}
        <div className={`flex items-center space-x-4 border rounded-xl p-3 ${
          isDark ? 'bg-slate-900/90 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Circular Score Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className={isDark ? 'text-slate-800' : 'text-slate-200'}
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${
                  score.overall >= 80 ? 'text-teal-500' : score.overall >= 50 ? 'text-amber-500' : 'text-red-500'
                } transition-all duration-1000 ease-out`}
                strokeDasharray={`${score.overall}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{score.overall}</span>
              <span className={`text-[8px] -mt-1 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/100</span>
            </div>
          </div>

          {/* Micro Progress Bars */}
          <div className="flex-1 space-y-1.5 text-[11px]">
            <div>
              <div className={`flex justify-between mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Claims / Legal</span>
                <span className={`font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{score.legalSafety}%</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${score.legalSafety}%` }}
                />
              </div>
            </div>

            <div>
              <div className={`flex justify-between mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Voice &amp; Tone</span>
                <span className={`font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{score.voiceFidelity}%</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${score.voiceFidelity}%` }}
                />
              </div>
            </div>

            <div>
              <div className={`flex justify-between mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Visual Tokens</span>
                <span className={`font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{score.visualCompliance}%</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${score.visualCompliance}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className={`flex p-0.5 rounded-lg border text-[11px] mt-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1 font-semibold rounded transition text-center ${
              filter === 'all' 
                ? isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900 shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({violations.length})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`flex-1 py-1 font-semibold rounded transition text-center ${
              filter === 'critical' 
                ? isDark ? 'bg-slate-800 text-red-400' : 'bg-white text-red-600 shadow-sm'
                : 'text-slate-400 hover:text-red-500'
            }`}
          >
            Critical ({violations.filter(v => v.severity === 'critical' && v.status === 'flagged').length})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`flex-1 py-1 font-semibold rounded transition text-center ${
              filter === 'resolved' 
                ? isDark ? 'bg-slate-800 text-teal-400' : 'bg-white text-teal-600 shadow-sm'
                : 'text-slate-400 hover:text-teal-500'
            }`}
          >
            Resolved ({violations.filter(v => v.status !== 'flagged').length})
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto" />
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              All guidelines satisfied!
            </p>
            <p className="text-[11px] text-slate-500">Ready for role-based approval sign-off.</p>
          </div>
        ) : (
          filtered.map((viol) => {
            const isResolved = viol.status !== 'flagged';
            const isCritical = viol.severity === 'critical';
            const isFocused = activeViolationId === viol.id;

            return (
              <div
                key={viol.id}
                onClick={() => onSelectViolation(viol.id)}
                className={`border rounded-xl p-3.5 transition-all text-xs cursor-pointer ${
                  isResolved
                    ? isDark ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
                    : isFocused
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : isDark ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    {isCritical ? (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                    <span className={`font-bold uppercase text-[10px] tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {viol.category} &bull; {viol.severity}
                    </span>
                  </div>

                  {isResolved && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-600 font-semibold uppercase">
                      {viol.status}
                    </span>
                  )}
                </div>

                <h4 className={`font-semibold text-xs mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {viol.title}
                </h4>

                <p className={`text-[11px] leading-normal mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {viol.description}
                </p>

                {/* Diff Comparison Tag */}
                {viol.flaggedSpan && viol.suggestedFix && (
                  <div className={`p-2 rounded-lg border text-[11px] mb-2 space-y-1 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-start space-x-1.5">
                      <span className="text-red-500 font-mono line-through block truncate">
                        &minus; {viol.flaggedSpan}
                      </span>
                    </div>
                    <div className="flex items-start space-x-1.5">
                      <span className="text-teal-600 font-mono font-semibold block truncate">
                        + {viol.suggestedFix}
                      </span>
                    </div>
                  </div>
                )}

                {/* Grounded Citation Badge */}
                <div className={`border rounded-lg p-2 text-[10px] mb-2.5 ${
                  isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className={`flex items-center space-x-1 font-semibold mb-0.5 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    <BookOpen className="w-3 h-3 text-blue-500" />
                    <span className="truncate">{viol.citation.guidelineName} ({viol.citation.clause})</span>
                  </div>
                  <p className="italic line-clamp-2">
                    "{viol.citation.ruleText}"
                  </p>
                </div>

                {/* Actions */}
                {!isResolved && (
                  <div className={`flex items-center justify-end space-x-1.5 pt-1 border-t ${
                    isDark ? 'border-slate-800/60' : 'border-slate-100'
                  }`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(viol.id);
                        setCustomText(viol.suggestedFix || '');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                        isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Edit suggested rewrite"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExemptingId(viol.id);
                        setExemptReason('');
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                        isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                      }`}
                      title="Request exemption"
                    >
                      Exempt
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyFix(viol.id);
                      }}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold transition flex items-center space-x-1 shadow-sm"
                    >
                      <Check className="w-3 h-3" />
                      <span>Apply Fix</span>
                    </button>
                  </div>
                )}

                {/* Custom Edit Drawer */}
                {editingId === viol.id && (
                  <div className="mt-2 pt-2 border-t border-slate-700" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className={`w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1.5 ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                      placeholder="Custom replacement..."
                    />
                    <div className="flex justify-end space-x-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2 py-0.5 text-[10px] text-slate-400 hover:text-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onEditFix(viol.id, customText);
                          setEditingId(null);
                        }}
                        className="px-2 py-0.5 text-[10px] bg-blue-600 text-white font-semibold rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {/* Exemption Drawer */}
                {exemptingId === viol.id && (
                  <div className="mt-2 pt-2 border-t border-slate-700" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={exemptReason}
                      onChange={(e) => setExemptReason(e.target.value)}
                      className={`w-full border rounded px-2 py-1 text-xs focus:outline-none mb-1.5 ${
                        isDark ? 'bg-slate-950 border-amber-600/50 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                      placeholder="Reason for exemption..."
                    />
                    <div className="flex justify-end space-x-1">
                      <button
                        onClick={() => setExemptingId(null)}
                        className="px-2 py-0.5 text-[10px] text-slate-400 hover:text-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onRequestExemption(viol.id, exemptReason || 'Exception approved');
                          setExemptingId(null);
                        }}
                        className="px-2 py-0.5 text-[10px] bg-amber-600 text-white font-semibold rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
