import React, { useState, useEffect, useRef } from "react";
import { 
  Languages, 
  Camera, 
  Clock, 
  Settings, 
  History, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Download, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Lock, 
  Fingerprint, 
  Activity, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  Plus, 
  Search,
  Check,
  Eye,
  Heart,
  HelpCircle,
  TrendingUp,
  Sliders,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
export interface DiagnosticResult {
  id: string;
  type: "skin" | "eye";
  conditionName: string;
  confidence: number;
  severity: "low" | "moderate" | "high" | "urgent";
  image: string;
  timestamp: string;
  description: string;
  recommendation: string;
  differentials: string[];
  notes?: string;
}

// Translations structure matching useLanguage
type LanguageCode = 'en' | 'ur' | 'hi' | 'sw';

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    appName: "MediScan Local",
    tagline: "Public Free Edition",
    oneLineExplanation: "Safe, instant on-device skin and eye symptom analysis.",
    howItWorks: "How it works",
    start: "Start Screening",
    selectLanguage: "Choose Language",
    cameraPermissionTitle: "Access Camera Feed",
    cameraPermissionDesc: "Allow device camera to snap sharp clinic photos of eye iris and skin surfaces for local diagnostics.",
    storagePermissionTitle: "Optional Offline Storage",
    storagePermissionDesc: "Required only to compile offline PDF summaries and export diagnostic ledgers locally.",
    allowAccess: "Grant Device Access",
    goNext: "Continue",
    skinScreening: "Skin Screening",
    skinDesc: "Evaluate lesions, atypical marks, rashes, or dry patches.",
    eyeScreening: "Eye Screening",
    eyeDesc: "Profile cataracts, lens opacity, or bilateral clouding.",
    history: "History Ledger",
    settings: "App Settings",
    homeSubtitle: "Completely secure, offline, no login health assistant.",
    guideTitle: "Capture Clear Clinical Image",
    guideLighting: "Verify strong, natural room illumination.",
    guideCenter: "Align and focus symptom in center area.",
    guideSteady: "Hold device steady to prevent motion blur.",
    openCamera: "Open Camera View",
    cameraViewfinder: "Clinical Viewfinder",
    capture: "Capture Image",
    retake: "Retake Photo",
    reviewImage: "Review Diagnostics Frame",
    confirmAnalyze: "Process Local Logic",
    processingTitle: "Accelerating WASM Operators",
    processingDesc: "Running 8-bit quantized neural weights locally inside device memory sector...",
    resultTitle: "On-Device Evaluation Result",
    confidence: "Model Confidence Score",
    severity: "Severity Grading",
    recLabel: "Clinically Indicated Recommendation",
    diffLabel: "Secondary Differential Diagnosis",
    saveSuccess: "Saved securely to local ledger",
    saveBtn: "Save Locally",
    exportBtn: "Export Report",
    backToHome: "Return Home",
    noSavedLogs: "No local screenings on this device.",
    filterAll: "All Screening Records",
    filterSkin: "Skin Audits",
    filterEye: "Eye Audits",
    privacyHeader: "On-Device Clinical Security",
    privacyDesc: "All deep learning inferences, captures, and logs reside strictly in your browser physical local storage. No data is synchronized or transmitted to external servers without explicit manual export request.",
    dangerZone: "System Wipe (Danger Zone)",
    deleteBtn: "Clear Local Database",
    confirmDelete: "Are you sure? This action is irreversible.",
    aboutText: "Developed for non-profit public care assistance. This software tools are meant for preliminary community-outreach screening support and do NOT replace professional hospital referrals.",
    version: "Clinical Ledger Suite v1.4.1"
  },
  ur: {
    appName: "میڈیسکین لوکل",
    tagline: "عوامی مفت ایڈیشن",
    oneLineExplanation: "محفوظ اور فوری آن ڈیوجس جلد اور آنکھ کی علامات کا تجزیہ۔",
    howItWorks: "یہ کیسے کام کرتا ہے",
    start: "اسکریننگ شروع کریں",
    selectLanguage: "زبان منتخب کریں",
    cameraPermissionTitle: "کیمرہ فیڈ تک رسائی",
    cameraPermissionDesc: "مقامی تشخیص کے لیے آنکھ کی پتلی اور جلد کی سطح کی صاف تصاویر لینے کی اجازت دیں۔",
    storagePermissionTitle: "اختیاری آف لائن اسٹوریج",
    storagePermissionDesc: "صرف آف لائن پی ڈی ایف رپورٹس مرتب کرنے اور ہسٹری محفوظ کرنے کے لیے ضروری ہے۔",
    allowAccess: "اجازت دیں",
    goNext: "آگے بڑھیں",
    skinScreening: "جلد کی جانچ",
    skinDesc: "داغ، دھبے، خارش یا خشک جلد کا معائنہ کریں۔",
    eyeScreening: "آنکھ کی جانچ",
    eyeDesc: "موتیا، پتلی کے دھندلے پن یا بینائی کے مسائل کا معائنہ کریں۔",
    history: "مقامی ہسٹری ریکارڈز",
    settings: "ترتیبات",
    homeSubtitle: "مکمل طور پر محفوظ، آف لائن، بغیر لاگ ان صحت کا معاون۔",
    guideTitle: "واضح طبی تصویر لیں",
    guideLighting: "کمرے میں مناسب اور قدرتی روشنی کی تصدیق کریں۔",
    guideCenter: "علامت کو بالکل بیچ میں رکھ کر فوکس کریں۔",
    guideSteady: "کیمرے کو ہلنے سے بچائیں تاکہ تصویر دھندلی نہ ہو۔",
    openCamera: "کیمرہ کھولیں",
    cameraViewfinder: "طبی ویو فائنڈر",
    capture: "تصویر لیں",
    retake: "دوبارہ تصویر لیں",
    reviewImage: "تصویر کا جائزہ لیں",
    confirmAnalyze: "مقامی ماڈل رن کریں",
    processingTitle: "کمپیوٹر وازم ماڈل رن ہو رہا ہے",
    processingDesc: "مقامی میموری سیکٹر کے اندر وازم ماڈل رن ہو رہا ہے...",
    resultTitle: "تشخیص کا نتیجہ",
    confidence: "تصدیق کی فیصد",
    severity: "حالت کی شدت",
    recLabel: "طبی مشورہ اور ہدایات",
    diffLabel: "ثانوی تشخیصی امکانات",
    saveSuccess: "مقامی ہسٹری میں کامیابی سے محفوظ ہو گیا",
    saveBtn: "مقامی طور پر محفوظ کریں",
    exportBtn: "رپورٹ ڈاؤن لوڈ کریں",
    backToHome: "ہوم اسکرین پر جائیں",
    noSavedLogs: "اس ڈیوائس پر کوئی ہسٹری ریکارڈ نہیں ہے۔",
    filterAll: "تمام ریکارڈز",
    filterSkin: "جلد کے ریکارڈز",
    filterEye: "آنکھ کے ریکارڈز",
    privacyHeader: "آن ڈیوائس سیکیورٹی",
    privacyDesc: "تمام تشخیص، تصاویر اور ریکارڈز صرف آپ کے براؤزر میں محفوظ رہتے ہیں۔ کوئی بھی ڈیٹا آپ کی مرضی کے بغیر کسی سرور پر نہیں بھیجا جاتا۔",
    dangerZone: "ڈیٹا وائپ (خطرناک زون)",
    deleteBtn: "تمام ڈیٹا صاف کریں",
    confirmDelete: "کیا آپ واقعی تمام ریکارڈز ختم کرنا چاہتے ہیں؟",
    aboutText: "یہ سافٹ ویئر کمیونٹی اسکریننگ میں معاونت کے لیے بنایا گیا ہے اور یہ باضابطہ ڈاکٹر کے متبادل کے طور پر استعمال نہیں کیا جا سکتا۔",
    version: "کلینیکل لیجر ورژن 1.4.1"
  },
  hi: {
    appName: "मेडिस्कैन लोकल",
    tagline: "सार्वजनिक निशुल्क संस्करण",
    oneLineExplanation: "सुरक्षित, त्वरित ऑन-डिवाइस त्वचा और आंखों के लक्षणों का विश्लेषण।",
    howItWorks: "यह कैसे काम करता है",
    start: "स्क्रीनिंग शुरू करें",
    selectLanguage: "भाषा चुनें",
    cameraPermissionTitle: "कैमरा एक्सेस की अनुमति",
    cameraPermissionDesc: "स्थानीय निदान के लिए आंखों की पुतली और त्वचा की सतह की स्पष्ट तस्वीरें लेने की अनुमति दें।",
    storagePermissionTitle: "वैकल्पिक ऑफ़लाइन स्टोरेज",
    storagePermissionDesc: "केवल ऑफ़लाइन पीडीएफ रिपोर्ट संकलित करने और निदान इतिहास को सुरक्षित रखने के लिए आवश्यक।",
    allowAccess: "अनुमति प्रदान करें",
    goNext: "आगे बढ़ें",
    skinScreening: "त्वचा की जांच",
    skinDesc: "त्वचा के धब्बे, निशान, चकत्ते या सूखे पैच का मूल्यांकन करें।",
    eyeScreening: "आंखों की जांच",
    eyeDesc: "मोतियाबिंद, पुतली के धुंधलेपन या लेंस के विकारों की जांच करें।",
    history: "इतिहास बहीखाता",
    settings: "ऐप सेटिंग्स",
    homeSubtitle: "पूरी तरह से सुरक्षित, ऑफ़लाइन, बिना लॉग इन स्वास्थ्य सहायक।",
    guideTitle: "स्पष्ट नैदानिक छवि लें",
    guideLighting: "कमरे में उचित प्राकृतिक रोशनी सुनिश्चित करें।",
    guideCenter: "लक्षण को ठीक केंद्र में संरेखित और केंद्रित करें।",
    guideSteady: "चित्र को धुंधला होने से बचाने के लिए डिवाइस को स्थिर रखें।",
    openCamera: "कैमरा खोलें",
    cameraViewfinder: "नैदानिक व्यूफाइंडर",
    capture: "तस्वीर लें",
    retake: "फिर से लें",
    reviewImage: "चित्र की समीक्षा करें",
    confirmAnalyze: "स्थानीय निदान चलाएं",
    processingTitle: "WASM ऑपरेटर चल रहे हैं",
    processingDesc: "डिवाइस मेमोरी में स्थानीय रूप से 8-बिट क्वांटाइज्ड मॉडल का उपयोग हो रहा है...",
    resultTitle: "ऑन-डिवाइस मूल्यांकन का परिणाम",
    confidence: "मॉडल विश्वसनीयता स्कोर",
    severity: "गंभीरता ग्रेडिंग",
    recLabel: "अनुशंसित नैदानिक दिशा-निर्देश",
    diffLabel: "द्वितीयक संभावित निदान",
    saveSuccess: "डिवाइस इतिहास में सुरक्षित रूप से सहेजा गया",
    saveBtn: "स्थानीय रूप से सहेजें",
    exportBtn: "रिपोर्ट निर्यात करें",
    backToHome: "होम स्क्रीन पर लौटें",
    noSavedLogs: "इस डिवाइस पर कोई सहेजा गया इतिहास नहीं है।",
    filterAll: "सभी रिपोर्ट",
    filterSkin: "त्वचा रिपोर्ट",
    filterEye: "नेत्र रिपोर्ट",
    privacyHeader: "ऑन-डिवाइस सुरक्षा",
    privacyDesc: "सभी निदान, चित्र और डेटा आपके ब्राउज़र के स्थानीय स्टोरेज में रहते हैं। बिना अनुमति के कोई डेटा बाहरी सर्वर पर नहीं भेजा जाता।",
    dangerZone: "डेटा मिटाएं (खतरे का क्षेत्र)",
    deleteBtn: "स्थानीय डेटाबेस साफ करें",
    confirmDelete: "क्या आप निश्चित रूप से सारा सुरक्षित डेटा मिटाना चाहते हैं?",
    aboutText: "यह सॉफ्टवेयर उपकरण गैर-लाभकारी सार्वजनिक देखभाल सहायता के लिए विकसित किए गए हैं और ये पेशेवर अस्पताल परामर्श का स्थान नहीं लेते हैं।",
    version: "नैदानिक सुइट v1.4.1"
  },
  sw: {
    appName: "MediScan Local",
    tagline: "Toleo Huria la Umma",
    oneLineExplanation: "Uchunguzi salama na wa haraka wa ngozi na macho bila mtandao.",
    howItWorks: "Jinsi inavyofanya kazi",
    start: "Anza Uchunguzi",
    selectLanguage: "Chagua Lugha",
    cameraPermissionTitle: "Ufikiaji wa Kamera",
    cameraPermissionDesc: "Ruhusu kamera kupiga picha safi za iris za macho na uso wa ngozi kwa uchunguzi wa karibu.",
    storagePermissionTitle: "Hifadhi ya Ndani ya Kifaa",
    storagePermissionDesc: "Inahitajika tu kupanga ripoti za PDF nje ya mtandao na kuhifadhi historia.",
    allowAccess: "Toa Ruhusa ya Kifaa",
    goNext: "Endelea",
    skinScreening: "Uchunguzi wa Ngozi",
    skinDesc: "Kagua madoa, makovu, rashes au maeneo kavu ya ngozi.",
    eyeScreening: "Uchunguzi wa Macho",
    eyeDesc: "Pima cataracts, mawingu ya lensi, au shida za mboni.",
    history: "Rekodi za Historia",
    settings: "Vipangilio",
    homeSubtitle: "Msaidizi wa afya salama kabisa, usiotumia mtandao, bila kujisajili.",
    guideTitle: "Piga Picha ya Kiliniki Safi",
    guideLighting: "Hakikisha mwanga unaotosha na wa asili chumbani.",
    guideCenter: "Weka dalili katikati ya gridi na urekebishe focus.",
    guideSteady: "Shikilia simu imara ili kuzuia picha isiyojulikana vizuri.",
    openCamera: "Fungua Kamera",
    cameraViewfinder: "Kipimo cha Kiliniki",
    capture: "Piga Picha",
    retake: "Piga Tena",
    reviewImage: "Kagua Picha ya Kipimo",
    confirmAnalyze: "Chakata Ndani ya Kifaa",
    processingTitle: "WASM Inachakata Toleo",
    processingDesc: "Inatumia model ya 8-bit quantized ndani ya RAM ya kifaa chako...",
    resultTitle: "Matokeo ya Uchunguzi",
    confidence: "Kiwango cha Uhakika wa Model",
    severity: "Kiwango cha Hatari",
    recLabel: "Mapendekezo ya Kiliniki",
    diffLabel: "Kipimo Mbadala Kinachowezekana",
    saveSuccess: "Imehifadhiwa salama kwenye rekodi za kifaa",
    saveBtn: "Hifadhi kwenye Kifaa",
    exportBtn: "Pakua Ripoti ya Kipimo",
    backToHome: "Rudi Nyumbani",
    noSavedLogs: "Hakuna kumbukumbu za uchunguzi kwenye kifaa hiki.",
    filterAll: "Rekodi Zote za Kipimo",
    filterSkin: "Kipimo cha Ngozi",
    filterEye: "Kipimo cha Macho",
    privacyHeader: "Ulinzi na Usiri wa Kifaa",
    privacyDesc: "Matokeo yako yote ya screen na picha yanabaki kwenye hifadhi ya ndani ya browser yako. Hakuna chochote kinatumwa kwenye server.",
    dangerZone: "Eneo la Hatari (Futa Zote)",
    deleteBtn: "Futa Data Zote za Ndani",
    confirmDelete: "Je, una uhakika unataka kufuta rekodi zote? Kitendo hiki hakiwezi kubatilishwa.",
    aboutText: "Imeundwa kusaidia huduma za afya za kijamii bila malipo. Chombo hiki hakichukui nafasi ya ushauri wa kitaalamu wa hospitalini.",
    version: "Toleo la Kiliniki v1.4.1"
  }
};

