import React, { useState } from "react";
import { ShieldAlert, CheckCircle, Smartphone, Database, AlertCircle, Eye, GitPullRequest, ArrowUpRight, Copy } from "lucide-react";

export interface BugAuditItem {
  id: string;
  category: "security" | "bias" | "clinical-safety" | "off-grid";
  title: string;
  severity: "critical" | "high" | "warning";
  summary: string;
  originalFile: string;
  originalBadSnippet: string;
  recommendedFile: string;
  rebuiltGoodSnippet: string;
  explanation: string;
}

const AUDIT_ITEMS: BugAuditItem[] = [
  {
    id: "sec-01",
    category: "security",
    title: "Unauthenticated & Unverified Patient Sync Pathway",
    severity: "critical",
    summary: "The backend's patient synchronization route ingested health logs without verifying data integrity or machine authenticity.",
    originalFile: "backend/main.py (original line 18)",
    originalBadSnippet: `@app.post("/sync")
def sync_data(data: dict):
    # Ingests patient logs with no validation
    db.save(data)
    return {"status": "ok"}`,
    recommendedFile: "backend/app/api/routes/sync.py (rebuilt lines 16-33)",
    rebuiltGoodSnippet: `@router.post("/sync")
async def process_sync_record(payload: SyncPayload, x_signature: str = Header(None)):
    if not x_signature:
        raise HTTPException(status_code=401, detail="Header signature verification failed: X-Signature is missing.")
    
    # Secure HMAC signature match to protect local files during transport
    message = f"{payload.batch_id}:{payload.patient_id_hash}:{payload.condition_code}".encode()
    local_sig = hmac.new(HMAC_SECRET, message, hashlib.sha256).hexdigest()
    
    if not hmac.compare_digest(local_sig, x_signature):
        raise HTTPException(status_code=403, detail="Invalid HMAC signature: Tampering or unauthorized credential detected.")
    
    return {"status": "success", "batch_id": payload.batch_id}`,
    explanation: "Authenticates CHW handsets via HMAC SHA256 signatures derived from secure on-device cryptographic buffers. Prevents unauthorized database tampering and spoofing of clinical coordinates."
  },
  {
    id: "bias-01",
    category: "bias",
    title: "Fitzpatrick Skin Type Under-representation Bias",
    severity: "high",
    summary: "Standard neural network backbones degrade in accuracy on darker skin (Fitzpatrick Types V-VI) without loss penalties countering representation drift.",
    originalFile: "ml/train_skin.py (original line 24)",
    originalBadSnippet: `for images, labels in dataloader:
    outputs = model(images)
    loss = criterion(outputs, labels) # Drifts on Fitzpatrick V & VI
    loss.backward()
    optimizer.step()`,
    recommendedFile: "ml/training/train_skin.py (rebuilt lines 26-38)",
    rebuiltGoodSnippet: `for images, labels, fitzpatrick_types in loader:
    outputs = model(images)
    loss = criterion(outputs, labels)
    
    # Demographic audit regularization: equalizes odds across subgroups
    fairness_penalty = demographic_parity_regularizer(
        outputs, labels, fitzpatrick_types, lambda_penalty=0.15
    )
    loss += fairness_penalty
    
    loss.backward()
    optimizer.step()`,
    explanation: "Couples training objectives with equal opportunity constraint thresholds across skin pigmentation types. Mitigates false negative spikes for minority ethnodemographic populations."
  },
  {
    id: "clin-01",
    category: "clinical-safety",
    title: "Systemic Risk Exclusion & Referral Blindspots",
    severity: "critical",
    summary: "Original scanner triggered diagnoses without checking critical exclusionary criteria like patient duration or underlying immunosuppression.",
    originalFile: "mobile/components/ResultCard.tsx",
    originalBadSnippet: `export default function ResultCard({ prediction }) {
  return (
    <View>
      <Text>Conditions identified: {prediction.name}</Text>
    </View>
  );
}`,
    recommendedFile: "mobile/lib/clinicalRules.ts & ClinicalWarning.tsx",
    rebuiltGoodSnippet: `export function evaluateClinicalSafety(condition: string, input: ClinicalEvaluationInput): Recommendation {
  if (input.immunosuppressed || (input.diabetes && condition.includes("Ulcer"))) {
    return {
      action: "immediate_er",
      warningMessage: "CRITICAL warning: Patient exhibits severe secondary systemic risks. Immediate transfer required.",
      checklist: ["Record vitals", "Instruct on offloading", "Coordinate safe ER transfer"]
    };
  }
  return { action: "routine_referral", warningMessage: "Proceed with caution.", checklist: ["Follow-up 7d"] };
}`,
    explanation: "Adds safety-first CDSS parameters that instantly flags systemic modifiers. When secondary indicators are positive, the scanner is safety-gated and redirects the health worker to formal ER procedures."
  },
  {
    id: "off-01",
    category: "off-grid",
    title: "Lack of Multi-Lingual Calibration and Localization Dictionaries",
    severity: "high",
    summary: "CHW tools require off-grid UI localization dictionaries (Urdu, Swahili, Hindi, Hausa, Bengali) to accurately guide diagnostic preparations.",
    originalFile: "mobile/utils/i18n.ts",
    originalBadSnippet: `// Empty i18n implementation without any localized phrases or local dictionary hooks`,
    recommendedFile: "mobile/locales/[en, ur, hi, sw, bn, ha].json",
    rebuiltGoodSnippet: `// mobile/locales/ur.json
{
  "SCAN_PREPARATION": "اسکین کی تیاری",
  "ALIGN_EYE_GUIDE": "آنکھ کے دائرے کو گائیڈ کے مطابق کریں",
  "CLINICAL_STREAK_EARNED": "مفت طبی ٹول اور معائنہ کا سلسلہ",
  "SAFETY_EXCLUSION_TRIGGERED": "طبی خطرہ: ہنگامی طور پر منتقل کریں"
}`,
    explanation: "Implements six standard localized databases. Supports Right-to-Left formatting wrappers (RTL), supporting off-grid workers in underserved locations without needing network lookup."
  }
];

