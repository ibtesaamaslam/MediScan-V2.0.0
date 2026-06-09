import React, { useState } from "react";
import { Camera, Image as ImageIcon, Sparkles, AlertOctagon, HelpCircle, Activity, Heart, Sliders, ShieldCheck } from "lucide-react";
import { ScanSample } from "../types";

const SAMPLES: ScanSample[] = [
  {
    id: "sample-skin",
    type: "skin",
    title: "Skin Screening: Scaly Lesion on Extensor Elbow",
    conditionName: "Psoriasis Vulgaris",
    confidence: 0.92,
    severity: "moderate",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400",
    description: "Well-circumscribed salmon-pink plaque covered with characteristic silvery scaly plaques. No indicators of regional infection or systemic fever.",
    clinicalRules: "Standard localized hydration guidelines. Recommend outpatient specialist referral within 21 days."
  },
  {
    id: "sample-eye",
    type: "eye",
    title: "Ophthalmic Screening: Bilateral Pupil Turbidity",
    conditionName: "Immature Senile Cataract",
    confidence: 0.88,
    severity: "high",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=400",
    description: "Progressive, painless decrease in distance visual acuity. Lens displays generalized subcapsular nuclear sclerosis under uniform focal lighting fields.",
    clinicalRules: "Schedule formal visual profiling. Arrange non-emergency cataract outpatient appointment."
  },
  {
    id: "sample-oral",
    type: "oral",
    title: "Oral Cavity Scan: White Patch on Lateral Tongue",
    conditionName: "Leukoplakia",
    confidence: 0.65, // Low confidence -> Abstention
    severity: "high",
    image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=400",
    description: "Adherent thick, white plaque on mucosal tissues. Patient is a chronic tobacco user. Scan quality flagged for movement shadow blur.",
    clinicalRules: "ABSTENTION: Prediction falls below clinical confidence threshold of 0.75. Poor illumination field. Re-capture required."
  },
  {
    id: "sample-wound",
    type: "wound",
    title: "Wound Screening: Distal End Plantar Metatarsal Ulcer",
    conditionName: "Neuropathic Diabetic Foot Ulcer",
    confidence: 0.95, // High but Diabetes = Critical Safety Exclusion
    severity: "urgent",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
    description: "Deep, punched-out plantar ulcer surrounded by secondary hyperkeratosis. Patient has a confirmed 15-year diagnosis of Type II Diabetes Mellitus.",
    clinicalRules: "Bypasses scanner boundaries. Patient meets Diabetic Foot Ulcer exclusion. Transfer immediately to emergency vascular specialists."
  }
];