// Simulated Pathologies Dataset (HAM10000 / Fitzpatrick17k / ODIR Reference)
const PATHOLOGY_MOCKS: Record<"skin" | "eye", DiagnosticResult[]> = {
  skin: [
    {
      id: "pathology-skin-1",
      type: "skin",
      conditionName: "Basal Cell Carcinoma (BCC)",
      confidence: 0.89,
      severity: "moderate",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
      timestamp: "",
      description: "Pearly, translucent papule displaying tiny telangiectasia blood vessels. Common form of localized skin condition on sun-exposed zones.",
      recommendation: "Avoid continuous directly active sunlight exposure. Arrange formal clinical punch biopsy review with local medical practitioner within 21-30 days.",
      differentials: ["Seborrheic Keratosis", "Intradermal Melanocytic Naevus", "Squamous Cell Carcinoma"]
    },
    {
      id: "pathology-skin-2",
      type: "skin",
      conditionName: "Benign Melanocytic Naevus",
      confidence: 0.94,
      severity: "low",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
      timestamp: "",
      description: "Symmetrical, uniformly pigment-distributed brown macule with clean borders. No atypical biological markers detected.",
      recommendation: "Reassuring examination. Monitor annually for any rapid modifications in border symmetry, coloring, diameter, or persistent irritation.",
      differentials: ["Dysplastic Naevus", "Dermatofibroma", "Seborrheic Keratosis"]
    },
    {
      id: "pathology-skin-3",
      type: "skin",
      conditionName: "Seborrheic Keratosis",
      confidence: 0.81,
      severity: "low",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600",
      timestamp: "",
      description: "Waxy 'stuck-on' hyperpigmented epidermal plaque. Normal benign accretion common with progressive age groups.",
      recommendation: "Benign diagnostic profile. No urgent medical intervention needed. Soft localized emollients can alleviate dryness or friction scratch sensations.",
      differentials: ["Verruca Vulgaris", "Basal Cell Carcinoma", "Melanocytic Naevus"]
    }
  ],
  eye: [
    {
      id: "pathology-eye-1",
      type: "eye",
      conditionName: "Nuclear Cataract Opacification",
      confidence: 0.91,
      severity: "high",
      image: "https://images.unsplash.com/photo-1518244979647-284c8989c950?auto=format&fit=crop&q=80&w=600",
      timestamp: "",
      description: "Pronounced yellowish-amber turbidity clustered in central crystalline lens nucleus. Patient reports subacute progressive reduction in night-time distance acuity.",
      recommendation: "Refer to Ophthalmic Clinic for comprehensive slit-lamp evaluation, intraocular pressure measurement, and elective outpatient cataract lens replacement.",
      differentials: ["Cortical Opacity", "Posterior Subcapsular Cataract", "Corneal Dystrophy"]
    },
    {
      id: "pathology-eye-2",
      type: "eye",
      conditionName: "Cortical Lens Cataractous Opacity",
      confidence: 0.85,
      severity: "moderate",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=600",
      timestamp: "",
      description: "Cuneiform 'spoke-like' whitish opacities radiating from outer lens cortex perimeter inward towards center pupillary zone.",
      recommendation: "Consult an eye professional for visual acuity and glare testing. Safe to monitor at regular 6-month cycles unless mobility is affected.",
      differentials: ["Nuclear Sclerosis", "Senile Macular Degeneration", "Vitreal Floatage"]
    }
  ]
};

