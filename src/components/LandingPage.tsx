'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Eye, 
  Cpu, 
  FileText, 
  Lock, 
  ExternalLink, 
  Play, 
  Sun, 
  Moon, 
  Github, 
  ChevronRight,
  Zap,
  Activity,
  Award,
  Users,
  Compass,
  CheckCircle,
  TrendingUp,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { benchmarkTestCases } from '@/lib/benchmarkData';

interface LandingPageProps {
  onLaunchStudio: (scenarioId?: string) => void;
  onStartTour: () => void;
  onOpenPDF: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

// Reusable Scroll Reveal Animation Wrapper
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-12';
      case 'down':
        return 'opacity-0 -translate-y-12';
      case 'left':
        return 'opacity-0 -translate-x-12';
      case 'right':
        return 'opacity-0 translate-x-12';
      case 'zoom':
        return 'opacity-0 scale-90';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchStudio,
  onStartTour,
  onOpenPDF,
  isDark,
  onToggleTheme,
}) => {
  // Interactive mini-demo state on hero
  const [demoFixed, setDemoFixed] = useState(false);
  const [score, setScore] = useState(48);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track dynamic scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleDemo = () => {
    const nextState = !demoFixed;
    setDemoFixed(nextState);

    if (nextState) {
      setScore(98);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // graceful fallback
      }
    } else {
      setScore(48);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 relative overflow-hidden bg-grid-mesh ${
      isDark ? 'bg-[#080b11] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* 0. Real-time Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 z-[100] transition-all duration-100 ease-out shadow-sm shadow-cyan-400/50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Dynamic Animated Ambient Mesh Orbs */}
      <div className="fixed top-12 left-1/4 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-float-slow z-0" />
      <div className="fixed top-48 right-1/4 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-[150px] pointer-events-none animate-float-delayed z-0" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-slow z-0" />

      {/* 1. Header / Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        isDark ? 'bg-[#080b11]/85 border-slate-800/80' : 'bg-white/85 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Badge */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition transform">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-[#0b0f19]' : 'bg-white'}`}>
                <ShieldCheck className="w-5 h-5 text-blue-500 group-hover:rotate-6 transition transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-base bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  BrandAegis.ai
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 uppercase tracking-wider animate-pulse">
                  Round 2 MVP
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Autonomous Pre-Publication Brand Governance
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold">
            <a href="#features" className={`transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Capabilities
            </a>
            <a href="#demo" className={`transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Live Simulation
            </a>
            <a href="#benchmarks" className={`transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Evaluation Benchmarks
            </a>
            <a href="#architecture" className={`transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Architecture Flow
            </a>
            <button 
              onClick={onOpenPDF}
              className={`flex items-center space-x-1.5 transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Round 2 PDF</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-slate-300 shadow-sm'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/GarvKapoor/BrandAegis"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition flex items-center space-x-1.5 text-xs font-semibold ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-black hover:border-slate-300 shadow-sm'
              }`}
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Launch Studio CTA */}
            <button
              onClick={() => onLaunchStudio()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition transform active:scale-95 hover:shadow-blue-500/40 cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 z-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Tag with entrance animation */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border transition-all animate-fade-up bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>Autonomous Pre-Publication Brand Governance Platform</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-400 font-mono font-bold">React 18 &amp; Next.js 14</span>
          </div>

          {/* Main Title with staggered entrance */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6 animate-fade-up-delay-1">
            Protect Brand Integrity{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
              Before Publication.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-up-delay-2 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            BrandAegis is an enterprise co-pilot that lints marketing copy, grounds legal claims against contractual SLA registries, enforces visual identity tokens, and seals audit trails with cryptographic SHA-256 state hashes.
          </p>

          {/* CTA Button Row with micro-animations */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-up-delay-3">
            <button
              onClick={() => onLaunchStudio()}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 flex items-center space-x-2 transition transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/50 active:translate-y-0 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Governance Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartTour}
              className={`px-6 py-3.5 rounded-2xl border font-bold text-sm flex items-center space-x-2 transition transform hover:-translate-y-1 active:translate-y-0 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-700 text-slate-100 hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/15' 
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-md hover:shadow-lg'
              }`}
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span>Start 60s Guided Tour</span>
            </button>

            <button
              onClick={onOpenPDF}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-sm flex items-center space-x-2 transition hover:-translate-y-0.5 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Round 2 Dossier (PDF)</span>
            </button>
          </div>

          {/* Live Metric Ticker Bar with on-scroll Reveal */}
          <Reveal direction="up" delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
              <div className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-blue-500/50 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-blue-500 font-mono">&lt; 15ms</div>
                <div className="text-[11px] text-slate-400 font-medium">AST Linter Latency</div>
              </div>
              <div className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-indigo-500/50 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">99.9%</div>
                <div className="text-[11px] text-slate-400 font-medium">Certified SLA Grounding</div>
              </div>
              <div className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-cyan-500/50 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">256-bit</div>
                <div className="text-[11px] text-slate-400 font-medium">SHA-256 Audit Defense</div>
              </div>
              <div className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-emerald-500/50 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">4 / 4</div>
                <div className="text-[11px] text-slate-400 font-medium">Benchmark Test Passes</div>
              </div>
            </div>
          </Reveal>

          {/* 3. Interactive Hero Simulator Box with Dynamic Glowing Border */}
          <Reveal direction="zoom" delay={250}>
            <div id="demo" className="max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-blue-500/40 via-indigo-500/20 to-transparent shadow-2xl">
              <div className={`rounded-[23px] border p-6 sm:p-8 text-left transition-all animate-border-glow ${
                isDark ? 'bg-[#0d121f] border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                {/* Simulator Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/60 mb-6">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-blue-400">
                        Live Pre-Flight Linter Demonstration
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mt-1">
                      Real-time Grounded RAG &amp; Diff Simulation
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 transition-all duration-300 ${
                      demoFixed 
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/20 scale-105' 
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                    }`}>
                      <Activity className="w-4 h-4 animate-spin-slow" />
                      <span className="text-xs font-mono font-bold">
                        Health Score: {score}/100 {demoFixed ? '(Pass)' : '(Critical)'}
                      </span>
                    </div>

                    <button
                      onClick={handleToggleDemo}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 active:scale-95 cursor-pointer hover:shadow-blue-500/40"
                    >
                      <span>{demoFixed ? 'Reset Violations' : 'Simulate 1-Click Fix'}</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Draft Box Preview */}
                <div className={`p-5 rounded-2xl border font-mono text-sm leading-relaxed mb-6 transition-all duration-300 ${
                  isDark ? 'bg-[#080b11] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {!demoFixed ? (
                    <p className={`animate-fade-up ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Our revolutionary AI platform{' '}
                      <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/40 line-through">
                        guarantees 100% zero-latency performance
                      </span>{' '}
                      and offers the{' '}
                      <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/40 line-through">
                        world&apos;s most bulletproof data encryption
                      </span>
                      . Sign up now and experience{' '}
                      <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/40">
                        insanely fast
                      </span>{' '}
                      analytics with{' '}
                      <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/40 line-through">
                        zero chance of downtime
                      </span>
                      .{' '}
                      <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/40">
                        Our guys will sanity-check
                      </span>{' '}
                      your integration in 5 minutes!
                    </p>
                  ) : (
                    <p className={`animate-fade-up ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Our enterprise AI platform{' '}
                      <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 font-semibold">
                        delivers ultra-low latency performance
                      </span>{' '}
                      and provides{' '}
                      <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 font-semibold">
                        FIPS 140-3 validated AES-256 data encryption
                      </span>
                      . Sign up now and experience{' '}
                      <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 font-semibold">
                        high-throughput
                      </span>{' '}
                      analytics backed by our{' '}
                      <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 font-semibold">
                        contractual 99.9% uptime SLA
                      </span>
                      .{' '}
                      <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 font-semibold">
                        Our enterprise engineering team will audit
                      </span>{' '}
                      your integration swiftly.
                    </p>
                  )}
                </div>

                {/* Citations & Evidence Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 hover:border-blue-500/40 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">
                      Grounded RAG Citation
                    </span>
                    <p className="font-semibold text-slate-300">
                      Clause 3.1: 99.9% Availability SLA
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 hover:border-cyan-500/40 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                      Security Mandate
                    </span>
                    <p className="font-semibold text-slate-300">
                      Clause 7.4: AES-256 / TLS 1.3
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 hover:border-emerald-500/40 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                      Cryptographic Audit
                    </span>
                    <p className="font-mono text-slate-400 truncate">
                      sha256:7f83b1657ff1...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Enterprise Value Pillars with On-Scroll Stagger Reveal */}
      <section id="features" className={`py-20 border-t relative z-10 transition-colors ${
        isDark ? 'bg-[#0a0e18]/90 border-slate-800/80' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="down">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 inline-flex items-center space-x-1.5 mb-3 animate-pulse">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Enterprise Governance Stack</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Autonomous Governance Across Text &amp; Visuals
              </h2>
              <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Built to replace slow manual legal reviews and accidental compliance fines with instant, non-destructive co-pilot guardrails.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Reveal direction="up" delay={0}>
              <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group relative overflow-hidden h-full ${
                isDark 
                  ? 'bg-[#0e1424] border-slate-800/80 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/25' 
                  : 'bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-2xl'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:rotate-6 transition transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-blue-400 transition">Grounded Legal RAG</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Flags unverified promotional claims against your certified legal SLA contracts with clause-exact citations (Clause 3.1 &amp; 7.4).
                </p>
              </div>
            </Reveal>

            {/* Feature 2 */}
            <Reveal direction="up" delay={120}>
              <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group relative overflow-hidden h-full ${
                isDark 
                  ? 'bg-[#0e1424] border-slate-800/80 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/25' 
                  : 'bg-slate-50 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-2xl'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:rotate-6 transition transform">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-indigo-400 transition">Multimodal Vision Linter</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Scans logo clearspace boundaries (e.g. 16px requirement), WCAG 2.1 contrast ratios, and CIELAB &Delta;E brand color drift.
                </p>
              </div>
            </Reveal>

            {/* Feature 3 */}
            <Reveal direction="up" delay={240}>
              <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group relative overflow-hidden h-full ${
                isDark 
                  ? 'bg-[#0e1424] border-slate-800/80 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/25' 
                  : 'bg-slate-50 border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-2xl'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:rotate-6 transition transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-cyan-400 transition">1-Click Non-Destructive Diffs</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Fixes violations without damaging creator intent. Click &ldquo;Apply Fix&rdquo; or &ldquo;Apply All Fixes&rdquo; for instant compliance.
                </p>
              </div>
            </Reveal>

            {/* Feature 4 */}
            <Reveal direction="up" delay={360}>
              <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer group relative overflow-hidden h-full ${
                isDark 
                  ? 'bg-[#0e1424] border-slate-800/80 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/25' 
                  : 'bg-slate-50 border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-2xl'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-400 opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:rotate-6 transition transform">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-emerald-400 transition">Cryptographic Audit Gate</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  3-tier sign-off pipeline (Creator &rarr; Brand Lead &rarr; Legal Counsel) sealed with tamper-proof SHA-256 state hashes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Evaluation Benchmarks Showcase with Staggered Scroll Reveal */}
      <section id="benchmarks" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
            <Reveal direction="left">
              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 inline-flex items-center space-x-1.5 mb-2 animate-pulse">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Hackathon Round 2 Benchmarks</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Pre-Loaded Real-World Test Cases
                </h2>
              </div>
            </Reveal>

            <Reveal direction="right">
              <button
                onClick={() => onLaunchStudio()}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 group cursor-pointer"
              >
                <span>Explore all in Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition transform" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benchmarkTestCases.map((testCase, idx) => (
              <Reveal key={testCase.id} direction="up" delay={idx * 140}>
                <div 
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:border-cyan-400/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group h-full ${
                    isDark ? 'bg-[#0d121f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                  onClick={() => onLaunchStudio(testCase.id)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 uppercase">
                        {testCase.channel.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">
                        by {testCase.author}
                      </span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-transform group-hover:scale-105 ${
                      testCase.score.overall < 60 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      Initial Score: {testCase.score.overall}/100
                    </div>
                  </div>

                  <h4 className="font-bold text-base mb-1.5 group-hover:text-blue-400 transition">{testCase.title}</h4>
                  <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {testCase.rawText}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/40 text-xs">
                    <span className="text-slate-400 font-mono">
                      {testCase.violations.length} Detected Breaches
                    </span>
                    <span className="text-blue-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition transform">
                      <span>Load Scenario &rarr;</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Architecture Flow & Tech Stack */}
      <section id="architecture" className={`py-20 border-t relative z-10 transition-colors ${
        isDark ? 'bg-[#0a0e18]/90 border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="down">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 inline-flex items-center space-x-1.5 mb-2 animate-pulse">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Technology Stack &amp; Pipeline</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Modern Enterprise React &amp; Next.js Architecture
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Engineered with modern React 18, Next.js App Router, Tailwind CSS, and deterministic in-memory AST scanners for ultra-low latency governance.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-12">
            <Reveal direction="zoom" delay={0}>
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:border-blue-500/50 cursor-pointer h-full ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Cpu className="w-6 h-6 text-blue-400 mx-auto mb-2 animate-pulse" />
                <div className="font-bold text-sm">Next.js 14 + React 18</div>
                <div className="text-[11px] text-slate-400">App Router &amp; Client States</div>
              </div>
            </Reveal>

            <Reveal direction="zoom" delay={100}>
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:border-indigo-500/50 cursor-pointer h-full ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Layers className="w-6 h-6 text-indigo-400 mx-auto mb-2 animate-pulse" />
                <div className="font-bold text-sm">Tailwind CSS</div>
                <div className="text-[11px] text-slate-400">Modern Design System</div>
              </div>
            </Reveal>

            <Reveal direction="zoom" delay={200}>
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:border-cyan-500/50 cursor-pointer h-full ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2 animate-pulse" />
                <div className="font-bold text-sm">Web Crypto API</div>
                <div className="text-[11px] text-slate-400">SHA-256 Audit Signatures</div>
              </div>
            </Reveal>

            <Reveal direction="zoom" delay={300}>
              <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:border-emerald-500/50 cursor-pointer h-full ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Eye className="w-6 h-6 text-emerald-400 mx-auto mb-2 animate-pulse" />
                <div className="font-bold text-sm">CIELAB &amp; WCAG 2.1</div>
                <div className="text-[11px] text-slate-400">&Delta;E Color Math &amp; Ratios</div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Pipeline Steps */}
          <Reveal direction="up" delay={250}>
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0d121f] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-4 tracking-wider">
                Autonomous Governance Flow Pipeline
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>1. Lexical Tokenization</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span>2. Claim &amp; Tone RAG</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>3. 1-Click Diff Fix</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>4. SHA-256 Audit Seal</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Enterprise Callout Banner with Animated Glowing Gradient */}
      <section className="py-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <Reveal direction="zoom" delay={150}>
          <div className="max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-2xl animate-gradient-shift">
            <div className={`p-8 sm:p-12 rounded-[23px] text-center ${
              isDark ? 'bg-[#0d121f]' : 'bg-white'
            }`}>
              <h3 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">
                Ready to automate pre-publication brand governance?
              </h3>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Experience zero-latency compliance linting, clause-exact grounded citations, and multi-tier cryptographic sign-offs in your browser.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onLaunchStudio()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center space-x-2 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Launch Governance Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onStartTour}
                  className={`px-6 py-3 rounded-xl border font-bold text-xs flex items-center space-x-2 transition cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Take Interactive Tour</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8. Footer */}
      <footer className={`py-12 border-t text-xs relative z-10 ${
        isDark ? 'bg-[#080b11] border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <Reveal direction="fade" delay={100}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-slate-200">BrandAegis.ai</span>
              <span>&copy; 2026. Built by Garv Kapoor for Hackathon Round 2.</span>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={onOpenPDF} className="hover:text-blue-400 transition cursor-pointer">
                Submission Dossier (PDF)
              </button>
              <a 
                href="https://github.com/GarvKapoor/BrandAegis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                GitHub Source
              </a>
              <button onClick={() => onLaunchStudio()} className="font-bold text-blue-400 hover:text-blue-300 transition cursor-pointer">
                Launch Studio &rarr;
              </button>
            </div>
          </div>
        </Reveal>
      </footer>
    </div>
  );
};
