'use client';

import React, { useState } from 'react';
import { Violation, UserRole } from '@/lib/types';
import { Check, Edit3, HelpCircle, AlertTriangle, ShieldAlert, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface DiffViewerProps {
  originalText: string;
  resolvedText: string;
  violations: Violation[];
  onApplyFix: (violationId: string) => void;
  onEditFix: (violationId: string, customText: string) => void;
  onRequestExemption: (violationId: string, reason: string) => void;
  onApplyAllFixes: () => void;
  currentRole: UserRole;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  originalText,
  resolvedText,
  violations,
  onApplyFix,
  onEditFix,
  onRequestExemption,
  onApplyAllFixes,
  currentRole
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'resolved'>('all');
  const [editingViolationId, setEditingViolationId] = useState<string | null>(null);
  const [customEditText, setCustomEditText] = useState('');
  const [exemptionReason, setExemptionReason] = useState('');
  const [exemptingViolationId, setExemptingViolationId] = useState<string | null>(null);

  const filteredViolations = violations.filter(v => {
    if (activeTab === 'critical') return v.severity === 'critical' && v.status === 'flagged';
    if (activeTab === 'resolved') return v.status === 'accepted' || v.status === 'edited' || v.status === 'exempted';
    return true;
  });

  const pendingCount = violations.filter(v => v.status === 'flagged').length;

  return (
    <div className="space-y-6">
      {/* Action Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <span>Non-Destructive Co-Pilot Diff Viewer</span>
          </h3>
          <p className="text-xs text-slate-500">
            Side-by-side comparison with clause-exact Brand Brain citations. Suggested fixes preserve creator intent.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({violations.length})
            </button>
            <button
              onClick={() => setActiveTab('critical')}
              className={`px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'critical' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:text-red-700'
              }`}
            >
              Critical ({violations.filter(v => v.severity === 'critical' && v.status === 'flagged').length})
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'resolved' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              Resolved ({violations.filter(v => v.status !== 'flagged').length})
            </button>
          </div>

          {pendingCount > 0 && (
            <button
              onClick={onApplyAllFixes}
              className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center space-x-1.5 transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>1-Click Apply All ({pendingCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Side-by-Side Comparison Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Original Draft with flags */}
        <div className="border border-red-200 rounded-xl bg-red-50/30 p-4 relative shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-red-100">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Original Draft (Input)</span>
            </span>
            <span className="text-xs text-red-600 font-medium">
              {pendingCount} unresolved flag{pendingCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="text-sm leading-relaxed text-slate-800 font-normal whitespace-pre-wrap font-sans">
            {originalText}
          </div>
        </div>

        {/* Right Side: Recommended Context-Aware Rewrite */}
        <div className="border border-teal-200 rounded-xl bg-teal-50/30 p-4 relative shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-teal-100">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>Recommended Context-Aware Rewrite</span>
            </span>
            <span className="text-xs text-teal-700 font-medium">
              Policy Compliant
            </span>
          </div>

          <div className="text-sm leading-relaxed text-slate-900 font-medium whitespace-pre-wrap font-sans">
            {resolvedText}
          </div>
        </div>
      </div>

      {/* Explainable Issues List with Citations */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2">
          Detected Violations &amp; Grounded Citations ({filteredViolations.length})
        </h4>

        {filteredViolations.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-xl">
            <Check className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">No issues found in this category.</p>
            <p className="text-xs text-slate-500">Your draft adheres to the active Brand Brain specifications.</p>
          </div>
        ) : (
          filteredViolations.map((violation) => {
            const isResolved = violation.status !== 'flagged';

            return (
              <div
                key={violation.id}
                className={`border rounded-xl p-4 transition-all ${
                  isResolved
                    ? 'bg-slate-50/70 border-slate-200 opacity-80'
                    : violation.severity === 'critical'
                    ? 'bg-white border-red-200 shadow-sm hover:border-red-300'
                    : 'bg-white border-amber-200 shadow-sm hover:border-amber-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Issue Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center flex-wrap gap-2">
                      {violation.severity === 'critical' ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Critical</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Warning</span>
                        </span>
                      )}

                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium capitalize">
                        {violation.category}
                      </span>

                      {isResolved && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-medium flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span className="capitalize">{violation.status}</span>
                        </span>
                      )}

                      <h4 className="text-sm font-semibold text-slate-900">
                        {violation.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600">
                      {violation.description}
                    </p>

                    {/* Flagged vs Suggested Fix Display */}
                    {violation.flaggedSpan && violation.suggestedFix && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 my-2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                        <div className="flex-1">
                          <span className="text-slate-400 font-medium">Flagged: </span>
                          <span className="line-through text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-mono">
                            {violation.flaggedSpan}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                        <div className="flex-1">
                          <span className="text-slate-400 font-medium">Suggested Fix: </span>
                          <span className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-semibold font-mono">
                            {violation.suggestedFix}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Grounded Citation Accordion */}
                    <div className="bg-slate-100/80 border border-slate-200/80 rounded-lg p-2 text-xs text-slate-700">
                      <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                        <span>Citation: {violation.citation.guidelineName} &bull; {violation.citation.clause}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5 pl-5 italic">
                        "{violation.citation.ruleText}"
                      </p>
                    </div>
                  </div>

                  {/* 1-Click Action Buttons */}
                  {!isResolved && (
                    <div className="flex sm:flex-col items-center sm:items-end gap-1.5 pt-1">
                      <button
                        onClick={() => onApplyFix(violation.id)}
                        className="w-full sm:w-auto px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center space-x-1 transition"
                        title="Accept this rewrite suggestion"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Diff</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingViolationId(violation.id);
                          setCustomEditText(violation.suggestedFix || '');
                        }}
                        className="w-full sm:w-auto px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition"
                        title="Edit suggested rewrite"
                      >
                        <Edit3 className="w-3 h-3 text-slate-500" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          setExemptingViolationId(violation.id);
                          setExemptionReason('');
                        }}
                        className="w-full sm:w-auto px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-300 text-slate-600 hover:text-amber-800 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition"
                        title="Request exemption from Legal / Brand Custodian"
                      >
                        <HelpCircle className="w-3 h-3 text-amber-600" />
                        <span>Exempt</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Inline Custom Edit Modal / Drawer */}
                {editingViolationId === violation.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Custom In-Place Replacement:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customEditText}
                        onChange={(e) => setCustomEditText(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        placeholder="Enter custom replacement phrasing..."
                      />
                      <button
                        onClick={() => {
                          onEditFix(violation.id, customEditText);
                          setEditingViolationId(null);
                        }}
                        className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700"
                      >
                        Apply Edit
                      </button>
                      <button
                        onClick={() => setEditingViolationId(null)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Exemption Request Box */}
                {exemptingViolationId === violation.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200 bg-amber-50/50 p-2.5 rounded-lg">
                    <label className="block text-xs font-semibold text-amber-900 mb-1">
                      Reason for Exemption Request (Sent to Legal Tier):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exemptionReason}
                        onChange={(e) => setExemptionReason(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="e.g., Specific partner marketing co-branding exception approved by VP..."
                      />
                      <button
                        onClick={() => {
                          onRequestExemption(violation.id, exemptionReason || 'Approved under exception clause');
                          setExemptingViolationId(null);
                        }}
                        className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700"
                      >
                        Submit Exemption
                      </button>
                      <button
                        onClick={() => setExemptingViolationId(null)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
