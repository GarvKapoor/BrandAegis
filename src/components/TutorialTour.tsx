'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Eye, 
  Compass, 
  ArrowRight,
  MousePointerClick
} from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  proTip: string;
  actionHint: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-scenario-selector',
    title: '1. Select an Enterprise Scenario',
    badge: 'Step 1 of 5',
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    description: 'Start here! Select a pre-loaded test case to see how BrandAegis flags SLA drift, logo clearspace breaches, or social contrast issues.',
    proTip: 'The "FinTech Cloud Launch" scenario has 100% uptime claims and marketing superlatives that violate legal clauses.',
    actionHint: 'Look at the glowing highlighted scenario selector in the top bar.'
  },
  {
    targetId: 'tour-canvas-preview',
    title: '2. Live Creative Canvas with Flagged Spans',
    badge: 'Step 2 of 5',
    icon: <Eye className="w-5 h-5 text-teal-400" />,
    description: 'Your marketing copy is rendered inside an interactive canvas. Detected compliance breaches are highlighted with glowing badges directly on the text.',
    proTip: 'Clicking any highlighted chip (like "guarantees 100%") jumps to that exact legal citation in the Inspector!',
    actionHint: 'Notice the highlighted chips on the draft text.'
  },
  {
    targetId: 'tour-inspector-panel',
    title: '3. Brand Copilot Inspector & Grounded Diffs',
    badge: 'Step 3 of 5',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    description: 'The right inspector displays your live compliance health score (e.g. 48/100). For each flag, it cites the exact brand book clause and gives you a 1-click "Apply Fix" button to replace the text in-place!',
    proTip: 'Click "Apply All Fixes" in the top bar to watch your score jump to 98/100 instantly.',
    actionHint: 'Review the grounded clause citations and 1-click action buttons.'
  },
  {
    targetId: 'tour-approval-workflow',
    title: '4. Governance Approval Gates & Audit Ledger',
    badge: 'Step 4 of 5',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    description: 'Once all flags are resolved, your asset moves through tiered sign-offs: Creator -> Brand Lead -> Legal Counsel. Every action is cryptographically signed with a SHA-256 state hash for audit defense.',
    proTip: 'Switch your role in the bottom-left sidebar to test Brand Lead or Legal approval permissions!',
    actionHint: 'Check the bottom bar for approval status and SHA-256 audit hashing.'
  },
  {
    targetId: 'tour-brand-brain',
    title: '5. Brand Brain Knowledge Hub',
    badge: 'Step 5 of 5',
    icon: <BookOpen className="w-5 h-5 text-amber-400" />,
    description: 'The single source of truth (SSOT) holding your certified SLA claims registry, brand voice pillars, forbidden superlatives, and design tokens.',
    proTip: 'Click "Brand Brain" in the sidebar anytime to view or edit the contractual claim parameters.',
    actionHint: 'Click "Complete Tour" to begin exploring BrandAegis.'
  }
];

