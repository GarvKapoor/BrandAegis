'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Eye, 
  Compass, 
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
    icon: <Layers className="w-4 h-4 text-cyan-400" />,
    description: 'Select a pre-loaded test case to see how BrandAegis flags SLA drift, logo clearspace breaches, or social contrast issues.',
    proTip: 'The "FinTech Cloud Launch" scenario has 100% uptime claims and marketing superlatives that violate legal clauses.',
    actionHint: 'Notice the highlighted scenario selector in the top bar above.'
  },
  {
    targetId: 'tour-canvas-preview',
    title: '2. Live Creative Canvas with Flagged Spans',
    badge: 'Step 2 of 5',
    icon: <Eye className="w-4 h-4 text-teal-400" />,
    description: 'Your marketing copy is rendered inside an interactive canvas. Detected compliance breaches are highlighted with glowing badges directly on the text.',
    proTip: 'Clicking any highlighted chip (like "guarantees 100%") jumps to that exact legal citation in the Inspector!',
    actionHint: 'Notice the highlighted draft canvas with flagged compliance chips.'
  },
  {
    targetId: 'tour-inspector-panel',
    title: '3. Brand Copilot Inspector & Grounded Diffs',
    badge: 'Step 3 of 5',
    icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    description: 'The right inspector displays your live compliance health score (e.g. 48/100). For each flag, it cites the exact brand book clause and gives you a 1-click "Apply Fix" button to replace the text in-place!',
    proTip: 'Click "Apply All Fixes" in the top bar to watch your score jump to 98/100 instantly.',
    actionHint: 'Review the highlighted right Inspector panel with grounded citations.'
  },
  {
    targetId: 'tour-approval-workflow',
    title: '4. Governance Approval Gates & Audit Ledger',
    badge: 'Step 4 of 5',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    description: 'Once all flags are resolved, your asset moves through tiered sign-offs: Creator -> Brand Lead -> Legal Counsel. Every action is cryptographically signed with a SHA-256 state hash for audit defense.',
    proTip: 'Switch your role in the bottom-left sidebar to test Brand Lead or Legal approval permissions!',
    actionHint: 'Check the bottom bar right below this card for approval status and SHA-256 audit hashing.'
  },
  {
    targetId: 'tour-brand-brain',
    title: '5. Brand Brain Knowledge Hub',
    badge: 'Step 5 of 5',
    icon: <BookOpen className="w-4 h-4 text-amber-400" />,
    description: 'The single source of truth (SSOT) holding your certified SLA claims registry, brand voice pillars, forbidden superlatives, and design tokens.',
    proTip: 'Click "Brand Brain" in the sidebar anytime to view or edit the contractual claim parameters.',
    actionHint: 'Notice the highlighted Brand Brain button in the left sidebar.'
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

  // Apply element spotlight
  useEffect(() => {
    if (!isOpen) return;

    const step = TOUR_STEPS[currentStepIdx];
    const el = document.getElementById(step.targetId);
    if (el) {
      el.classList.add('tour-target-highlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      if (el) {
        el.classList.remove('tour-target-highlight');
      }
    };
  }, [isOpen, currentStepIdx]);

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Backdrop overlay with soft blur */}
      <div 
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* 2. Interactive Step Div situated JUST ABOVE the Approval Gates footer */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] max-w-2xl w-[92%] sm:w-[620px] animate-pop-in pointer-events-auto">
        <div className={`p-4 sm:p-5 rounded-2xl border-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isDark 
            ? 'bg-[#0d1322]/98 border-cyan-400/50 text-slate-100 shadow-2xl shadow-cyan-500/20' 
            : 'bg-white/98 border-blue-400 text-slate-900 shadow-2xl'
        }`}>
          {/* Top Line: Step Badge, Icon, Title, and Close */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-700/50 mb-2.5">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                {currentStep.icon}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {currentStep.badge}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Exit Tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Hint Target */}
          <div className="flex items-center space-x-1.5 text-[11px] text-cyan-400 font-semibold mb-2">
            <MousePointerClick className="w-3.5 h-3.5 shrink-0" />
            <span>{currentStep.actionHint}</span>
          </div>

          {/* Description */}
          <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentStep.description}
          </p>

          {/* Pro Tip Box */}
          <div className={`p-2 rounded-xl border flex items-center space-x-2 text-[11px] mb-3.5 ${
            isDark 
              ? 'bg-blue-950/40 border-blue-800/40 text-blue-200' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <p className="truncate">
              <strong>Tip:</strong> {currentStep.proTip}
            </p>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-700/50 text-xs">
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStepIdx
                      ? 'w-5 bg-cyan-400 shadow-sm shadow-cyan-400/70'
                      : isDark ? 'w-1.5 bg-slate-700 hover:bg-slate-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
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
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-1 transition transform active:scale-95 cursor-pointer"
              >
                <span>{isLast ? 'Complete Tour 🎉' : `Next Step (${currentStepIdx + 2}/5)`}</span>
                {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