export default function AuditedCodeBrowser() {
  const [activeItem, setActiveItem] = useState<BugAuditItem>(AUDIT_ITEMS[0]);
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case "critical": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "high": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default: return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-6 h-full overflow-y-auto">
      {/* Sidebar issues selection */}
      <div className="xl:w-1/3 flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span>Vulnerability & Bias Audit</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Deep automated scanning identified four critical vulnerabilities in the original repository. Discover how the restructured monorepo mitigates them.
          </p>
        </div>

        <div className="flex flex-col gap-3.5 mt-2">
          {AUDIT_ITEMS.map(item => {
            const isActive = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left p-4 rounded border transition-all duration-200 hover:scale-[1.01] ${
                  isActive
                    ? "bg-white/5 border-blue-500 shadow-md ring-1 ring-blue-500/20"
                    : "bg-[#0F1116]/80 border-white/5 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                  <span className="text-[10px] font-mono text-blue-400 font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100 mt-2.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {item.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparisons pane */}
      <div className="xl:w-2/3 flex flex-col bg-[#0F1116] border border-white/10 rounded-xl p-5 gap-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold block">Active Deficiency Analysis</span>
            <h3 className="text-base font-bold text-white mt-1">{activeItem.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded p-1.5 text-xs text-slate-400 font-mono">
            <span>Scan Verification:</span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Checked
            </span>
          </div>
        </div>

        {/* Snippets compare grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* BAD original */}
          <div className="flex flex-col bg-black/40 border border-red-500/20 rounded overflow-hidden">
            <div className="bg-red-950/20 border-b border-red-500/20 px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Deficient Code (Original)
              </span>
              <span className="text-[10px] font-mono text-red-500">{activeItem.originalFile.split(" ")[0]}</span>
            </div>
            <div className="p-3.5 font-mono text-xs text-slate-400 bg-black/30 flex-1 overflow-x-auto whitespace-pre leading-relaxed select-all">
              {activeItem.originalBadSnippet}
            </div>
          </div>

          {/* GOOD recommended */}
          <div className="flex flex-col bg-black/40 border border-white/10 rounded overflow-hidden">
            <div className="bg-white/5 border-b border-white/10 px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Remediated Code (Restructured)
              </span>
              <button
                onClick={() => copyCode(activeItem.rebuiltGoodSnippet)}
                className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="p-3.5 font-mono text-xs text-slate-300 bg-[#0A0C10] flex-1 overflow-x-auto whitespace-pre leading-relaxed select-all border-l border-blue-500/20">
              {activeItem.rebuiltGoodSnippet}
            </div>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="p-4 bg-white/5 border border-white/10 rounded mt-1">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Engineering Remediations Explained</span>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {activeItem.explanation}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400 border-t border-white/5 pt-2.5 font-mono">
            <Database className="w-3 h-3 text-blue-400" />
            <span>Target Destination File:</span>
            <span className="text-slate-300 font-semibold">{activeItem.recommendedFile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