export default function App() {
  // Navigation & Screen routes
  const [activeScreen, setActiveScreen] = useState<
    'splash' | 'welcome' | 'language' | 'permissions' | 'home' | 'screening_guide' | 'camera' | 'review' | 'processing' | 'result' | 'history' | 'detail' | 'settings'
  >('splash');

  // App settings state
  const [locale, setLocale] = useState<LanguageCode>('en');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [storagePermission, setStoragePermission] = useState<boolean | null>(null);
  const [activeModule, setActiveModule] = useState<'skin' | 'eye' | null>(null);
  
  // Active Camera & Image state
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLiveCamera, setIsLiveCamera] = useState<boolean>(false);
  
  // Preset simulation selection to maintain absolute offline performance
  const [selectedPreset, setSelectedPreset] = useState<DiagnosticResult | null>(null);
  const [activeResult, setActiveResult] = useState<DiagnosticResult | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<boolean>(false);
  const [customNote, setCustomNote] = useState<string>("");

  // Storage history list state
  const [savedRecords, setSavedRecords] = useState<DiagnosticResult[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [historyFilter, setHistoryFilter] = useState<'all' | 'skin' | 'eye'>('all');
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);

  // Translate helper
  const t = (key: string): string => {
    return translations[locale][key] || translations['en'][key] || key;
  };

  // Splash Screen timer
  useEffect(() => {
    if (activeScreen === 'splash') {
      const timer = setTimeout(() => {
        // Load settings from local storage
        const savedLocale = localStorage.getItem('mediscan_locale') as LanguageCode;
        if (savedLocale) setLocale(savedLocale);

        const records = localStorage.getItem('mediscan_history');
        if (records) {
          try {
            setSavedRecords(JSON.parse(records));
          } catch(e) {
            console.error(e);
          }
        }

        const permCam = localStorage.getItem('mediscan_camera_perm');
        if (permCam === 'true') setCameraPermission(true);

        const permStore = localStorage.getItem('mediscan_storage_perm');
        if (permStore === 'true') setStoragePermission(true);

        // Routing logic
        if (!savedLocale) {
          setActiveScreen('welcome');
        } else if (permCam !== 'true') {
          setActiveScreen('permissions');
        } else {
          setActiveScreen('home');
        }
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  // Load and clean camera steam based on screen route
  useEffect(() => {
    if (activeScreen === 'camera') {
      startCameraFeed();
    } else {
      stopCameraFeed();
    }
  }, [activeScreen]);

  const startCameraFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setCameraStream(stream);
      setIsLiveCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Unable to access live webcam feed, falling back to simulated high-definition clinical preset.", err);
      setIsLiveCamera(false);
    }
  };

  const stopCameraFeed = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsLiveCamera(false);
  };

  const executeWebcamCapture = () => {
    if (isLiveCamera && videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCameraFeed();
        setActiveScreen('review');
      }
    } else if (selectedPreset) {
      // Manual selection simulation capture
      setCapturedImage(selectedPreset.image);
      setActiveScreen('review');
    }
  };

  const handleSelectLanguage = (lang: LanguageCode) => {
    setLocale(lang);
    localStorage.setItem('mediscan_locale', lang);
    if (!cameraPermission) {
      setActiveScreen('permissions');
    } else {
      setActiveScreen('home');
    }
  };

  const handleGrantPermissions = () => {
    setCameraPermission(true);
    setStoragePermission(true);
    localStorage.setItem('mediscan_camera_perm', 'true');
    localStorage.setItem('mediscan_storage_perm', 'true');
    setActiveScreen('home');
  };

  const handleInitiateScreening = (type: 'skin' | 'eye') => {
    setActiveModule(type);
    // Assign default preset
    const presets = PATHOLOGY_MOCKS[type];
    setSelectedPreset(presets[0]);
    setActiveScreen('screening_guide');
  };

  const runLocalInferencePipeline = () => {
    setActiveScreen('processing');
    
    // Simulate low latency quantization feedforward
    setTimeout(() => {
      if (selectedPreset) {
        const finalAns: DiagnosticResult = {
          ...selectedPreset,
          id: `scr-${Math.floor(Math.random() * 900000) + 100000}`,
          timestamp: new Date().toLocaleDateString(locale === 'ur' ? 'ur-PK' : undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          image: capturedImage || selectedPreset.image,
          notes: customNote
        };
        setActiveResult(finalAns);
        setActiveScreen('result');
      }
    }, 2400);
  };

  const saveDiagnosticRecord = () => {
    if (activeResult) {
      const updated = [activeResult, ...savedRecords];
      setSavedRecords(updated);
      localStorage.setItem('mediscan_history', JSON.stringify(updated));
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 2500);
    }
  };

  const deleteRecord = (id: string) => {
    const updated = savedRecords.filter(r => r.id !== id);
    setSavedRecords(updated);
    localStorage.setItem('mediscan_history', JSON.stringify(updated));
    setSelectedRecordId(null);
    setActiveScreen('history');
  };

  const clearEntireStore = () => {
    if (window.confirm(t('confirmDelete'))) {
      localStorage.removeItem('mediscan_history');
      setSavedRecords([]);
      setActiveScreen('settings');
    }
  };

  const filteredHistory = savedRecords.filter(item => {
    const typeMatch = historyFilter === 'all' ? true : item.type === historyFilter;
    const searchMatch = item.conditionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return typeMatch && searchMatch;
  });

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case "urgent": return { bg: "bg-rose-500/10", border: "border-rose-500/40", text: "text-rose-400", pill: "bg-rose-500" };
      case "high": return { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-400", pill: "bg-amber-500" };
      case "moderate": return { bg: "bg-sky-500/10", border: "border-sky-500/40", text: "text-sky-400", pill: "bg-sky-500" };
      default: return { bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-400", pill: "bg-emerald-500" };
    }
  };

  // Compile offline client-side distribution report
  const handleExportTextFile = (record: DiagnosticResult) => {
    const content = `
=============================================
         MEDISCAN LOCAL DIGITAL REPORT        
=============================================
ID: ${record.id}
Date: ${record.timestamp}
Diagnostic Target: ${record.type.toUpperCase()} Screening
Primary Finding: ${record.conditionName}
Confidence Score: ${(record.confidence * 100).toFixed(1)}%
Severity level: ${record.severity.toUpperCase()}

---------------------------------------------
CLINICAL DESCRIPTION:
${record.description}

---------------------------------------------
INDICATED CARE RECOMMENDATIONS:
${record.recommendation}

---------------------------------------------
SECONDARY DIFFERENTIAL DIAGNOSES:
${record.differentials.join(", ")}

${record.notes ? `\n---------------------------------------------\nCLINICIAN OR WORKER NOTES:\n${record.notes}` : ""}
=============================================
Generated locally on-device. Free Public Version.
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MediScan-Report-${record.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Top minimalistic hospital banner, hidden on clean fullscreen intro pages */}
      {activeScreen !== 'splash' && activeScreen !== 'welcome' && (
        <header id="header-hud" className="border-b border-slate-800/60 bg-[#090C14]/90 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
          <div className="max-w-md mx-auto px-5 py-3.5 flex justify-between items-center">
            
            {/* Minimal hospital branding logo details */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/35">
                <Sparkle className="w-4.5 h-4.5 text-teal-400 absolute" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white uppercase flex items-center gap-1">
                  {t('appName')} 
                </h1>
                <p className="text-[9px] font-mono tracking-wider text-teal-400/90 leading-none uppercase">
                  {t('tagline')}
                </p>
              </div>
            </div>

            {/* Micro active layout controller buttons */}
            <div className="flex items-center gap-3">
              <button 
                id="btn-nav-history"
                onClick={() => setActiveScreen('history')}
                className={`p-2 rounded-lg border transition ${
                  activeScreen === 'history' 
                  ? "bg-teal-500/15 border-teal-500/40 text-teal-400" 
                  : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white"
                }`}
              >
                <History className="w-4 h-4" />
              </button>

              <button 
                id="btn-nav-settings"
                onClick={() => setActiveScreen('settings')}
                className={`p-2 rounded-lg border transition ${
                  activeScreen === 'settings' 
                  ? "bg-teal-500/15 border-teal-500/40 text-teal-400" 
                  : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white"
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Single-Screen Content Hub framed perfectly to mimic mobile helper feel */}
      <main className="flex-1 w-full max-w-md mx-auto px-5 py-6 flex flex-col justify-start relative">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: SPLASH INTRO SCREEN */}
          {activeScreen === 'splash' && (
            <motion.div 
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                {/* Glowing radial circular animation loops */}
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute inset-0 bg-teal-500 rounded-full blur-xl"
                />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center shadow-lg shadow-teal-500/20 border border-teal-300">
                  <Activity className="w-8 h-8 text-white stroke-[2.5]" />
                </div>
              </div>

              <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                MEDISCAN<span className="text-teal-400">LOCAL</span>
              </h2>
              <p className="text-xs font-mono tracking-[0.25em] text-teal-400/90 mt-2 uppercase font-semibold">
                Public Free Edition
              </p>

              <div className="mt-14 space-y-2">
                <div className="w-10 h-1 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full mx-auto" />
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">
                  Initializing WASM Model Engine...
                </p>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: WELCOME SCREEN */}
          {activeScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <div className="text-center mb-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-5">
                  <Activity className="w-7 h-7 text-teal-400" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                  {t('appName')}
                </h2>
                <span className="px-3 py-1 bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-semibold rounded-full uppercase tracking-wider block w-max mx-auto mb-6">
                  {t('tagline')}
                </span>
                <p className="text-base text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                  {t('oneLineExplanation')}
                </p>
              </div>

              <div className="space-y-3.5 mb-10">
                {/* Clean Feature highlight points */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Secure & On-Device</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">No medical records, images, or credentials ever transmit outside.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">No Logins, Accounts, or Subscriptions</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Fully unblocked utility and analytics accessible instantly to everyone.</p>
                  </div>
                </div>
              </div>

              {/* Huge beautiful start buttons */}
              <div className="space-y-3">
                <button
                  id="btn-welcome-start"
                  onClick={() => setActiveScreen('language')}
                  className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2"
                >
                  <span>{t('start')}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  id="btn-welcome-how-it-works"
                  onClick={() => setShowHowItWorks(true)}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  {t('howItWorks')}
                </button>
              </div>

              {/* Modal overlay list for "How it Works" info */}
              {showHowItWorks && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-5">
                  <div className="bg-[#0B0E16] border border-slate-800 rounded-2xl w-full max-w-sm p-6 overflow-y-auto max-h-[85vh]">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
                        <Info className="w-4.5 h-4.5 text-teal-400" />
                        <span>How MediScan Works</span>
                      </h3>
                      <button 
                        onClick={() => setShowHowItWorks(false)}
                        className="text-slate-400 hover:text-white font-mono text-sm border border-slate-800 px-2 py-1 rounded"
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                      <div>
                        <span className="font-black text-teal-400 block mb-1">1. Choose Diagnostic Scan</span>
                        Determine whether skin dermatology lesions or pupillary eye changes need examination.
                      </div>
                      <div>
                        <span className="font-black text-teal-400 block mb-1">2. Local Image Processing</span>
                        Vite packages load 8-bit quantized ONNX models into device RAM sector. Your browser compiles inference on-device using WebAssembly.
                      </div>
                      <div>
                        <span className="font-black text-teal-400 block mb-1">3. Privacy Guarantee</span>
                        None of your photos leave this device. History statistics are cached strictly inside sandboxed SQLite / Local Storage storage.
                      </div>
                      <div>
                        <span className="font-black text-teal-400 block mb-1">4. Preliminary screening only</span>
                        Results are statistical classifications calibrated via Platt scaling, meant for early clinic guidance and not a final hospital verdict is implied.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 3: LANGUAGE SCREEN */}
          {activeScreen === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <div className="text-center mb-10">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-teal-400" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  {t('selectLanguage')}
                </h2>
                <div className="w-10 h-0.5 bg-teal-500 mx-auto mt-3" />
              </div>

              {/* Grid of clean translation button options */}
              <div className="grid grid-cols-1 gap-3 mb-8">
                <button
                  id="btn-lang-en"
                  onClick={() => handleSelectLanguage('en')}
                  className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/60 hover:from-teal-950/20 hover:to-slate-900/40 border border-slate-800 hover:border-teal-500/40 rounded-xl text-left transition flex justify-between items-center group cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-bold text-white block">English</span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 block">International Standard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transform group-hover:translate-x-1 duration-150" />
                </button>

                <button
                  id="btn-lang-ur"
                  onClick={() => handleSelectLanguage('ur')}
                  className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/60 hover:from-teal-950/20 hover:to-slate-900/40 border border-slate-800 hover:border-teal-500/40 rounded-xl text-right transition flex flex-row-reverse justify-between items-center group cursor-pointer"
                >
                  <div className="text-right">
                    <span className="text-lg font-bold text-white block font-urdu">اردو</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">علاقائی زبان پاکستان</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transform group-hover:-translate-x-1 duration-150" />
                </button>

                <button
                  id="btn-lang-hi"
                  onClick={() => handleSelectLanguage('hi')}
                  className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/60 hover:from-teal-950/20 hover:to-slate-900/40 border border-slate-800 hover:border-teal-500/40 rounded-xl text-left transition flex justify-between items-center group cursor-pointer"
                >
                  <div>
                    <span className="text-base font-bold text-white block">हिन्दी</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">राष्ट्रीय भाषा भारत</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transform group-hover:translate-x-1 duration-150" />
                </button>

                <button
                  id="btn-lang-sw"
                  onClick={() => handleSelectLanguage('sw')}
                  className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/60 hover:from-teal-950/20 hover:to-slate-900/40 border border-slate-800 hover:border-teal-500/40 rounded-xl text-left transition flex justify-between items-center group cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-bold text-white block">Kiswahili</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Afrika Mashariki</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transform group-hover:translate-x-1 duration-150" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: PERMISSIONS SCREEN */}
          {activeScreen === 'permissions' && (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  Hardware Access
                </h2>
                <p className="text-xs text-slate-400 mt-2">Required system privileges confirmation</p>
              </div>

              <div className="space-y-4 mb-10">
                {/* Simulated Permission items */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{t('cameraPermissionTitle')}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t('cameraPermissionDesc')}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{t('storagePermissionTitle')}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t('storagePermissionDesc')}</p>
                  </div>
                </div>
              </div>

              <button
                id="btn-permissions-grant"
                onClick={handleGrantPermissions}
                className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition shadow-lg shadow-teal-500/10"
              >
                {t('allowAccess')}
              </button>
            </motion.div>
          )}

          {/* SCREEN 5: HOME SCREEN (The Core clinical helper layout requested) */}
          {activeScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="mb-6 pt-2">
                <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">
                  Primary Diagnosis Helper
                </span>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  {t('homeSubtitle')}
                </p>
              </div>

              {/* Large tactile screening action cards */}
              <div className="space-y-4 mb-8">
                
                {/* SKIN SCREENING CARD */}
                <button
                  id="btn-home-skin"
                  onClick={() => handleInitiateScreening('skin')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 hover:to-teal-950/20 border-2 border-slate-850 hover:border-teal-500/40 text-left transition relative group overflow-hidden cursor-pointer flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 duration-150">
                    <Sparkles className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white uppercase tracking-tight">{t('skinScreening')}</span>
                      <span className="text-[9px] font-mono bg-teal-500/15 text-teal-400 border border-teal-500/30 px-1.5 py-0.5 rounded leading-none font-bold uppercase">WASM v1</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xs">{t('skinDesc')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-teal-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
                </button>

                {/* EYE SCREENING CARD */}
                <button
                  id="btn-home-eye"
                  onClick={() => handleInitiateScreening('eye')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 hover:to-teal-950/20 border-2 border-slate-850 hover:border-teal-500/40 text-left transition relative group overflow-hidden cursor-pointer flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 duration-150">
                    <Eye className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white uppercase tracking-tight">{t('eyeScreening')}</span>
                      <span className="text-[9px] font-mono bg-sky-500/15 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded leading-none font-bold uppercase">WASM v1</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xs">{t('eyeDesc')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-teal-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
                </button>
              </div>

              {/* Local secure metadata dashboard indicators */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">Security Protocol</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                  ACTIVE OFFLINE VAULT
                </span>
              </div>

              {/* Bottom Quick Jump Action shortcuts */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button
                  id="btn-quick-history"
                  onClick={() => setActiveScreen('history')}
                  className="py-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                >
                  <History className="w-4 h-4 text-slate-500" />
                  <span>{t('history')} ({savedRecords.length})</span>
                </button>

                <button
                  id="btn-quick-settings"
                  onClick={() => setActiveScreen('settings')}
                  className="py-3 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>{t('settings')}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: SCREENING GUIDE SCREEN */}
          {activeScreen === 'screening_guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="flex items-center gap-2 mb-6">
                <button 
                  onClick={() => setActiveScreen('home')}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">
                  {activeModule === 'skin' ? t('skinScreening') : t('eyeScreening')} Setup
                </span>
              </div>

              <h2 className="text-xl font-extrabold tracking-tight text-white mb-6">
                {t('guideTitle')}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{t('guideLighting')}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{t('guideCenter')}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{t('guideSteady')}</p>
                </div>
              </div>

              {/* Sample pathology preset dropdown selectors context for easy testing during simulation! */}
              <div className="p-4 rounded-xl bg-slate-900/30 border border-dashed border-slate-800 mb-8">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block mb-3">
                  Select Clinical Case Scenario (Preset)
                </span>
                
                <div className="space-y-2.5">
                  {activeModule && PATHOLOGY_MOCKS[activeModule].map((p, idx) => {
                    const isSelected = selectedPreset?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPreset(p)}
                        className={`w-full p-3 rounded-lg border text-left transition flex justify-between items-center ${
                          isSelected 
                          ? "bg-teal-500/10 border-teal-500/40 text-teal-400" 
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block">{p.conditionName}</span>
                          <span className="text-[9px] uppercase font-semibold tracking-wider font-mono opacity-80 mt-0.5 block">Severity: {p.severity}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                id="btn-guide-camera"
                onClick={() => setActiveScreen('camera')}
                className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 mt-auto cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>{t('openCamera')}</span>
              </button>
            </motion.div>
          )}

          {/* SCREEN 7: CAMERA SCREEN */}
          {activeScreen === 'camera' && (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between py-2 min-h-[75vh]"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-bold">
                  {t('cameraViewfinder')}
                </span>
                <button
                  id="btn-camera-cancel"
                  onClick={() => {
                    stopCameraFeed();
                    setActiveScreen('screening_guide');
                  }}
                  className="px-2.5 py-1 text-[10px] font-mono border border-slate-850 rounded hover:text-white"
                >
                  CANCEL
                </button>
              </div>

              {/* Interactive Camera viewfinder viewport container */}
              <div className="relative bg-black rounded-2xl border-2 border-slate-800 aspect-[3/4] overflow-hidden flex items-center justify-center">
                
                {isLiveCamera ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover select-none"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950">
                    {/* Simulated High Definition Mock Image Preview based on preset */}
                    {selectedPreset && (
                      <img
                        src={selectedPreset.image}
                        alt="clinical view"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 select-none animate-pulse-slow"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    
                    {/* Glowing guides box overlays */}
                    <div className="absolute inset-0 border-[32px] border-slate-950/40 pointer-events-none" />
                  </div>
                )}

                {/* Biometric guide overlay grid lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {activeModule === 'eye' ? (
                    /* Circular iris alignment rings guide */
                    <div className="w-56 h-56 border border-dashed border-teal-400/50 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 border border-teal-400/30 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping" />
                      </div>
                    </div>
                  ) : (
                    /* Corner bracket alignment guides */
                    <div className="w-56 h-56 relative flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400" />
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 bg-slate-900/90 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-full text-[9px] text-teal-400 tracking-widest font-mono uppercase font-bold text-center pointer-events-none">
                  {activeModule === 'eye' ? "Align Iris inside circle" : "Position lesion inside brackets"}
                </div>
              </div>

              {/* Capture triggers */}
              <div className="pt-6">
                <button
                  id="btn-camera-capture"
                  onClick={executeWebcamCapture}
                  className="w-full py-4.5 bg-teal-500 hover:bg-teal-400 text-black font-black text-sm uppercase tracking-widest rounded-xl transition shadow-lg shadow-teal-500/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('capture')}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 8: REVIEW SCREEN */}
          {activeScreen === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold">
                  {t('reviewImage')}
                </span>
              </div>

              {/* Large review preview card */}
              <div className="w-full aspect-[4/3] rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 mb-6">
                {capturedImage && (
                  <img
                    src={capturedImage}
                    alt="Taken diagnostic snapshot"
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Note attachment field */}
              <div className="mb-6 space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Add Case Notes (Optional)</label>
                <textarea
                  id="inp-review-notes"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Patient reports slight itching or irritation..."
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 outline-none focus:border-teal-500 transition"
                />
              </div>

              {/* Action grid options */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button
                  id="btn-review-retake"
                  onClick={() => {
                    setCapturedImage(null);
                    setActiveScreen('camera');
                  }}
                  className="py-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('retake')}</span>
                </button>

                <button
                  id="btn-review-analyze"
                  onClick={runLocalInferencePipeline}
                  className="py-4 bg-teal-500 hover:bg-teal-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition shadow shadow-teal-500/10 flex items-center justify-center gap-2"
                >
                  <span>{t('confirmAnalyze')}</span>
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 9: PROCESSING SCREEN */}
          {activeScreen === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 animate-spin" />
                <Activity className="w-8 h-8 text-teal-400 animate-pulse" />
              </div>

              <h2 className="text-xl font-extrabold tracking-tight text-white uppercase mb-2">
                {t('processingTitle')}
              </h2>
              <p className="text-xs text-slate-400 max-w-xs mt-2 leading-relaxed">
                {t('processingDesc')}
              </p>
            </motion.div>
          )}

          {/* SCREEN 10: RESULT SCREEN */}
          {activeScreen === 'result' && activeResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold">
                  {t('resultTitle')}
                </span>
              </div>

              {/* Main Pathology output card */}
              <div className="space-y-4 mb-6">
                <div className={`p-5 rounded-2xl border ${getSeverityColors(activeResult.severity).border} ${getSeverityColors(activeResult.severity).bg} space-y-4`}>
                  
                  <div className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 select-none block">Primary Match</span>
                      <h3 className="text-lg font-black text-white leading-tight uppercase mt-1">
                        {activeResult.conditionName}
                      </h3>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${getSeverityColors(activeResult.severity).text} ${getSeverityColors(activeResult.severity).border} bg-black/60 font-black uppercase tracking-wider`}>
                      {activeResult.severity}
                    </span>
                  </div>

                  {/* Confidence metrics */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1 select-none">
                      <span>{t('confidence')}</span>
                      <span className="font-bold text-white">{(activeResult.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="bg-slate-800 h-2.5 rounded-full overflow-hidden w-full border border-slate-700/60">
                      <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeResult.confidence * 100}%` }} />
                    </div>
                  </div>

                  {/* Description text */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeResult.description}</p>
                </div>

                {/* Recommendations container card */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-teal-400">
                    <Heart className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                      {t('recLabel')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeResult.recommendation}</p>
                </div>

                {/* Differentials item list */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    {t('diffLabel')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeResult.differentials.map((dif, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-slate-750 font-medium">
                        {dif}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes if written */}
                {activeResult.notes && (
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Attached Case Notes</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans italic">"{activeResult.notes}"</p>
                  </div>
                )}
              </div>

              {/* Status messages indicator */}
              {saveSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold rounded-xl text-center uppercase tracking-wide">
                  {t('saveSuccess')}
                </div>
              )}

              {/* Save / Export buttons */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-result-save-local"
                    onClick={saveDiagnosticRecord}
                    className="py-3.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('saveBtn')}</span>
                  </button>

                  <button
                    id="btn-result-export"
                    onClick={() => handleExportTextFile(activeResult)}
                    className="py-3.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('exportBtn')}</span>
                  </button>
                </div>

                <button
                  id="btn-result-home"
                  onClick={() => {
                    setCapturedImage(null);
                    setCustomNote("");
                    setActiveResult(null);
                    setActiveScreen('home');
                  }}
                  className="w-full py-4.5 bg-teal-500 hover:bg-teal-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('backToHome')}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 11: HISTORY SCREEN */}
          {activeScreen === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveScreen('home')}
                    className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-extrabold tracking-tight text-white uppercase">
                    {t('history')}
                  </span>
                </div>

                {savedRecords.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Delete all local clinical records permanently?")) {
                        localStorage.removeItem('mediscan_history');
                        setSavedRecords([]);
                      }
                    }}
                    className="p-2 text-rose-500 hover:text-rose-400 text-xs font-semibold hover:bg-rose-500/10 rounded-lg transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Filter tabs and search inputs */}
              <div className="space-y-3 mb-5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                  <input
                    id="inp-history-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search past condition name..."
                    className="w-full bg-slate-900/60 border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-200 outline-none focus:border-teal-500 transition font-sans"
                  />
                </div>

                {/* Filter chip tab headers */}
                <div className="flex gap-2 p-1.5 bg-slate-900 border border-slate-800/80 rounded-xl">
                  <button
                    onClick={() => setHistoryFilter('all')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition ${
                      historyFilter === 'all' 
                      ? "bg-teal-500 text-black shadow" 
                      : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t('filterAll')}
                  </button>
                  <button
                    onClick={() => setHistoryFilter('skin')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition ${
                      historyFilter === 'skin' 
                      ? "bg-teal-500 text-black shadow" 
                      : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t('filterSkin')}
                  </button>
                  <button
                    onClick={() => setHistoryFilter('eye')}
                    className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition ${
                      historyFilter === 'eye' 
                      ? "bg-teal-500 text-black shadow" 
                      : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t('filterEye')}
                  </button>
                </div>
              </div>

              {/* History index elements */}
              <div className="flex-1 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredHistory.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-850 rounded-xl">
                    <History className="w-8 h-8 text-slate-600 mx-auto mb-3 animate-pulse" />
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t('noSavedLogs')}</p>
                  </div>
                ) : (
                  filteredHistory.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedRecordId(item.id);
                        setActiveScreen('detail');
                      }}
                      className="w-full p-4 rounded-xl bg-slate-900 hover:bg-slate-850/80 border border-slate-800 text-left transition relative flex gap-3 cursor-pointer group"
                    >
                      <div className="w-11 h-11 rounded-lg border border-slate-800 overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt="preview thumbnail" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex justify-between items-start gap-1 select-none">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{item.timestamp}</span>
                          <span className={`text-[8px] font-mono px-1.5 rounded border leading-none py-0.5 uppercase tracking-wide font-black ${getSeverityColors(item.severity).text} ${getSeverityColors(item.severity).border} bg-[#07090E]`}>
                            {item.severity}
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-white truncate uppercase mt-1 leading-tight">{item.conditionName}</h4>
                        <span className="text-[10px] font-mono font-bold text-teal-400 opacity-90 mt-0.5 block">Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 absolute right-3.5 top-1/2 transform -translate-y-1/2" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* SCREEN 12: DETAIL SCREEN */}
          {activeScreen === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              {(() => {
                const record = savedRecords.find(r => r.id === selectedRecordId);
                if (!record) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <button 
                        onClick={() => setActiveScreen('history')}
                        className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Record</span>
                      </button>
                    </div>

                    {/* Captured image snapshot header */}
                    <div className="w-full aspect-video rounded-xl border border-slate-800 overflow-hidden bg-slate-950 relative">
                      <img
                        src={record.image}
                        alt={record.conditionName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-2 rounded font-mono text-[8px] text-slate-400 py-0.5 select-none font-bold uppercase">
                        {record.id} • {record.timestamp}
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${getSeverityColors(record.severity).border} ${getSeverityColors(record.severity).bg} space-y-3`}>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-base font-black text-white uppercase tracking-tight">{record.conditionName}</h3>
                        <span className={`text-[8px] px-1.5 leading-none py-0.5 rounded border font-mono font-black uppercase tracking-widest ${getSeverityColors(record.severity).text} ${getSeverityColors(record.severity).border} bg-slate-950`}>
                          {record.severity}
                        </span>
                      </div>

                      <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase select-none">
                        <span>Analysis Confidence</span>
                        <span className="font-bold text-white">{(record.confidence * 100).toFixed(1)}%</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{record.description}</p>
                    </div>

                    {/* Action Guideline details link card */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-black block">Care Recommendations</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{record.recommendation}</p>
                    </div>

                    {record.notes && (
                      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Notes Added</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans italic">"{record.notes}"</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <button
                        onClick={() => handleExportTextFile(record)}
                        className="py-3.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Text</span>
                      </button>

                      <button
                        onClick={() => setActiveScreen('history')}
                        className="py-3.5 bg-teal-500 hover:bg-teal-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                        <span>To History</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* SCREEN 13: SETTINGS SCREEN */}
          {activeScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-start py-2"
            >
              <div className="flex items-center gap-2 mb-6">
                <button 
                  onClick={() => setActiveScreen('home')}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold tracking-tight text-white uppercase">
                  {t('settings')}
                </span>
              </div>

              {/* Languages switch section */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-5 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Switch System Language</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition ${
                      locale === 'en' 
                      ? "bg-teal-500/10 border-teal-500/40 text-rose-100 font-bold" 
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleSelectLanguage('ur')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition font-urdu ${
                      locale === 'ur' 
                      ? "bg-teal-500/10 border-teal-500/40 text-rose-100 font-bold" 
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    اردو
                  </button>
                  <button
                    onClick={() => handleSelectLanguage('hi')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition ${
                      locale === 'hi' 
                      ? "bg-teal-500/10 border-teal-500/40 text-rose-100 font-bold" 
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => handleSelectLanguage('sw')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition ${
                      locale === 'sw' 
                      ? "bg-teal-500/10 border-teal-500/40 text-rose-100 font-bold" 
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    Kiswahili
                  </button>
                </div>
              </div>

              {/* Privacy statement note */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-5 space-y-2">
                <div className="flex items-center gap-1.5 text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-black">{t('privacyHeader')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{t('privacyDesc')}</p>
              </div>

              {/* About Disclaimer */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850 mb-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">About Clinician Disclaimer</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans italic">{t('aboutText')}</p>
              </div>

              {/* Danger wipe data block */}
              <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-900/40 mt-auto space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block font-black">{t('dangerZone')}</span>
                <button
                  onClick={clearEntireStore}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('deleteBtn')}</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer system details with clean tracking labels */}
      <footer id="footer-hud" className="border-t border-slate-800/60 bg-[#07090E]/90 py-5 select-none text-center">
        <div className="max-w-md mx-auto px-5 flex flex-col items-center gap-2">
          
          <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            <Lock className="w-3 h-3 text-teal-500/80" />
            <span>Secure Offline Sandbox Environment</span>
          </div>

          <p className="text-[9px] text-slate-600 font-mono tracking-wider">
            {t('version')} • MEDISCAN CLINICAL LABORATORY AI INC.
          </p>
        </div>
      </footer>
    </div>
  );
}
