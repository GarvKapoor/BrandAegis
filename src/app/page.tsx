'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { InteractiveCanvas } from '@/components/InteractiveCanvas';
import { InspectorPanel } from '@/components/InspectorPanel';
import { BottomWorkflowBar } from '@/components/BottomWorkflowBar';
import { BrandBrainModal } from '@/components/BrandBrainModal';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { ArchitectureModal } from '@/components/ArchitectureModal';
import { TeamContributionsModal } from '@/components/TeamContributionsModal';
import { TutorialTour } from '@/components/TutorialTour';

import { ContentDraft, UserRole } from '@/lib/types';
import { defaultBrandBrain } from '@/lib/brandBrain';
import { benchmarkTestCases } from '@/lib/benchmarkData';
import { runMultimodalScan } from '@/lib/linterEngine';
import { Sparkles, Compass, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  const [currentTab, setCurrentTab] = useState<'studio' | 'visual' | 'workflow'>('studio');
  const [currentRole, setCurrentRole] = useState<UserRole>('creator');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case_1_fintech_claim_drift');
  const [currentDraft, setCurrentDraft] = useState<ContentDraft>(benchmarkTestCases[0]);
  const [activeViolationId, setActiveViolationId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Modals & Tour
  const [isBrandBrainOpen, setIsBrandBrainOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showFirstTimerWelcome, setShowFirstTimerWelcome] = useState(true);

  // Toggle theme
  const handleToggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        if (next === 'light') {
          document.documentElement.classList.add('light-theme');
        } else {
          document.documentElement.classList.remove('light-theme');
        }
      }
      return next;
    });
  };

  // Switch Scenario Preset
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    const found = benchmarkTestCases.find((c) => c.id === caseId);
    if (found) {
      const cloned = JSON.parse(JSON.stringify(found));
      setCurrentDraft(cloned);
      setActiveViolationId(cloned.violations[0]?.id || null);
    }
  };

  // Re-run dynamic scan
  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const scanned = runMultimodalScan(currentDraft.rawText);
      if (selectedCaseId === 'case_2_figma_visual_clearspace' && benchmarkTestCases[1].visualData) {
        scanned.visualData = JSON.parse(JSON.stringify(benchmarkTestCases[1].visualData));
        scanned.violations = [
          ...scanned.violations,
          ...benchmarkTestCases[1].violations.filter((v) => v.category === 'visual'),
        ];
      }
      setCurrentDraft(scanned);
      setIsScanning(false);
      setActiveViolationId(scanned.violations[0]?.id || null);
    }, 1100);
  };

  // Reset to original preset
  const handleReset = () => {
    handleSelectCase(selectedCaseId);
  };

  // 1-Click apply fix
  const handleApplyFix = (violationId: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find((v) => v.id === violationId);
    if (targetViol && targetViol.flaggedSpan && targetViol.suggestedFix) {
      const regex = new RegExp(targetViol.flaggedSpan, 'gi');
      updated.rawText = updated.rawText.replace(regex, targetViol.suggestedFix);
      targetViol.status = 'accepted';

      const pendingCount = updated.violations.filter((v) => v.status === 'flagged').length;
      if (pendingCount === 0) {
        updated.score.overall = 98;
        updated.score.voiceFidelity = 98;
        updated.score.legalSafety = 100;
        updated.score.accessibility = 96;
      } else {
        updated.score.overall = Math.min(95, updated.score.overall + 16);
        updated.score.voiceFidelity = Math.min(96, updated.score.voiceFidelity + 15);
        updated.score.legalSafety = Math.min(98, updated.score.legalSafety + 20);
      }
      setCurrentDraft(updated);
    }
  };

  // Custom edit fix
  const handleEditFix = (violationId: string, customText: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find((v) => v.id === violationId);
    if (targetViol && targetViol.flaggedSpan) {
      const regex = new RegExp(targetViol.flaggedSpan, 'gi');
      updated.rawText = updated.rawText.replace(regex, customText);
      targetViol.suggestedFix = customText;
      targetViol.status = 'edited';
      setCurrentDraft(updated);
    }
  };

  // Request exemption
  const handleRequestExemption = (violationId: string, reason: string) => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    const targetViol = updated.violations.find((v) => v.id === violationId);
    if (targetViol) {
      targetViol.status = 'exempted';
      targetViol.userComment = reason;
      setCurrentDraft(updated);
    }
  };

  // 1-Click apply all
  const handleApplyAllFixes = () => {
    const updated = JSON.parse(JSON.stringify(currentDraft)) as ContentDraft;
    updated.violations.forEach((v) => {
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

  const handleOpenPDF = () => {
    window.open('/BrandAegis_Round1_Submission.pdf', '_blank');
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#080b11] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'visual') {
            handleSelectCase('case_2_figma_visual_clearspace');
          }
        }}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenBrandBrain={() => setIsBrandBrainOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenTeam={() => setIsTeamOpen(true)}
        onOpenPDF={handleOpenPDF}
        onStartTour={() => {
          setShowFirstTimerWelcome(false);
          setIsTourOpen(true);
        }}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Main Studio Workstation */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Studio Bar */}
        <TopBar
          selectedCaseId={selectedCaseId}
          onSelectCase={handleSelectCase}
          currentDraft={currentDraft}
          onRunScan={handleRunScan}
          onReset={handleReset}
          onApplyAll={handleApplyAllFixes}
          isScanning={isScanning}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onStartTour={() => {
            setShowFirstTimerWelcome(false);
            setIsTourOpen(true);
          }}
        />

        {/* Workstation Center & Inspector */}
        <div className="flex-1 flex overflow-hidden p-5 gap-5">
          {/* Central Creative Canvas */}
          <InteractiveCanvas
            currentDraft={currentDraft}
            onTextChange={(newText) => {
              const updated = { ...currentDraft, rawText: newText };
              setCurrentDraft(updated);
            }}
            onApplyFix={handleApplyFix}
            activeViolationId={activeViolationId}
            onSelectViolation={(id) => setActiveViolationId(id)}
            isDark={isDark}
          />

          {/* Right Brand Copilot Inspector */}
          <InspectorPanel
            violations={currentDraft.violations}
            onApplyFix={handleApplyFix}
            onEditFix={handleEditFix}
            onRequestExemption={handleRequestExemption}
            activeViolationId={activeViolationId}
            onSelectViolation={(id) => setActiveViolationId(id)}
            score={currentDraft.score}
            currentRole={currentRole}
            isDark={isDark}
          />
        </div>

        {/* 3. Bottom Approval & Cryptographic Audit Bar */}
        <BottomWorkflowBar
          workflow={currentDraft.approvalWorkflow}
          currentRole={currentRole}
          onAdvanceTier={handleAdvanceTier}
          onRequestRevisions={handleRequestRevisions}
          overallScore={currentDraft.score.overall}
          pendingViolationsCount={currentDraft.violations.filter((v) => v.status === 'flagged').length}
          isDark={isDark}
        />
      </div>

      {/* First-Timer Welcome Dialog */}
      {showFirstTimerWelcome && !isTourOpen && (
        <div className="fixed bottom-16 right-6 z-40 max-w-sm w-full animate-pop-in">
          <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md ${
            isDark 
              ? 'bg-[#0f1523]/95 border-blue-500/40 text-slate-100 shadow-blue-500/10' 
              : 'bg-white/95 border-blue-200 text-slate-900 shadow-xl'
          }`}>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/40">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-md bg-blue-600/20 text-blue-400">
                  <Compass className="w-4 h-4 animate-spin-slow" />
                </span>
                <span className="font-bold text-xs">New to BrandAegis?</span>
              </div>
              <button
                onClick={() => setShowFirstTimerWelcome(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Take a <strong>60-second interactive tour</strong> to see how BrandAegis lints copy, cites brand guidelines, and orchestrates tiered sign-offs.
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFirstTimerWelcome(false)}
                className={`text-[11px] font-medium transition ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Explore on my own
              </button>

              <button
                onClick={() => {
                  setShowFirstTimerWelcome(false);
                  setIsTourOpen(true);
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold text-xs shadow-md flex items-center space-x-1.5 transition transform active:scale-95"
              >
                <span>Start Tour</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Step-by-Step Tutorial Tour */}
      <TutorialTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        isDark={isDark}
      />

      {/* Global Modals */}
      <BrandBrainModal
        isOpen={isBrandBrainOpen}
        onClose={() => setIsBrandBrainOpen(false)}
        brandBrain={defaultBrandBrain}
      />

      <AnalyticsDashboard
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <TeamContributionsModal
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
      />
    </div>
  );
}
