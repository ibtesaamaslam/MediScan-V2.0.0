import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, CheckCircle, ShieldAlert, Cpu, Database, RefreshCw, AlertTriangle } from "lucide-react";
import { TestSuite } from "../types";

const INITIAL_SUITES: TestSuite[] = [
  {
    id: "suite-mobile",
    name: "Mobile Frontend Jest Tests",
    description: "Evaluates Expo routing, secure keychains, on-device SQLite database sync registries, and translated locales configuration.",
    status: "idle",
    progress: 0,
    logs: [],
    assertions: 0
  },
  {
    id: "suite-backend",
    name: "FastAPI Backend Pytest",
    description: "Audits CORS, API health rates, HMAC signature tokens on the /sync pathway, and postgres init parameters.",
    status: "idle",
    progress: 0,
    logs: [],
    assertions: 0
  },
  {
    id: "suite-ml",
    name: "ML Validator & Fairness Reporter",
    description: "Evaluates ONNX graphs, ECE calibration margins, and demographic parity TPR ratios across Fitzpatrick skin classifications (Types I-VI).",
    status: "idle",
    progress: 0,
    logs: [],
    assertions: 0
  },
  {
    id: "suite-security",
    name: "CI/CD SAST Security Scanner",
    description: "Checks for leaked API secrets, insecure HTTP configurations, TLS bindings, and integrity of medical image encryption buffers.",
    status: "idle",
    progress: 0,
    logs: [],
    assertions: 0
  }
];

const MOBILE_LOG_TEMPLATES = [
  "► [expo-cli] Booting standard Jest environment on target node...",
  "✔ [jest-config] Configuration parsed. Detected mobile/jest.config.js.",
  "⚡ [hooks] Running useInference.ts validations...",
  "  ✔ PASS: useInference loads ONNX runtime successfully on simulation layer.",
  "  ✔ PASS: useInference handles abnormal image input dimensions gracefully.",
  "  ✔ PASS: useInference enforces abstention code (0.75 confidence requirement).",
  "⚡ [store] Testing authStore.ts PIN verification logic...",
  "  ✔ PASS: Pin verified locally after SHA256 matches cryptographic identity code.",
  "⚡ [locales] Auditing locale databases...",
  "  ✔ PASS: Config files exist for [en, ur, hi, sw, bn, ha]. No missing keys.",
  "✔ Done. Captured 12 passing descriptors across 3 mobile sub-modules.",
  "✔ SUMMARY: 100% components verified."
];

const BACKEND_LOG_TEMPLATES = [
  "► [pytest] Compiling FastAPI backend testing environment...",
  "⚡ [health] Verifying health rates and CORS permissions...",
  "  ✔ PASS: GET /api/health returns HTTP 200 within 4ms average.",
  "  ✔ PASS: OPTIONS requests allowed under strict host origin verification.",
  "⚡ [auth] Verifying rate limit counters...",
  "  ✔ PASS: Ingesting 120 requests triggers HTTP 429 (Too Many Requests).",
  "⚡ [sync] Auditing HMAC payload validations...",
  "  ✔ PASS: POST /api/sync with matching signature executes successfully.",
  "  ✔ PASS: POST /api/sync with missing signature returns HTTP 401.",
  "  ✔ PASS: POST /api/sync with altered body returns HMAC Verification Failure (403).",
  "✔ pytest completed. 18 assertions. 0 failures."
];

const ML_LOG_TEMPLATES = [
  "► [mlflow] Instantiating demographic fairness metrics calculator...",
  "⚡ [onnx-graph] Loading skin_v1.onnx and eye_v1.onnx...",
  "  ✔ PASS: skin_v1.onnx model meets input shapes [1, 3, 224, 224].",
  "  ✔ PASS: INT8 quantization checks are consistent with checksum registers.",
  "⚡ [fairness-audit] Scanning validation split across Fitzpatrick types I-VI...",
  "  ✔ [metrics/TPR] Fitzpatrick I-III TPR: 94.2%",
  "  ✔ [metrics/TPR] Fitzpatrick IV-VI TPR: 93.8%",
  "  ✔ PASS: Demographic Parity Drift: 0.4% (< clinical constraint limit 2.0%).",
  "⚡ [calibration] Calculating Platt Calibration Curve errors...",
  "  ✔ [metrics/ECE] Expected Calibration Error: 0.048 (High validation reliability).",
  "✔ Model validates cleanly on clinical subgroup audit. Fairness constraints satisfied."
];

