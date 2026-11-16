'use client';

import React from 'react';
import { ApprovalWorkflowState, UserRole } from '@/lib/types';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Hash, 
  FileDown, 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BottomWorkflowBarProps {
  workflow: ApprovalWorkflowState;
  currentRole: UserRole;
  onAdvanceTier: (role: UserRole) => void;
  onRequestRevisions: (role: UserRole) => void;
  overallScore: number;
  pendingViolationsCount: number;
  isDark: boolean;
}

export const BottomWorkflowBar: React.FC<BottomWorkflowBarProps> = ({
  workflow,
  currentRole,
  onAdvanceTier,
  onRequestRevisions,
  overallScore,
  pendingViolationsCount,
  isDark,
}) => {
  const handleApprove = (role: UserRole) => {
    onAdvanceTier(role);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.85 }
    });
  };

  const isFullyApproved =
    workflow.tiers.creator.status === 'approved' &&
    workflow.tiers.brand_manager.status === 'approved' &&
    workflow.tiers.legal.status === 'approved';

  return (
    <footer 
      id="tour-approval-workflow"
      className={`h-14 border-t px-6 flex items-center justify-between z-20 text-xs backdrop-blur-md transition-colors duration-200 ${
        isDark ? 'bg-[#0a0e17]/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* 3-Tier Approval Status Indicators */}
      <div className="flex items-center space-x-6">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Approval Gates:
        </span>

        {/* Tier 1: Creator */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            workflow.tiers.creator.status === 'approved'
              ? 'bg-teal-500 shadow-sm shadow-teal-500/50'
              : 'bg-slate-400'
          }`} />
          <span className={`font-semibold ${
            workflow.tiers.creator.status === 'approved' ? isDark ? 'text-slate-200' : 'text-slate-800' : 'text-slate-400'
          }`}>
            1. Creator ({workflow.tiers.creator.status})
          </span>
        </div>

        {/* Tier 2: Brand Lead */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            workflow.tiers.brand_manager.status === 'approved'
              ? 'bg-teal-500 shadow-sm shadow-teal-500/50'
              : 'bg-slate-400'
          }`} />
          <span className={`font-semibold ${
            workflow.tiers.brand_manager.status === 'approved' ? isDark ? 'text-slate-200' : 'text-slate-800' : 'text-slate-400'
          }`}>
            2. Brand Lead ({workflow.tiers.brand_manager.status})
          </span>
        </div>

        {/* Tier 3: Legal */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            workflow.tiers.legal.status === 'approved'
              ? 'bg-teal-500 shadow-sm shadow-teal-500/50'
              : 'bg-slate-400'
          }`} />
          <span className={`font-semibold ${
            workflow.tiers.legal.status === 'approved' ? isDark ? 'text-slate-200' : 'text-slate-800' : 'text-slate-400'
          }`}>
            3. Legal Counsel ({workflow.tiers.legal.status})
          </span>
        </div>
      </div>

      {/* Right: Cryptographic SHA-256 Ledger & Action */}
      <div className="flex items-center space-x-4">
        {/* SHA-256 State Hash snippet */}
        <div className="hidden xl:flex items-center space-x-1.5 text-slate-500 font-mono text-[10px]">
          <Hash className="w-3 h-3 text-slate-400" />
          <span>SHA-256:</span>
          <span className={`truncate max-w-[120px] select-all ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {workflow.auditHash.slice(0, 12)}...
          </span>
        </div>

        {/* Role Sign-Off Actions */}
        {currentRole === 'creator' && workflow.tiers.creator.status !== 'approved' && (
          <button
            onClick={() => handleApprove('creator')}
            disabled={pendingViolationsCount > 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              pendingViolationsCount > 0
                ? isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit for Brand Review</span>
          </button>
        )}

        {currentRole === 'brand_manager' && workflow.tiers.brand_manager.status !== 'approved' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onRequestRevisions('brand_manager')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Request Changes
            </button>
            <button
              onClick={() => handleApprove('brand_manager')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center space-x-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Brand Voice</span>
            </button>
          </div>
        )}

        {currentRole === 'legal' && workflow.tiers.legal.status !== 'approved' && (
          <button
            onClick={() => handleApprove('legal')}
            className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Grant Legal Clearance</span>
          </button>
        )}

        {isFullyApproved && (
          <button
            onClick={() => alert(`Pre-Publication Compliance Certificate Exported!\n\nSHA-256: ${workflow.auditHash}\nScore: ${overallScore}/100\n\nAll 3 approval tiers verified.`)}
            className={`px-3 py-1.5 border rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            }`}
          >
            <FileDown className="w-3.5 h-3.5 text-teal-500" />
            <span>Export Certificate</span>
          </button>
        )}
      </div>
    </footer>
  );
};
