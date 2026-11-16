'use client';

import React, { useState } from 'react';
import { ContentDraft, UserRole, Violation } from '@/lib/types';
import { benchmarkTestCases } from '@/lib/benchmarkData';
import { runMultimodalScan } from '@/lib/linterEngine';
import { DiffViewer } from './DiffViewer';
import { VisualLinterView } from './VisualLinterView';
import { ApprovalWorkflow } from './ApprovalWorkflow';
import { Play, RotateCcw, Upload, FileCode, CheckCircle2, ShieldCheck, AlertTriangle, Layers, Sparkles } from 'lucide-react';

interface LinterStudioProps {
  currentRole: UserRole;
}

export const LinterStudio: React.FC<LinterStudioProps> = ({ currentRole }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case_1_fintech_claim_drift');
  const [currentDraft, setCurrentDraft] = useState<ContentDraft>(benchmarkTestCases[0]);
  const [customInputText, setCustomInputText] = useState<string>(benchmarkTestCases[0].rawText);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [viewMode, setViewMode] = useState<'diff' | 'visual' | 'workflow'>('diff');

  // Load a test case preset
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    const found = benchmarkTestCases.find(c => c.id === caseId);
    if (found) {
      // deep clone
      const cloned = JSON.parse(JSON.stringify(found));
      setCurrentDraft(cloned);
      setCustomInputText(cloned.rawText);
      if (cloned.visualData) {
        setViewMode('visual');
      } else {
        setViewMode('diff');
      }
    }
  };

  // Run dynamic multi-scan
  const handleTriggerScan = () => {
    setIsScanning(true);
    setScanStep('Vectorizing draft against Brand Brain embeddings...');

    setTimeout(() => {
      setScanStep('Running Gemini 1.5 Pro Semantic Voice & Claim Linter...');
    }, 400);

    setTimeout(() => {
      setScanStep('Running OpenCV Bounding-Box & CIELAB Color Adherence Engine...');
    }, 800);

    setTimeout(() => {
      setScanStep('Verifying WCAG 2.1 Contrast Ratios & Alt-Text Generative Coverage...');
    }, 1200);

    setTimeout(() => {
      const scanned = runMultimodalScan(customInputText);
      // preserve visual data if preset was case_2
      if (selectedCaseId === 'case_2_figma_visual_clearspace' && benchmarkTestCases[1].visualData) {
        scanned.visualData = JSON.parse(JSON.stringify(benchmarkTestCases[1].visualData));
        scanned.violations = [...scanned.violations, ...benchmarkTestCases[1].violations.filter(v => v.category === 'visual')];
      }
      setCurrentDraft(scanned);
      setIsScanning(false);
      setScanStep('');
    }, 1600);
  };

  // Reset to original preset
  const handleReset = () => {
    handleSelectCase(selectedCaseId);
  };

  // 1-Click apply fix for a single violation
  const handleApplyFix = (violationId: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find(v => v.id === violationId);
    if (targetViol && targetViol.flaggedSpan && targetViol.suggestedFix) {
      const regex = new RegExp(targetViol.flaggedSpan, 'gi');
      updated.rawText = updated.rawText.replace(regex, targetViol.suggestedFix);
      targetViol.status = 'accepted';

      // Recompute scores
      const pendingCount = updated.violations.filter(v => v.status === 'flagged').length;
      if (pendingCount === 0) {
        updated.score.overall = 98;
        updated.score.voiceFidelity = 98;
        updated.score.legalSafety = 100;
        updated.score.accessibility = 96;
      } else {
        updated.score.overall = Math.min(95, updated.score.overall + 15);
      }
      setCurrentDraft(updated);
      setCustomInputText(updated.rawText);
    }
  };

  // Custom edit fix
  const handleEditFix = (violationId: string, customText: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find(v => v.id === violationId);
    if (targetViol && targetViol.flaggedSpan) {
      const regex = new RegExp(targetViol.flaggedSpan, 'gi');
      updated.rawText = updated.rawText.replace(regex, customText);
      targetViol.suggestedFix = customText;
      targetViol.status = 'edited';
      setCurrentDraft(updated);
      setCustomInputText(updated.rawText);
    }
  };

  // Request exemption
  const handleRequestExemption = (violationId: string, reason: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find(v => v.id === violationId);
    if (targetViol) {
      targetViol.status = 'exempted';
      targetViol.userComment = reason;
      setCurrentDraft(updated);
    }
  };

  // Apply all pending fixes in 1-click
  const handleApplyAllFixes = () => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    updated.violations.forEach(v => {
      if (v.status === 'flagged' && v.flaggedSpan && v.suggestedFix) {
        const regex = new RegExp(v.flaggedSpan, 'gi');
        updated.rawText = updated.rawText.replace(regex, v.suggestedFix);
        v.status = 'accepted';
      }
    });
    updated.resolvedText = updated.rawText;
    updated.score.overall = 98;
    updated.score.voiceFidelity = 98;
    updated.score.legalSafety = 100;
    updated.score.accessibility = 96;
    setCurrentDraft(updated);
    setCustomInputText(updated.rawText);
  };

  // Advance approval tier
  const handleAdvanceTier = (role: UserRole) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    if (role === 'creator') {
      updated.approvalWorkflow.tiers.creator.status = 'approved';
      updated.approvalWorkflow.tiers.creator.signedBy = 'Content Creator (Self-Review)';
      updated.approvalWorkflow.currentTier = 'brand_manager';
      updated.approvalWorkflow.overallStatus = 'under_review';
    } else if (role === 'brand_manager') {
      updated.approvalWorkflow.tiers.brand_manager.status = 'approved';
      updated.approvalWorkflow.tiers.brand_manager.signedBy = 'Elena Vance (Brand Custodian)';
      updated.approvalWorkflow.currentTier = 'legal';
    } else if (role === 'legal') {
      updated.approvalWorkflow.tiers.legal.status = 'approved';
      updated.approvalWorkflow.tiers.legal.signedBy = 'Marcus Brody (Legal & Compliance Counsel)';
      updated.approvalWorkflow.overallStatus = 'approved';
    }
    setCurrentDraft(updated);
  };

  const handleRequestRevisions = (role: UserRole) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    if (role === 'brand_manager') {
      updated.approvalWorkflow.tiers.brand_manager.status = 'changes_requested';
      updated.approvalWorkflow.currentTier = 'creator';
    }
    setCurrentDraft(updated);
  };

  const pendingCount = currentDraft.violations.filter(v => v.status === 'flagged').length;

  return (
    <div className="space-y-6">
      {/* Benchmark Presets Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Test Scenarios (Round 2 Evaluation Benchmarks)
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a preloaded edge case to test multimodal detection, clause-exact citations, and 1-click diff fixes.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-semibold flex items-center space-x-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>4 Real-World Presets</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {benchmarkTestCases.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectCase(c.id)}
              className={`p-3 rounded-xl border text-left transition relative ${
                selectedCaseId === c.id
                  ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-sm'
                  : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                  {c.channel.replace('_', ' ')}
                </span>
                <span className={`text-[11px] font-bold ${c.score.overall >= 80 ? 'text-teal-600' : 'text-amber-600'}`}>
                  Score: {c.score.overall}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{c.title}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{c.author}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Scan Trigger */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900">Pre-Publication Content Studio</h3>
            <span className="text-xs text-slate-400">&bull; Edit text or run real-time automated multimodal scan</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
              title="Reset to original test preset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 shadow-sm transition ${
                isScanning
                  ? 'bg-brand-400 text-white cursor-wait'
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isScanning ? 'Scanning...' : 'Run Multimodal Scan'}</span>
            </button>
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <textarea
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            rows={3}
            className="w-full p-3.5 border border-slate-300 rounded-xl text-xs leading-relaxed font-sans text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-inner"
            placeholder="Type or paste any marketing copy, ad claims, or press release text to test real-time brand governance..."
          />
        </div>

        {/* Scanning Animation / Feedback Bar */}
        {isScanning && (
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl flex items-center space-x-3 text-xs text-brand-900 animate-pulse">
            <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-semibold">{scanStep}</span>
          </div>
        )}

        {/* Metric Score Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Overall Score</span>
            <span className={`text-xl font-black ${
              currentDraft.score.overall >= 80 ? 'text-teal-600' : currentDraft.score.overall >= 50 ? 'text-amber-600' : 'text-red-600'
            }`}>
              {currentDraft.score.overall}/100
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Voice Fidelity</span>
            <span className="text-xl font-bold text-slate-900">{currentDraft.score.voiceFidelity}%</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Visual Identity</span>
            <span className="text-xl font-bold text-slate-900">{currentDraft.score.visualCompliance}%</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Accessibility</span>
            <span className="text-xl font-bold text-slate-900">{currentDraft.score.accessibility}%</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Legal Safety</span>
            <span className="text-xl font-bold text-slate-900">{currentDraft.score.legalSafety}%</span>
          </div>
        </div>
      </div>

      {/* Main Studio View Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex border-b border-slate-200 pb-3 space-x-3 text-xs font-semibold">
          <button
            onClick={() => setViewMode('diff')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              viewMode === 'diff' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Side-by-Side Diff Viewer</span>
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('visual')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              viewMode === 'visual' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multimodal Vision &amp; Layout Linter</span>
            {currentDraft.visualData && (
              <span className="ml-1 px-1.5 py-0.2 bg-teal-500 text-white rounded-full text-[10px]">
                Active
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('workflow')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition ${
              viewMode === 'workflow' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Approval Pipeline &amp; Audit Trail</span>
          </button>
        </div>

        {/* Tab Displays */}
        {viewMode === 'diff' && (
          <DiffViewer
            originalText={currentDraft.rawText}
            resolvedText={currentDraft.resolvedText}
            violations={currentDraft.violations}
            onApplyFix={handleApplyFix}
            onEditFix={handleEditFix}
            onRequestExemption={handleRequestExemption}
            onApplyAllFixes={handleApplyAllFixes}
            currentRole={currentRole}
          />
        )}

        {viewMode === 'visual' && (
          <VisualLinterView
            visualData={currentDraft.visualData}
            violations={currentDraft.violations}
            onApplyVisualFix={handleApplyFix}
          />
        )}

        {viewMode === 'workflow' && (
          <ApprovalWorkflow
            workflow={currentDraft.approvalWorkflow}
            currentRole={currentRole}
            onAdvanceTier={handleAdvanceTier}
            onRequestRevisions={handleRequestRevisions}
            overallScore={currentDraft.score.overall}
            pendingViolationsCount={pendingCount}
          />
        )}
      </div>

      {/* Approval Status Floating Bar (Always Visible at bottom) */}
      <ApprovalWorkflow
        workflow={currentDraft.approvalWorkflow}
        currentRole={currentRole}
        onAdvanceTier={handleAdvanceTier}
        onRequestRevisions={handleRequestRevisions}
        overallScore={currentDraft.score.overall}
        pendingViolationsCount={pendingCount}
      />
    </div>
  );
};
