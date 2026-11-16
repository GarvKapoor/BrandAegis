'use client';

import React, { useEffect, useState } from 'react';
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
  Eye 
} from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  proTip: string;
  placement: 'bottom' | 'top' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-scenario-selector',
    title: '1. Select an Enterprise Scenario',
    badge: 'Step 1 of 5',
    icon: <Layers className="w-4 h-4 text-blue-400" />,
    description: 'Switch between 4 pre-loaded real-world benchmarks: FinTech SLA drift, Figma logo clearspace breach, social contrast failure, or compliant whitepaper.',
    proTip: 'Try the "FinTech Cloud Launch" scenario to see how BrandAegis intercepts unapproved marketing claims.',
    placement: 'bottom'
  },
  {
    targetId: 'tour-canvas-preview',
    title: '2. Interactive Creative Canvas',
    badge: 'Step 2 of 5',
    icon: <Eye className="w-4 h-4 text-teal-400" />,
    description: 'Your marketing collateral is rendered inside a live creative canvas. Violations are highlighted directly in the text with interactive chips.',
    proTip: 'Click on any highlighted token (like "guarantees 100%") to jump straight to that rule in the Inspector!',
    placement: 'right'
  },
  {
    targetId: 'tour-inspector-panel',
    title: '3. Brand Copilot Inspector',
    badge: 'Step 3 of 5',
    icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    description: 'Inspect exact clause citations from the Brand Kit, view red/teal diff comparisons, and click "Apply Fix" to update the copy in place.',
    proTip: 'Click "Apply All Fixes" in the top bar to watch your Brand Health score instantly jump to 98/100.',
    placement: 'left'
  },
  {
    targetId: 'tour-approval-workflow',
    title: '4. Governance Approval Gates',
    badge: 'Step 4 of 5',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    description: 'Tiered approval pipeline (Creator -> Brand Lead -> Legal). Once flags are resolved, each tier can sign off, generating a cryptographic SHA-256 audit ledger.',
    proTip: 'Switch your testing role in the bottom-left sidebar to test Brand Lead or Legal sign-off permissions!',
    placement: 'top'
  },
  {
    targetId: 'tour-brand-brain',
    title: '5. Brand Brain Knowledge Hub',
    badge: 'Step 5 of 5',
    icon: <BookOpen className="w-4 h-4 text-amber-400" />,
    description: 'The single source of truth containing verified claim registries, SLA parameters, voice pillars, and design tokens.',
    proTip: 'Click "Brand Brain" in the sidebar anytime to explore or edit certified legal claims and forbidden superlatives.',
    placement: 'right'
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

  useEffect(() => {
    if (!isOpen) return;

    // Scroll active element into view and apply highlight
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

  const currentStep = TOUR_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === TOUR_STEPS.length - 1;

  const handleNext = () => {
    const el = document.getElementById(currentStep.targetId);
    if (el) el.classList.remove('tour-target-highlight');

    if (isLast) {
      onClose();
    } else {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    const el = document.getElementById(currentStep.targetId);
    if (el) el.classList.remove('tour-target-highlight');
    if (!isFirst) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Floating Tutorial Card */}
      <div className={`relative pointer-events-auto w-full max-w-md rounded-2xl shadow-2xl p-5 border transition-all duration-300 animate-pop-in z-50 ${
        isDark 
          ? 'bg-[#0e1422] border-slate-700 text-slate-100 shadow-blue-500/10' 
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block font-mono">
                {currentStep.badge}
              </span>
              <h3 className="text-sm font-bold leading-tight">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title="Exit Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {currentStep.description}
        </p>

        {/* Pro Tip Callout */}
        <div className={`p-2.5 rounded-xl border flex items-start space-x-2 text-[11px] mb-4 ${
          isDark 
            ? 'bg-blue-950/40 border-blue-800/40 text-blue-200' 
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold">Interactive Tip: </strong>
            {currentStep.proTip}
          </p>
        </div>

        {/* Step Progress Dots & Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
          {/* Progress Dots */}
          <div className="flex items-center space-x-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIdx
                    ? 'w-5 bg-blue-500'
                    : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className={`px-2.5 py-1.5 rounded-lg font-medium text-xs flex items-center space-x-1 transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-semibold text-xs shadow-md flex items-center space-x-1 transition transform active:scale-95"
            >
              <span>{isLast ? 'Complete Tour' : 'Next Step'}</span>
              {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
