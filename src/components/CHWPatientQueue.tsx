import React, { useState } from "react";
import { Users, ShieldAlert, CheckCircle, RefreshCw, Languages, Search, HelpCircle, FileText, ArrowRight } from "lucide-react";
import { Patient } from "../types";

const INITIAL_PATIENTS: Patient[] = [
  { id: "PT-81", name: "Fatima Bi", age: 48, gender: "F", fitzpatrickSkinType: 5, condition: "Psoriasis Vulgaris", severity: "moderate", status: "screened", diagnosedAt: "10 mins ago" },
  { id: "PT-82", name: "Anand Sharma", age: 52, gender: "M", fitzpatrickSkinType: 4, condition: "Immature Senile Cataract", severity: "high", status: "screened", diagnosedAt: "1 hour ago" },
  { id: "PT-83", name: "Kofi Mensah", age: 36, gender: "M", fitzpatrickSkinType: 6, condition: "Leukoplakia (Abstained)", severity: "high", status: "screened", diagnosedAt: "3 hours ago" },
  { id: "PT-84", name: "Suresh Patel", age: 64, gender: "M", fitzpatrickSkinType: 3, status: "pending" },
  { id: "PT-85", name: "Aisha Yusuf", age: 29, gender: "F", fitzpatrickSkinType: 5, status: "pending" }
];

const LOCALIZED_STRINGS: Record<string, Record<string, string>> = {
  en: {
    SCAN_TITLE: "Scan Registration",
    PREPARATION: "Position the lens carefully and match patient boundaries.",
    SYNC_SUCCESS: "HMAC Secure Sync Complete",
    STREAK: "Operational Streak Active",
    SAFETY: "Clinical Decision Warning"
  },
  ur: {
    SCAN_TITLE: "اسکین کی رجسٹریشن",
    PREPARATION: "لینس کو احتیاط سے درست مقام پر رکھیں اور مریض کی جلد کے دائرے کو گائیڈ کے مطابق کریں۔",
    SYNC_SUCCESS: "حفاظتی دستخط کے ساتھ سنکرونائزیشن مکمل ہو گئی ہے",
    STREAK: "روزانہ کا کام مکمل ہے",
    SAFETY: "طبی خطرہ کی تنبیہ"
  },
  sw: {
    SCAN_TITLE: "Usajili wa Kuchunguza",
    PREPARATION: "Weka lenzi kwa makini mechi na mipaka ya mgonjwa.",
    SYNC_SUCCESS: "Usawazishaji wa Usalama wa HMAC Umekamilika",
    STREAK: "Mfululizo wa Kazi Unafanya kazi",
    SAFETY: "Onyo la Maamuzi ya Kliniki"
  },
  hi: {
    SCAN_TITLE: "स्कैन पंजीकरण",
    PREPARATION: "लेंस को ध्यान से रखें और रोगी की त्वचा की सीमाओं का मिलान करें।",
    SYNC_SUCCESS: "HMAC सुरक्षित सिंक पूर्ण",
    STREAK: "कार्यवाही क्रम सक्रिय",
    SAFETY: "नैदानिक निर्णय चेतावनी"
  }
};

