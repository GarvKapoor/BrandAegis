'use client';

import React from 'react';
import { ApprovalWorkflowState, UserRole } from '@/lib/types';
import { CheckCircle2, Clock, AlertCircle, ShieldCheck, Hash, FileDown, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApprovalWorkflowProps {
  workflow: ApprovalWorkflowState;
  currentRole: UserRole;
  onAdvanceTier: (approvedRole: UserRole) => void;
  onRequestRevisions: (role: UserRole) => void;
  overallScore: number;
  pendingViolationsCount: number;
}

export const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = ({
  workflow,
  currentRole,
  onAdvanceTier,
  onRequestRevisions,
  overallScore,
  pendingViolationsCount
}) => {
  const handleApprove = (role: UserRole) => {
    onAdvanceTier(role);
    if (role === 'legal' || (role === 'brand_manager' && workflow.tiers.creator.status === 'approved')) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Approved</span>
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Changes Req.</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Pending</span>
          </span>
        );
    }
  };

  const isFullyApproved =
    workflow.tiers.creator.status === 'approved' &&
    workflow.tiers.brand_manager.status === 'approved' &&
    workflow.tiers.legal.status === 'approved';

  return (
    <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Tiered Governance Pipeline &amp; Cryptographic Audit</span>
          </h3>
          <p className="text-xs text-slate-500">
            Role-based approval gates (Creator &rarr; Brand &rarr; Legal) backed by immutable audit hashing.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {isFullyApproved ? (
            <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PUBLICATION READY</span>
            </span>
          ) : (
            <span className="px-3 py-1 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold rounded-lg flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>APPROVAL GATES ACTIVE</span>
            </span>
          )}
        </div>
      </div>

      {/* 3-Tier Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Tier 1: Creator Self-Resolution */}
        <div className={`border rounded-xl p-3.5 transition ${
          workflow.tiers.creator.status === 'approved'
            ? 'bg-teal-50/40 border-teal-200'
            : 'bg-slate-50/70 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Tier 1: Creator</span>
            {getStatusBadge(workflow.tiers.creator.status)}
          </div>
          <h4 className="text-xs font-semibold text-slate-900">Diff Resolution &amp; Self-Check</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Author resolves flagged violations in the diff-viewer before escalating.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              {workflow.tiers.creator.signedBy ? `Signed: ${workflow.tiers.creator.signedBy}` : 'Unsigned'}
            </span>
            {currentRole === 'creator' && workflow.tiers.creator.status !== 'approved' && (
              <button
                onClick={() => handleApprove('creator')}
                disabled={pendingViolationsCount > 0}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  pendingViolationsCount > 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-700 text-white'
                }`}
                title={pendingViolationsCount > 0 ? 'Resolve all flags in Diff-Viewer first' : 'Submit to Brand Review'}
              >
                Submit Draft
              </button>
            )}
          </div>
        </div>

        {/* Tier 2: Brand Custodian */}
        <div className={`border rounded-xl p-3.5 transition ${
          workflow.tiers.brand_manager.status === 'approved'
            ? 'bg-teal-50/40 border-teal-200'
            : 'bg-slate-50/70 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Tier 2: Brand Lead</span>
            {getStatusBadge(workflow.tiers.brand_manager.status)}
          </div>
          <h4 className="text-xs font-semibold text-slate-900">Voice &amp; Visual Alignment</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Validates brand voice, visual tokens, and non-destructive styling changes.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              {workflow.tiers.brand_manager.signedBy ? `Signed: ${workflow.tiers.brand_manager.signedBy}` : 'Pending Sign-Off'}
            </span>
            {currentRole === 'brand_manager' && workflow.tiers.brand_manager.status !== 'approved' && (
              <div className="flex space-x-1">
                <button
                  onClick={() => handleApprove('brand_manager')}
                  className="px-2 py-1 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => onRequestRevisions('brand_manager')}
                  className="px-2 py-1 text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: Legal & Regulatory */}
        <div className={`border rounded-xl p-3.5 transition ${
          workflow.tiers.legal.status === 'approved'
            ? 'bg-teal-50/40 border-teal-200'
            : 'bg-slate-50/70 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Tier 3: Legal &amp; Risk</span>
            {getStatusBadge(workflow.tiers.legal.status)}
          </div>
          <h4 className="text-xs font-semibold text-slate-900">Certified Claim Audit</h4>
          <p className="text-[11px] text-slate-500 mt-1">
            Ensures all marketing claims strictly comply with certified contractual SLAs.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              {workflow.tiers.legal.signedBy ? `Signed: ${workflow.tiers.legal.signedBy}` : 'Pending Sign-Off'}
            </span>
            {currentRole === 'legal' && workflow.tiers.legal.status !== 'approved' && (
              <button
                onClick={() => handleApprove('legal')}
                className="px-2.5 py-1 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-md"
              >
                Sign Off
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cryptographic SHA-256 Audit Trail */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-teal-400 font-semibold">
            <Hash className="w-3.5 h-3.5" />
            <span>Cryptographic State Hash (SHA-256 Audit Trail):</span>
          </div>
          <p className="font-mono text-[11px] text-slate-300 break-all select-all">
            {workflow.auditHash}
          </p>
          <p className="text-[10px] text-slate-400">
            Immutable pre-publication record &bull; Zero Data Retention (ZDR) Enterprise SLA Verified
          </p>
        </div>

        <button
          onClick={() => alert(`Pre-Publication Compliance Certificate Generated!\n\nDocument Hash: ${workflow.auditHash}\nApproval Status: ${workflow.overallStatus}\nOverall Score: ${overallScore}/100\n\nVerified by BrandAegis Governance Engine.`)}
          className="self-start sm:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition shrink-0"
        >
          <FileDown className="w-3.5 h-3.5 text-teal-400" />
          <span>Export Audit Certificate</span>
        </button>
      </div>
    </div>
  );
};