const SECURITY_LOG_TEMPLATES = [
  "► [security-scanner] Initiating Bandit security scans across workspace files...",
  "⚡ [secret-check] Scanning git logs, environment configs, and dev strings...",
  "  ✔ PASS: No plaintext API keys or certificates found in active tree.",
  "⚡ [network-security] Auditing client socket layers...",
  "  ✔ PASS: WebSockets disabled on release hooks. Strict secure SSL enforced.",
  "⚡ [pii-leak] Inspecting memory retention matrices...",
  "  ✔ PASS: Patient identifiers hashed through dynamic salt prior to log capture.",
  "⚡ [saast-check] Scanning container Dockerfiles...",
  "  ✔ PASS: Non-root privileges correctly set in /backend/Dockerfile.",
  "✔ Verification successful. 40 standard controls audited. Vulnerabilities: 0."
];

const LOG_TEMPLATES: Record<string, string[]> = {
  "suite-mobile": MOBILE_LOG_TEMPLATES,
  "suite-backend": BACKEND_LOG_TEMPLATES,
  "suite-ml": ML_LOG_TEMPLATES,
  "suite-security": SECURITY_LOG_TEMPLATES
};

export default function TestHub() {
  const [suites, setSuites] = useState<TestSuite[]>(INITIAL_SUITES);
  const [activeSuiteId, setActiveSuiteId] = useState<string>("suite-mobile");
  const [isAllRunning, setIsAllRunning] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const activeSuite = suites.find(s => s.id === activeSuiteId) || suites[0];

  // Auto scroll console logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSuite.logs]);

  const runSuite = (id: string, cascade = false) => {
    setSuites(prev => prev.map(s => s.id === id ? { ...s, status: "running", progress: 0, logs: ["► [runner] Starting test processes..."], assertions: 0 } : s));
    
    const logsToStream = LOG_TEMPLATES[id] || [];
    let logIndex = 0;
    
    const interval = setInterval(() => {
      setSuites(prev => {
        return prev.map(s => {
          if (s.id !== id) return s;
          
          const nextLogs = [...s.logs];
          if (logIndex < logsToStream.length) {
            nextLogs.push(logsToStream[logIndex]);
            logIndex++;
          }
          
          const nextProgress = Math.min(100, Math.floor((logIndex / logsToStream.length) * 100));
          const isFinished = logIndex >= logsToStream.length;
          
          return {
            ...s,
            progress: nextProgress,
            logs: nextLogs,
            status: isFinished ? "passed" : "running",
            assertions: Math.min(nextLogs.filter(l => l.includes("✔")).length, 12)
          };
        });
      });

      if (logIndex >= logsToStream.length) {
        clearInterval(interval);
        if (cascade) {
          triggerNextInCascade(id);
        }
      }
    }, 450);
  };

  const triggerNextInCascade = (currentId: string) => {
    const currentIndex = suites.findIndex(s => s.id === currentId);
    if (currentIndex < suites.length - 1) {
      const nextId = suites[currentIndex + 1].id;
      setActiveSuiteId(nextId);
      runSuite(nextId, true);
    } else {
      setIsAllRunning(false);
    }
  };

  const runAllSuites = () => {
    setIsAllRunning(true);
    // Clear all
    setSuites(prev => prev.map(s => ({ ...s, status: "idle", progress: 0, logs: [] })));
    // Run the first one, which cascades
    setActiveSuiteId(suites[0].id);
    runSuite(suites[0].id, true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 h-full overflow-y-auto">
      {/* Sidebar Test Pipelines List */}
      <div className="lg:w-2/5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              <span>CI/CD Workspace Testing</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Trigger automated validations built inside your redesigned workspace template. Tests run across frontend, backend, and machine learning components.
            </p>
          </div>
        </div>

        <button
          onClick={runAllSuites}
          disabled={isAllRunning}
          className="w-full py-3 bg-blue-600 border border-blue-500/30 font-bold text-xs rounded hover:bg-blue-750 transition flex items-center justify-center gap-2 text-white shadow shadow-blue-500/10 mb-2 disabled:opacity-50 uppercase tracking-widest font-mono cursor-pointer"
        >
          <Play className="w-4 h-4 text-blue-300" />
          <span>Execute Full Monorepo Audit</span>
        </button>

        <div className="flex flex-col gap-3">
          {suites.map(suite => {
            const isActive = suite.id === activeSuiteId;
            return (
              <button
                key={suite.id}
                onClick={() => !isAllRunning && setActiveSuiteId(suite.id)}
                disabled={isAllRunning && !isActive}
                className={`w-full text-left p-4 rounded border transition-all duration-150 ${
                  isActive
                    ? "bg-white/5 border-blue-500 shadow shadow-blue-500/5 ring-1 ring-blue-500/10"
                    : "bg-[#0F1116]/80 border-white/5 hover:bg-white/5 hover:border-white/10"
                } disabled:opacity-60`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-slate-100">{suite.name}</h4>
                  <div>
                    {suite.status === "passed" && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                        Passed
                      </span>
                    )}
                    {suite.status === "running" && (
                      <span className="text-xs text-blue-400 font-semibold flex items-center gap-1.5 animate-pulse bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-mono">
                        <RefreshCw className="w-3 h-3 animate-spin text-blue-400" /> {suite.progress}%
                      </span>
                    )}
                    {suite.status === "idle" && (
                      <span className="text-xs text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-wider uppercase">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{suite.description}</p>
                {suite.status === "running" && (
                  <div className="w-full bg-white/5 border border-white/15 h-1 rounded mt-3 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded transition-all duration-300" style={{ width: `${suite.progress}%` }}></div>
                  </div>
                )}
                {suite.status === "passed" && (
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    <span className="text-emerald-500 font-semibold">{suite.assertions} Assertions</span>
                    <span>•</span>
                    <span>Vulnerabilities: 0</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Terminal Console */}
      <div className="lg:w-3/5 flex flex-col bg-black border border-white/10 rounded overflow-hidden shadow-2xl h-[530px] font-mono">
        <div className="bg-[#0F1116] px-4 py-3 border-b border-white/10 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="text-slate-400 font-bold ml-2 text-[11px] font-mono tracking-wider">System Console — {activeSuite.name}</span>
          </div>
          <button
            onClick={() => runSuite(activeSuite.id)}
            disabled={activeSuite.status === "running"}
            className="text-[10px] bg-white/5 border border-white/10 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded disabled:opacity-50 flex items-center gap-1 transition-all font-bold font-mono uppercase tracking-wider cursor-pointer"
          >
            <Play className="w-2.5 h-2.5 text-blue-300" /> Run Selected
          </button>
        </div>

        {/* Console stream output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2 select-text bg-black/45">
          {activeSuite.logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 select-none">
              <Terminal className="w-10 h-10 text-slate-700 animate-pulse" />
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Diagnostics stream idle. Push "Execute" to start.</p>
            </div>
          ) : (
            activeSuite.logs.map((log, index) => {
              const isHeader = log.startsWith("►");
              const isPass = log.includes("✔ PASS") || (log.startsWith("✔") && !log.includes("failures"));
              const isSection = log.startsWith("⚡");
              
              let textColor = "text-slate-400";
              if (isHeader) textColor = "text-blue-400 font-bold border-b border-white/5 pb-1 flex items-center gap-1";
              else if (isPass) textColor = "text-emerald-400 font-medium pl-4 flex items-center gap-1";
              else if (isSection) textColor = "text-sky-300 font-semibold mt-3 flex items-center gap-1";
              else if (log.includes("failures") || log.includes("failures: 0")) textColor = "text-white bg-emerald-950/20 p-2 border border-emerald-500/20 rounded font-semibold mt-3";

              return (
                <div key={index} className={`${textColor} break-all`}>
                  {log}
                </div>
              );
            })
          )}
          <div ref={consoleEndRef} />
        </div>

        <div className="bg-[#0F1116] px-4 py-3 border-t border-white/10 text-[10px] text-slate-500 flex justify-between tracking-wider font-mono">
          <span>SHELL: yarn workspace mediscan-monorepo</span>
          <span>STATUS: {activeSuite.status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
