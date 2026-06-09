import React, { useState } from "react";
import { 
  FolderGit2, 
  Terminal, 
  Layers, 
  ShieldAlert, 
  FileCode, 
  Camera, 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Info,
  ExternalLink
} from "lucide-react";

// Workspace component imports
import FileTreeCompare from "./components/FileTreeCompare";
import AuditedCodeBrowser from "./components/AuditedCodeBrowser";
import TestHub from "./components/TestHub";
import DiagnosticSandbox from "./components/DiagnosticSandbox";
import CHWPatientQueue from "./components/CHWPatientQueue";

export default function App() {
  const [activeTab, setActiveTab] = useState<"tree" | "audit" | "test" | "scan" | "chw">("tree");
  
  // Selected file tracker for Code Browser tab
  const [selectedFile, setSelectedFile] = useState<{
    path: string;
    content: string;
    source: "original" | "target";
  }>({
    path: "README.md",
    content: `# MediScan Local: Re-Architected Clinical Diagnostics Workspace\n\nMediScan is a clinical diagnostic suite designed for on-device medical condition screening (Skin, Eye, Oral, Wound). This workspace has been re-architected into a high-performance, enterprise-ready monorepo supporting low-latency offline inference, rigorous machine learning fairness audits, and secure synchronization pathways for Community Health Workers (CHWs).\n\n## 🚀 Workspace Features\n- **Mobile Client**: Expo/React Native workspace with offline ONNX Runtime inference, dual-language Support (EN, UR, HI, SW), and biometric access controls.\n- **Robust Backend**: Standardized Python FastAPI backend providing rate-limiting, HMAC-validated syncing, and PostgreSQL/Alembic schemas.\n- **Advanced ML Pipeline**: PyTorch-based training scripts with Platt Calibration, demographic bias detection across Fitzpatrick skin types, and INT8 static/dynamic quantization.\n- **Enterprise DevOps**: Multi-stage Dockerized services, GitHub Actions CI/CD workflows, Terraform cloud configuration, and core clinical documentation.`,
    source: "target"
  });

  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selectFileFromTree = (path: string, content: string, source: "original" | "target") => {
    setSelectedFile({ path, content, source });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0A0C10] text-[#E2E8F0] font-sans">
      
      {/* Top Clinical Suite HUD Banner in Artistic Flair */}
      <header className="border-b border-white/10 bg-[#0A0C10] px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-baseline gap-4 select-none shrink-0 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
            MediScan<span className="text-blue-500">.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-blue-400 mt-2.5 uppercase">
            Universal Clinical Imaging & Diagnostic Repository
          </p>
        </div>

        {/* Global Stats Counter Section with Artistic Flair Box Elements */}
        <div className="flex flex-wrap items-baseline gap-4 md:gap-6 relative z-10">
          <div className="flex flex-col text-left md:text-right">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Workspace Struct</span>
            <span className="text-xs font-mono font-bold text-slate-300 mt-1">150+ Mapped</span>
          </div>
          <div className="flex flex-col text-left md:text-right">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Calibration Latency</span>
            <span className="text-xs font-mono font-bold text-blue-400 mt-1">~4.8ms</span>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1 select-none">Project Status</div>
            <div className="px-2.5 py-0.5 bg-blue-500/15 border border-blue-500/40 text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider inline-block">
              Refactored Architecture v2.0
            </div>
          </div>
        </div>
      </header>

      {/* Primary Application Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Workspace Vertical Left Rails Navigator */}
        <nav className="border-r border-white/10 bg-[#0A0C10] w-16 md:w-52 shrink-0 flex flex-col justify-between py-6 px-3 gap-8 select-none">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-[0.2em] pl-2.5 hidden md:block mb-2">
              File Studio
            </span>
            
            <button
              onClick={() => setActiveTab("tree")}
              className={`w-full flex items-center gap-3 p-3 md:py-2.5 md:px-3 text-xs font-semibold rounded transition duration-150 group ${
                activeTab === "tree"
                  ? "bg-blue-600/15 border border-blue-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <FileCode className="w-4 h-4 text-blue-400 group-hover:scale-110 transition shrink-0" />
              <span className="hidden md:inline">Repo & File Browser</span>
            </button>

            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-[0.2em] pl-2.5 hidden md:block mb-2 mt-4">
              Integrations Audit
            </span>

            <button
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center gap-3 p-3 md:py-2.5 md:px-3 text-xs font-semibold rounded transition duration-150 group ${
                activeTab === "audit"
                  ? "bg-blue-600/15 border border-blue-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-blue-400 group-hover:scale-110 transition shrink-0" />
              <span className="hidden md:inline">Vulnerability Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab("test")}
              className={`w-full flex items-center gap-3 p-3 md:py-2.5 md:px-3 text-xs font-semibold rounded transition duration-150 group ${
                activeTab === "test"
                  ? "bg-blue-600/15 border border-blue-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Terminal className="w-4 h-4 text-blue-400 group-hover:scale-110 transition shrink-0" />
              <span className="hidden md:inline">Automated Test Suite</span>
            </button>

            <span className="text-[9px] text-gray-400 font-mono uppercase tracking-[0.2em] pl-2.5 hidden md:block mb-2 mt-4">
              On-Device Clinical Sandbox
            </span>

            <button
              onClick={() => setActiveTab("scan")}
              className={`w-full flex items-center gap-3 p-3 md:py-2.5 md:px-3 text-xs font-semibold rounded transition duration-150 group ${
                activeTab === "scan"
                  ? "bg-blue-600/15 border border-blue-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Camera className="w-4 h-4 text-blue-400 group-hover:scale-110 transition shrink-0" />
              <span className="hidden md:inline">Condition Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab("chw")}
              className={`w-full flex items-center gap-3 p-3 md:py-2.5 md:px-3 text-xs font-semibold rounded transition duration-150 group ${
                activeTab === "chw"
                  ? "bg-blue-600/15 border border-blue-500/30 text-white font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition shrink-0" />
              <span className="hidden md:inline">CHW Queue & Locale</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 hidden md:flex border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/25 px-3 py-2 rounded text-[10px] text-[#10b981] font-mono leading-none">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Platt Curve Calibrated</span>
            </div>
            <a 
              href="https://github.com/ibtesaamaslam/MediScan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[9px] text-slate-500 group flex items-center gap-1.5 hover:text-slate-300 ml-1 transition uppercase tracking-wider font-mono font-bold"
            >
              <FolderGit2 className="w-3 h-3 text-blue-400 group-hover:scale-110 duration-150" />
              <span>GitHub Original Repo</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </nav>

        {/* Dynamic Panel Renderer */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === "tree" && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full h-full">
              {/* Sidebar file list */}
              <FileTreeCompare
                onSelectFile={selectFileFromTree}
                selectedFilePath={selectedFile.path}
                selectedFileSource={selectedFile.source}
              />

              {/* Central Code browser and metadata pane with clean artistic highlights */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0F1116] relative">
                {/* Aesthetic Detail: Floating label mimicking right column badge */}
                <div className="absolute bottom-16 -right-6 bg-white text-black text-[9px] font-black px-4 py-1 rotate-90 uppercase tracking-[0.3em] select-none z-10 shadow-md">
                  Clean Architecture
                </div>

                <div className="bg-[#0F1116] px-5 py-4 border-b border-white/10 flex justify-between items-center text-xs shrink-0 select-none">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-blue-400">
                      {selectedFile.source} Codebase Node
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-1 font-mono">{selectedFile.path}</h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 font-bold rounded text-slate-300 hover:text-white transition duration-150 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
                    >
                      <Copy className="w-3.5 h-3.5 text-blue-400" />
                      <span>{copiedCode ? "Copied" : "Copy Source"}</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Editor Screen */}
                <div className="flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed bg-[#0A0C10] text-slate-300 relative">
                  <div className="absolute right-4 top-4 text-[9px] text-slate-600 font-mono tracking-widest uppercase select-none">
                    UTF-8 • {selectedFile.path.split(".").pop()?.toUpperCase()}
                  </div>
                  <pre className="select-text whitespace-pre overflow-x-auto">
                    {selectedFile.content}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && <AuditedCodeBrowser />}
          {activeTab === "test" && <TestHub />}
          {activeTab === "scan" && <DiagnosticSandbox />}
          {activeTab === "chw" && <CHWPatientQueue />}
        </div>
      </div>
    </div>
  );
}