export default function DiagnosticSandbox() {
  const [selectedSample, setSelectedSample] = useState<ScanSample>(SAMPLES[0]);
  const [exposure, setExposure] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [focus, setFocus] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanSample | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScanResult(selectedSample);
    }, 1500);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "urgent": return "bg-red-500/15 text-red-400 border border-red-500/30 font-bold uppercase tracking-wider";
      case "high": return "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold uppercase tracking-wider";
      default: return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium uppercase tracking-wider";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 h-full overflow-y-auto">
      {/* Visual Camera Canvas View */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <span>On-Device Clinical Scanner</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate on-device camera feeds. Adjust exposure, focus calibration, select clinical case presets, and evaluate real-time outputs.
          </p>
        </div>

        {/* Preset Selects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SAMPLES.map(sample => {
            const isSel = selectedSample.id === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  setScanResult(null);
                }}
                className={`p-2.5 rounded border text-left transition duration-150 ${
                  isSel
                    ? "bg-white/5 border-blue-500 shadow shadow-blue-500/10 text-white"
                    : "bg-[#0F1116]/80 border-white/5 text-slate-400 hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-blue-400">
                  {sample.type}
                </span>
                <span className="text-xs font-semibold line-clamp-1 block mt-1">{sample.conditionName}</span>
              </button>
            );
          })}
        </div>

        {/* Simulated Camera Feed Container */}
        <div className="relative bg-black rounded border border-white/10 height-[320px] overflow-hidden aspect-video flex items-center justify-center">
          {/* Main Visual under filter manipulation */}
          <img
            src={selectedSample.image}
            alt={selectedSample.title}
            className="w-full h-full object-cover select-none transition-all duration-150"
            referrerPolicy="no-referrer"
            style={{
              filter: `brightness(${exposure * 2}%) contrast(${contrast * 2}%) blur(${(100 - focus) / 10}px)`
            }}
          />

          {/* Alignment Crosshairs overlaid */}
          <div className="absolute inset-0 border-[24px] border-black/30 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-dashed border-blue-400/50 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
            </div>
            
            {/* Top illumination warning */}
            {exposure < 35 && (
              <div className="absolute top-4 bg-red-950/85 border border-red-500/30 px-3 py-1.5 rounded text-[10px] text-red-400 font-mono tracking-wider uppercase">
                ⚠️ ALERT: UNDER-EXPOSED ILLUMINATION FIELDS
              </div>
            )}
            {focus < 65 && (
              <div className="absolute top-4 bg-red-950/85 border border-red-500/30 px-3 py-1.5 rounded text-[10px] text-red-400 font-mono tracking-wider uppercase">
                ⚠️ ALERT: DEFICIENT MACRO FOCUS DETECTED
              </div>
            )}
          </div>

          {/* Action trigger button */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center">
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="px-6 py-2.5 bg-blue-600 border border-blue-500/30 text-xs font-bold rounded shadow-lg shadow-blue-500/10 text-white flex items-center gap-1.5 duration-150 disabled:opacity-50 uppercase tracking-widest font-mono cursor-pointer animate-none"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin text-blue-300" />
                  <span>Computing On-Device Inference...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-bounce text-blue-300" />
                  <span>Initiate Diagnostic Loop</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Exposure sliders */}
        <div className="p-4 bg-[#0F1116] border border-white/10 rounded space-y-3">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">Exposure & Focus Calibration controls</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>EXPOSURE COMPENSATION</span>
              <span className="text-blue-400 font-bold">{exposure}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={exposure}
              onChange={(e) => setExposure(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>CONTRAST FIELD BALANCE</span>
              <span className="text-blue-400 font-bold">{contrast}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>LENS POSITIONING (FOCUS)</span>
              <span className="text-blue-400 font-bold">{focus}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Embedded results card card mapping */}
      <div className="lg:w-1/2 flex flex-col justify-start">
        {!scanResult ? (
          <div className="border border-dashed border-white/10 bg-[#0F1116]/40 rounded p-12 text-center flex flex-col items-center justify-center gap-4 h-full">
            <Activity className="w-12 h-12 text-slate-700 animate-pulse" />
            <div>
              <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Awaiting Diagnostic Signal</h4>
              <p className="text-slate-500 text-xs mt-2 max-w-sm leading-relaxed font-sans">
                Aim the crosshair alignment guide accurately at the skin lesion, iris boundaries, or wound margins, adjust the focus slider, and tap initiate scan.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#0F1116] border border-white/10 rounded p-6 space-y-5 shadow relative overflow-hidden flex flex-col h-full self-start w-full">
            
            {/* Top diagnostic metadata */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-blue-400 uppercase tracking-widest block">
                  On-Device Diagnostics Registry
                </span>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {scanResult.title}
                </h3>
              </div>
              <span className={`text-[11px] font-mono px-2.5 py-1 rounded border ${getSeverityBadge(scanResult.severity)}`}>
                {scanResult.severity}
              </span>
            </div>

            {/* If low confidence triggers Abstention */}
            {scanResult.confidence < 0.75 ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertOctagon className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Clinical Abstention Condition Triggered</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The model classification confidence of <strong>{Math.round(scanResult.confidence * 100)}%</strong> is below the critical diagnostic confidence threshold (0.75). No screening data is recorded or cached to prevent false positive interpretations.
                </p>
                <div className="border-t border-red-500/10 pt-2.5 text-[10px] text-red-400 font-mono">
                  ACTION: Please clean the camera lens, calibrate focus alignment metrics, and re-capture.
                </div>
              </div>
            ) : scanResult.id === "sample-wound" ? (
              /* If systemic exclusion diabetic clinical rules check trigger */
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3 animate-pulse">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertOctagon className="w-5 h-5 animate-bounce" />
                  <span className="text-sm font-bold uppercase tracking-wider">CRITICAL SYSTEMIC RISK BYPASS</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This patient is flagged with systemic diabetic conditions alongside foot ulcers. In accordance with clinical rule <code>evaluateClinicalSafety</code>, the model predictions are bypassed. Direct physical hospital transfer is required immediately.
                </p>
                <div className="border-t border-red-500/20 pt-2.5 flex flex-col gap-1.5 text-[10px] font-mono text-red-400">
                  <div>🚨 ACTIONS PRESCRIBED IN WORKSPACE RULES:</div>
                  <div className="pl-3">• Direct immediately to specialist Vascular/ER trauma units.</div>
                  <div className="pl-3">• Instruct care providers on localized sanitization and pressure offloading.</div>
                </div>
              </div>
            ) : (
              /* Success prediction outputs */
              <div className="space-y-4">
                {/* Confidence bar chart */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-1.5">
                    <span>CLASSIFICATION CONFIDENCE</span>
                    <span className="text-blue-400 font-bold">{Math.round(scanResult.confidence * 100)}%</span>
                  </div>
                  <div className="bg-white/5 h-2.5 rounded overflow-hidden w-full border border-white/10">
                    <div className="bg-blue-500 h-full rounded transition-all duration-500 shadow animate-none" style={{ width: `${scanResult.confidence * 100}%` }}></div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded space-y-2">
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Identified Pathology:</div>
                  <h4 className="text-base font-extrabold text-[#E2E8F0]">{scanResult.conditionName}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1 font-sans">{scanResult.description}</p>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Clinical Care Guidelines:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{scanResult.clinicalRules}</p>
                </div>

                {/* Local storage checks */}
                <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>ON-DEVICE ORT ENGINE IN PLACE • EXPO SANDBOX VERIFIED</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
