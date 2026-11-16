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
  Eye,
  Compass,
  ArrowRight
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
    description: 'Start here! Select a pre-loaded real-world test case to test how BrandAegis evaluates different failure modes (FinTech SLA drift, Figma logo clearspace, or social contrast failure).',
    proTip: 'The "FinTech Cloud Launch" scenario contains unverified 100% uptime claims and marketing superlatives.',
    actionHint: 'Look at the highlighted dropdown in the top bar.'
  },
  {
    targetId: 'tour-canvas-preview',
    title: '2. Live Creative Canvas with Flagged Spans',
    badge: 'Step 2 of 5',
    icon: <Eye className="w-5 h-5 text-teal-400" />,
    description: 'Your marketing draft is rendered inside a production-like creative canvas. Detected compliance breaches are highlighted with glowing chips directly in the copy and layout.',
    proTip: 'Clicking any highlighted word on the canvas (like "guarantees 100%") instantly jumps to that exact rule in the Inspector!',
    actionHint: 'Notice the glowing red/amber chips on the draft text.'
  },
  {
    targetId: 'tour-inspector-panel',
    title: '3. Brand Copilot Inspector & Grounded Diff',
    badge: 'Step 3 of 5',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    description: 'The right inspector displays your live compliance health score (e.g. 48/100). For each flag, it cites the exact brand book clause and gives you a 1-click "Apply Fix" button to replace the text in-place!',
    proTip: 'Click "Apply All Fixes" in the top bar to watch your score jump to 98/100 with zero manual effort.',
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

  useEffect(() => {
    if (!isOpen) return;

    // Apply highlight and scroll into view
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
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px] pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Floating Spotlight Card */}
      <div className={`relative pointer-events-auto w-full max-w-lg rounded-2xl shadow-2xl p-6 border transition-all duration-300 animate-pop-in z-50 ${
        isDark 
          ? 'bg-[#0e1422] border-blue-500/40 text-slate-100 shadow-blue-500/20' 
          : 'bg-white border-blue-200 text-slate-900 shadow-2xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block font-mono">
                {currentStep.badge}
              </span>
              <h3 className="text-sm font-bold text-white">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title="Skip Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Hint Target */}
        <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-medium mb-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>{currentStep.actionHint}</span>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {currentStep.description}
        </p>

        {/* Interactive Pro Tip Box */}
        <div className={`p-3 rounded-xl border flex items-start space-x-2.5 text-xs mb-5 ${
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

        {/* Progress & Navigation Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
          {/* Progress Indicators */}
          <div className="flex items-center space-x-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIdx
                    ? 'w-6 bg-blue-500 shadow-sm shadow-blue-500/50'
                    : isDark ? 'w-2 bg-slate-700' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
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
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition transform active:scale-95"
            >
              <span>{isLast ? 'Start Using BrandAegis' : 'Next Step'}</span>
              {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
