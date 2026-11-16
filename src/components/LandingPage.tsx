'use client';

import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { benchmarkTestCases } from '@/lib/benchmarkData';

interface LandingPageProps {
  onLaunchStudio: (scenarioId?: string) => void;
  onStartTour: () => void;
  onOpenPDF: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchStudio,
  onStartTour,
  onOpenPDF,
  isDark,
  onToggleTheme,
}) => {
  // Interactive mini-demo state on hero
  const [demoFixed, setDemoFixed] = useState(false);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 ${
      isDark ? 'bg-[#080b11] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* 1. Header / Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        isDark ? 'bg-[#080b11]/85 border-slate-800/80' : 'bg-white/85 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-[#0b0f19]' : 'bg-white'}`}>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-base bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  BrandAegis.ai
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 uppercase tracking-wider">
                  Round 2 MVP
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Autonomous Pre-Publication Brand Governance Platform
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
              Architecture
            </a>
            <button 
              onClick={onOpenPDF}
              className={`flex items-center space-x-1.5 transition hover:text-blue-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Round 1 PDF</span>
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
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition transform active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background glow meshes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border transition-all animate-pop-in bg-blue-500/10 border-blue-500/30 text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>Autonomous Pre-Publication Brand Governance Platform</span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-400">Built with React & Next.js</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6">
            Protect Brand Integrity{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Before Publication.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            BrandAegis is an enterprise co-pilot that lints marketing copy, grounds legal claims against contractual SLA registries, enforces visual identity tokens, and seals audit trails with cryptographic SHA-256 state hashes.
          </p>

          {/* CTA Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onLaunchStudio()}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 flex items-center space-x-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Governance Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartTour}
              className={`px-6 py-3.5 rounded-2xl border font-bold text-sm flex items-center space-x-2 transition transform hover:-translate-y-0.5 active:translate-y-0 ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-700 text-slate-100 hover:bg-slate-800 hover:border-slate-600' 
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-md'
              }`}
            >
              <Play className="w-4 h-4 text-blue-500 fill-blue-500/20" />
              <span>Start 60s Guided Tour</span>
            </button>

            <button
              onClick={onOpenPDF}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-sm flex items-center space-x-2 transition ${
                isDark 
                  ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Executive Dossier (PDF)</span>
            </button>
          </div>

          {/* 3. Interactive Hero Simulator Box */}
          <div id="demo" className="max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-blue-500/30 via-indigo-500/10 to-transparent shadow-2xl">
            <div className={`rounded-[23px] border p-6 sm:p-8 text-left transition-all ${
              isDark ? 'bg-[#0d121f] border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              {/* Simulator Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/60 mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-blue-400">
                      Live Pre-Flight Linter Demonstration
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mt-1">
                    Real-time Grounded RAG & Diff Simulation
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 ${
                    demoFixed 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">
                      Health Score: {demoFixed ? '98/100 (Pass)' : '48/100 (Critical)'}
                    </span>
                  </div>

                  <button
                    onClick={() => setDemoFixed(!demoFixed)}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center space-x-1"
                  >
                    <span>{demoFixed ? 'Reset Violations' : 'Simulate 1-Click Fix'}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Draft Box Preview */}
              <div className={`p-5 rounded-2xl border font-mono text-sm leading-relaxed mb-6 transition-all ${
                isDark ? 'bg-[#080b11] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                {!demoFixed ? (
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
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
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
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
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">
                    Grounded RAG Citation
                  </span>
                  <p className="font-semibold text-slate-300">
                    Clause 3.1: 99.9% Availability SLA
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                    Security Mandate
                  </span>
                  <p className="font-semibold text-slate-300">
                    Clause 7.4: AES-256 / TLS 1.3
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
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
        </div>
      </section>

      {/* 4. Enterprise Value Pillars */}
      <section id="features" className={`py-20 border-t ${
        isDark ? 'bg-[#0a0e18] border-slate-800/80' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
              Enterprise Governance Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Autonomous Governance Across Text & Visuals
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Built to replace slow manual legal reviews and accidental compliance fines with instant, non-destructive co-pilot guardrails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'bg-[#0e1424] border-slate-800/80 hover:border-blue-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-300 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Grounded Legal RAG</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Flags unverified promotional claims against your certified legal SLA contracts with clause-exact citations (Clause 3.1 & 7.4).
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'bg-[#0e1424] border-slate-800/80 hover:border-indigo-500/50' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Multimodal Vision Linter</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Scans logo clearspace boundaries (e.g. 16px requirement), WCAG 2.1 contrast ratios, and CIELAB &Delta;E brand color drift.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'bg-[#0e1424] border-slate-800/80 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-cyan-300 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">1-Click Non-Destructive Diffs</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Fixes violations without damaging creator intent. Click &ldquo;Apply Fix&rdquo; or &ldquo;Apply All Fixes&rdquo; for instant compliance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'bg-[#0e1424] border-slate-800/80 hover:border-emerald-500/50' : 'bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Cryptographic Audit Gate</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                3-tier sign-off pipeline (Creator &rarr; Brand Lead &rarr; Legal Counsel) sealed with tamper-proof SHA-256 state hashes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Evaluation Benchmarks Showcase */}
      <section id="benchmarks" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
                Hackathon Round 2 Benchmarks
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Pre-Loaded Real-World Test Cases
              </h2>
            </div>
            <button
              onClick={() => onLaunchStudio()}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Explore all in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benchmarkTestCases.map((testCase) => (
              <div 
                key={testCase.id}
                className={`p-6 rounded-2xl border transition-all hover:border-blue-500/50 cursor-pointer ${
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
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                    testCase.score.overall < 60 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    Initial Score: {testCase.score.overall}/100
                  </div>
                </div>

                <h4 className="font-bold text-base mb-1.5">{testCase.title}</h4>
                <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {testCase.rawText}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/40 text-xs">
                  <span className="text-slate-400 font-mono">
                    {testCase.violations.length} Detected Breaches
                  </span>
                  <span className="text-blue-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition">
                    <span>Load Scenario &rarr;</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Architecture & Tech Stack */}
      <section id="architecture" className={`py-20 border-t ${
        isDark ? 'bg-[#0a0e18] border-slate-800/80' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
              Technology Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Modern Enterprise React & Next.js Architecture
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Engineered with modern React 18, Next.js App Router, Tailwind CSS, and deterministic in-memory AST scanners for ultra-low latency governance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Cpu className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="font-bold text-sm">Next.js 14 + React 18</div>
              <div className="text-[11px] text-slate-400">App Router & Client States</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Layers className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <div className="font-bold text-sm">Tailwind CSS</div>
              <div className="text-[11px] text-slate-400">Modern Design System</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="font-bold text-sm">Web Crypto API</div>
              <div className="text-[11px] text-slate-400">SHA-256 Audit Signatures</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0e1424] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Eye className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="font-bold text-sm">CIELAB & WCAG 2.1</div>
              <div className="text-[11px] text-slate-400">&Delta;E Color Math & Ratios</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className={`py-12 border-t text-xs ${
        isDark ? 'bg-[#080b11] border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-200">BrandAegis.ai</span>
            <span>&copy; 2026. Built by Garv Kapoor for Hackathon Round 2.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onOpenPDF} className="hover:text-blue-400 transition">
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
            <button onClick={() => onLaunchStudio()} className="font-bold text-blue-400 hover:text-blue-300 transition">
              Launch Studio &rarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