interface TutorialTourProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const TutorialTour: React.FC<TutorialTourProps> = ({
  isOpen,
  onClose,
  isDark
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStep = TOUR_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === TOUR_STEPS.length - 1;

  const handleNext = useCallback(() => {
    const el = document.getElementById(currentStep.targetId);
    if (el) el.classList.remove('tour-target-highlight');

    if (isLast) {
      onClose();
    } else {
      setCurrentStepIdx(prev => prev + 1);
    }
  }, [currentStep.targetId, isLast, onClose]);

  const handlePrev = useCallback(() => {
    const el = document.getElementById(currentStep.targetId);
    if (el) el.classList.remove('tour-target-highlight');
    if (!isFirst) {
      setCurrentStepIdx(prev => prev - 1);
    }
  }, [currentStep.targetId, isFirst]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Apply high-visibility element spotlight
  useEffect(() => {
    if (!isOpen) return;

    const step = TOUR_STEPS[currentStepIdx];
    const el = document.getElementById(step.targetId);
    if (el) {
      el.classList.add('tour-target-highlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTargetRect(el.getBoundingClientRect());
    }

    const updateRect = () => {
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      if (el) {
        el.classList.remove('tour-target-highlight');
      }
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen, currentStepIdx]);

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Deep high-contrast backdrop overlay */}
      <div 
        className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-[3px] transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* 2. Floating Neon Target Pin Badge directly pointing at the highlighted element */}
      {targetRect && (
        <div 
          style={{
            position: 'fixed',
            top: `${Math.max(14, targetRect.top - 46)}px`,
            left: `${Math.max(14, targetRect.left + (targetRect.width / 2) - 120)}px`,
            zIndex: 99,
          }}
          className="pointer-events-none animate-bounce"
        >
          <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-white font-black text-xs shadow-2xl shadow-cyan-400/70 flex items-center space-x-2 border-2 border-white ring-4 ring-cyan-500/40">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span className="tracking-wide">TARGET: {currentStep.badge}</span>
            <span className="text-white">↓</span>
          </div>
        </div>
      )}

      {/* 3. Top-Center Tour Navigation Pill */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-pop-in pointer-events-auto">
        <div className={`px-4 py-2 rounded-full border shadow-2xl backdrop-blur-md flex items-center space-x-3 text-xs font-semibold ${
          isDark 
            ? 'bg-[#0f172a]/95 border-cyan-400/60 text-white shadow-cyan-500/30' 
            : 'bg-white/95 border-blue-400 text-slate-900 shadow-xl'
        }`}>
          <span className="flex items-center space-x-1.5 text-cyan-400 font-mono font-bold">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Interactive Tour ({currentStepIdx + 1}/5)</span>
          </span>

          <div className="h-3 w-px bg-slate-700/60" />

          <span className="text-slate-200 truncate max-w-xs font-medium">
            {currentStep.title}
          </span>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1 hover:bg-slate-800 rounded-full"
            title="Exit Tour (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Docked Floating Spotlight Card (Bottom-Right, Never Occluding Center Content) */}
      <div className="fixed bottom-6 right-6 z-[100] max-w-md w-full animate-pop-in pointer-events-auto">
        <div className={`p-5 rounded-2xl border-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isDark 
            ? 'bg-[#0d1322]/95 border-cyan-400/60 text-slate-100 shadow-cyan-500/25 ring-2 ring-cyan-500/20' 
            : 'bg-white/95 border-blue-400 text-slate-900 shadow-2xl ring-2 ring-blue-500/10'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400">
                {currentStep.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    {currentStep.badge}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Press &rarr; or Enter)
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Exit Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Hint Target */}
          <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-semibold mb-2.5">
            <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
            <span>{currentStep.actionHint}</span>
          </div>

          {/* Description */}
          <p className={`text-xs leading-relaxed mb-3.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentStep.description}
          </p>

          {/* Pro Tip Box */}
          <div className={`p-2.5 rounded-xl border flex items-start space-x-2 text-xs mb-4 ${
            isDark 
              ? 'bg-blue-950/40 border-blue-800/40 text-blue-200' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-tight">
              <strong>Pro-Tip:</strong> {currentStep.proTip}
            </p>
          </div>

          {/* Progress & Navigation Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 text-xs">
            {/* Step Dots */}
            <div className="flex items-center space-x-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(currentStep.targetId);
                    if (el) el.classList.remove('tour-target-highlight');
                    setCurrentStepIdx(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStepIdx
                      ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/70'
                      : isDark ? 'w-2 bg-slate-700 hover:bg-slate-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Jump to Step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              {!isFirst && (
                <button
                  onClick={handlePrev}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center space-x-1 transition ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center space-x-1.5 transition transform active:scale-95 cursor-pointer"
              >
                <span>{isLast ? 'Complete Tour 🎉' : `Next Step (${currentStepIdx + 2}/5)`}</span>
                {!isLast && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