export default function CHWPatientQueue() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [lang, setLang] = useState<"en" | "ur" | "sw" | "hi">("ur");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const startHmacSync = () => {
    setIsSyncing(true);
    setSyncStatus("Validating dynamic handset SSL tokens...");
    
    setTimeout(() => {
      setSyncStatus("Computing HMAC checksum on patient data hash buffers...");
      
      setTimeout(() => {
        setSyncStatus("Synchronizing with FastAPI backend secure registry...");
        
        setTimeout(() => {
          setPatients(prev => prev.map(p => p.status === "screened" ? { ...p, status: "synced" } : p));
          setIsSyncing(false);
          setSyncStatus("Registry updated successfully. HMAC check completed.");
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/25";
      case "screened": return "text-blue-400 bg-blue-500/10 border-blue-500/25";
      default: return "text-slate-500 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-6 h-full overflow-y-auto">
      {/* Off-grid CHW queue list */}
      <div className="xl:w-3/5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Patient Queue & Sync Tracker</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Community Health Workers track patients offline in remote areas and sync securely using local HMAC keys once cellular coverage is reached.
            </p>
          </div>
          
          <button
            onClick={startHmacSync}
            disabled={isSyncing || !patients.some(p => p.status === "screened")}
            className="py-2.5 px-4 bg-blue-600 border border-blue-500/30 hover:bg-blue-750 disabled:opacity-50 text-xs font-bold rounded text-white flex items-center justify-center gap-1.5 transition duration-150 shadow shadow-blue-500/10 shrink-0 select-none uppercase tracking-widest font-mono cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Secure HMAC Sync</span>
          </button>
        </div>

        {/* Sync tracking output if active */}
        {syncStatus && (
          <div className="p-3.5 bg-blue-950/15 border border-blue-500/25 rounded text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <span className="text-slate-300 font-medium flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              {syncStatus}
            </span>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wilder bg-[#0F1116] px-2 py-0.5 rounded border border-white/10">
              SECRET_KEY_SHA256
            </span>
          </div>
        )}

        {/* Searching queue */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search patient record queue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F1116] border border-white/10 rounded py-3 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-blue-500 placeholder-slate-500 transition-all duration-150 font-mono"
          />
        </div>

        {/* Patient queue grid list */}
        <div className="flex flex-col gap-2.5">
          {filteredPatients.map(pat => {
            return (
              <div key={pat.id} className="bg-[#0F1116]/80 border border-white/5 hover:border-white/10 rounded p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#0F1116] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-blue-400">
                    {pat.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-100">{pat.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Age {pat.age} • Gender {pat.gender} • Fitzpatrick Skin {pat.fitzpatrickSkinType || "N/A"}
                    </p>
                  </div>
                </div>

                {pat.status === "pending" ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border border-dashed border-white/10 text-slate-500 bg-white/5 self-start sm:self-center">
                    Awaiting Scan
                  </span>
                ) : (
                  <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 pl-13 sm:pl-0">
                    <span className="text-[10px] font-bold text-slate-300 block">
                      {pat.condition}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border text-center ${getStatusBadge(pat.status)}`}>
                      {pat.status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Localized multi-lingual dictionary display */}
      <div className="xl:w-2/5 flex flex-col bg-[#0F1116] border border-white/10 rounded p-5 gap-4 h-full self-start w-full">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Localized CDSS Dictionaries</h3>
          </div>
          
          <div className="flex gap-1.5">
            {["en", "ur", "sw", "hi"].map(l => (
              <button
                key={l}
                onClick={() => setLang(l as any)}
                className={`text-[10px] px-2.5 py-1 rounded uppercase font-bold transition font-mono ${
                  lang === l
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          The reorganized template establishes standard translation dictionaries inside <code>mobile/locales/*</code>. Test selected localization configurations below:
        </p>

        {/* Translation layout demonstration and labels */}
        <div className="space-y-4 mt-2">
          <div className="bg-black/40 border border-white/5 rounded p-4 space-y-3.5">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider">REGISTRATION SCAN_TITLE</span>
              <p className="text-sm font-semibold text-slate-100 mt-1" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                {LOCALIZED_STRINGS[lang].SCAN_TITLE}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider">PREPARATION MESSAGE</span>
              <p className="text-xs text-slate-300 leading-relaxed mt-1" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                {LOCALIZED_STRINGS[lang].PREPARATION}
              </p>
            </div>

            <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>SYNC_SUCCESS STATUS MESSAGE:</span>
              <span className="text-emerald-500 font-semibold" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                {LOCALIZED_STRINGS[lang].SYNC_SUCCESS}
              </span>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded">
            <div className="flex items-start gap-2.5">
              <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Patient Report Generator</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
                  The restructured code in <code>mobile/app/reports/pdf.tsx</code> auto-embeds these localized strings directly into PDF summaries, outputting readable printable charts for remote practitioners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
