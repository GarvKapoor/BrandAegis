'use client';

import React from 'react';
import { X, Cpu, Server, Database, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Product Architecture &amp; Technical Decisions</h3>
              <p className="text-xs text-slate-400">
                Round 2 Engineering Blueprint: Agentic RAG, Multimodal Linters &amp; Cryptographic Audit Ledger
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Architecture Pipeline Flow */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-brand-600" />
              <span>System Dataflow &amp; Orchestration</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                <span className="font-bold text-brand-700 block">1. Ingestion</span>
                <span className="text-[10px] text-slate-500">Figma / Docs / Web / REST APIs</span>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                <span className="font-bold text-brand-700 block">2. Gateway</span>
                <span className="text-[10px] text-slate-500">FastAPI &bull; Async Queue</span>
              </div>
              <div className="bg-white border border-teal-300 p-2.5 rounded-lg shadow-sm bg-teal-50/50">
                <span className="font-bold text-teal-800 block">3. Multi-Linter</span>
                <span className="text-[10px] text-teal-700">Gemini 1.5 + CV (OpenCV)</span>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                <span className="font-bold text-brand-700 block">4. Diff Resolution</span>
                <span className="text-[10px] text-slate-500">Clause Citations &bull; 1-Click Fix</span>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                <span className="font-bold text-brand-700 block">5. Audit Sign-Off</span>
                <span className="text-[10px] text-slate-500">SHA-256 Hashed Ledgers</span>
              </div>
            </div>
          </div>

          {/* Key Technical Decisions Matrix */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Layer / Component</th>
                  <th className="p-3">Selected Technology</th>
                  <th className="p-3">Technical Rationale &amp; Trade-off Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Multimodal LLM</td>
                  <td className="p-3 font-mono text-brand-700">Google Gemini 1.5 Pro &amp; Flash</td>
                  <td className="p-3 text-slate-600">
                    Provides native multimodal token understanding across text and high-res images with structured JSON schema outputs; enables sub-15s response latency.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Knowledge RAG Store</td>
                  <td className="p-3 font-mono text-brand-700">Qdrant Vector DB + Dense/Sparse Hybrid</td>
                  <td className="p-3 text-slate-600">
                    Dense semantic embeddings (BGE-Large) catch tone and concept similarity, while sparse BM25 indexing guarantees 100% exact match for certified product names and legal claim clauses.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Computer Vision Linter</td>
                  <td className="p-3 font-mono text-brand-700">OpenCV + CIELAB Color Engine</td>
                  <td className="p-3 text-slate-600">
                    Deterministic mathematical color-distance calculation (Delta-E CIE2000 &lt; 2.0) and contour-based logo bounding-box clearspace verification eliminate generative hallucinations.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Frontend &amp; Studio</td>
                  <td className="p-3 font-mono text-brand-700">Next.js 14, React 18, Tailwind CSS</td>
                  <td className="p-3 text-slate-600">
                    High-speed Server-Side Rendering with reactive state management; enables smooth split-screen non-destructive diff editing and zero-lag bounding box rendering.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Security &amp; Audit Trail</td>
                  <td className="p-3 font-mono text-brand-700">SHA-256 Hashed Ledgers + ZDR APIs</td>
                  <td className="p-3 text-slate-600">
                    Enterprise Zero Data Retention guarantees no customer copy is trained on; cryptographically linked audit manifests ensure 100% compliance audit readiness.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Details of APIs & External Services */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Inventory of APIs, Models, Datasets &amp; Libraries:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="font-bold text-slate-800 block">AI &amp; Embeddings:</span>
                <span className="text-slate-600">Google Gemini 1.5 Pro / Flash via official Google GenAI SDK, BGE-Large dense embeddings, BM25 tokenizer.</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Computer Vision &amp; Math:</span>
                <span className="text-slate-600">OpenCV (cv2), Pillow (PIL), scikit-image color space conversion (rgb2lab, deltaE_ciede2000).</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Backend &amp; Storage:</span>
                <span className="text-slate-600">Python 3.11, FastAPI, Celery, Redis, PostgreSQL with Row-Level Security (RLS), Qdrant vector database.</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Creative Integrations:</span>
                <span className="text-slate-600">Figma Plugin REST API (manifest v2/v3), Google Workspace Apps Script SDK, Slack Bolt Webhooks.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition"
          >
            Close Architecture Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
