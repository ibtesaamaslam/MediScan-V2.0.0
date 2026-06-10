import { useState, useCallback } from 'react';

export type LanguageCode = 'en' | 'ur' | 'hi' | 'sw';

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    scanTitle: 'ONNX PATHOLOGY CLASSIFIER',
    chwTitle: 'FIELD OUTPOST SCREENING QUEUE',
    selectModule: 'Select Clinical Diagnostic Target',
    captureImage: 'Capture High-Definition Examination Photo',
    processing: 'Accelerating WASM Quantized Operators...',
    noPermission: 'Biometric/Camera Permission Required. Grant to bypass sandboxed mock inputs.',
    nationalId: 'CNIC / Patient National Identification Number',
    nationalIdHolder: 'Enter raw biometric national card ID...',
    registerPat: 'Anonymize & Queue Patient',
    recentLogs: 'Local SQLite Device Ledger Logs',
    syncTrigger: 'Sync Pending Outbound Delta Queue',
    online: 'UPLINK ESTABLISHED',
    offline: 'ISOLATED LOCAL LEDGER',
    severeStatus: 'URGENT REPORT TRIGGERED',
    recommendation: 'RECOMMENDATION',
  },
  ur: {
    scanTitle: 'آئی این این ایکس پیتھالوجی درجہ بندی',
    chwTitle: 'کمیونٹی ہیلتھ کیمپ مریض کی فہرست',
    selectModule: 'پیتھالوجی ماڈیول کا انتخاب کریں',
    captureImage: 'لیبارٹری اور معائنہ فوٹو حاصل کریں',
    processing: 'کمپیوٹر وازم ماڈل رن ہو رہا ہے...',
    noPermission: 'کیمرے کی اجازت درکار ہے۔',
    nationalId: 'شناختی کارڈ نمبر',
    nationalIdHolder: 'شناختی کارڈ درج کریں...',
    registerPat: 'مریض کو گمنام کریں اور شامل کریں',
    recentLogs: 'مقامی ڈیٹا بیس ہسٹری ریکارڈز',
    syncTrigger: 'ریجنل ہسپتال ڈیٹا بیس سے ہم آہنگ کریں',
    online: 'نیٹ ورک رابطہ قائم ہے',
    offline: 'آف لائن موڈ چل رہا ہے',
    severeStatus: 'فوری توجہ درکار ہے',
    recommendation: 'طبی مشورہ',
  },
  hi: {
    scanTitle: 'ओएनएनएक्स पैथोलॉजी वर्गीकारक',
    chwTitle: 'सामुदायिक स्वास्थ्य शिविर रोगी कतार',
    selectModule: 'पैथोलॉजी मॉड्यूल का चयन करें',
    captureImage: 'निरीक्षण फोटो कैप्चर करें',
    processing: 'WASM क्वांटाइज्ड ऑपरेटर चल रहे हैं...',
    noPermission: 'कैमरा अनुमति आवश्यक है।',
    nationalId: 'रोगी राष्ट्रीय पहचान संख्या',
    nationalIdHolder: 'पहचान संख्या दर्ज करें...',
    registerPat: 'रोगी का नाम गोपनीय रखें और जोड़ें',
    recentLogs: 'स्थानीय डेटाबेस लॉग',
    syncTrigger: 'अपूर्ण डेटा सिंक करें',
    online: 'नेटवर्क संपर्क सक्रिय',
    offline: 'ऑफ़लाइन मोड सक्रिय',
    severeStatus: 'त्वरित कार्रवाई आवश्यक',
    recommendation: 'सिफ़ारिश',
  },
  sw: {
    scanTitle: 'KIKUNDI CHA ONNX PATHOLOGY',
    chwTitle: 'FOLENI YA WAGONJWA CHA CHW',
    selectModule: 'Chagua Lengo la Uchunguzi wa Kliniki',
    captureImage: 'Piga Picha ya Uchunguzi ya Kiwango cha Juu',
    processing: 'Tathmini ya WASM inaendelea kote...',
    noPermission: 'Ruhusa ya Kamera Inahitajika.',
    nationalId: 'Nambari ya Vitambulisho vya Taifa',
    nationalIdHolder: 'Andika kitambulisho cha wagonjwa...',
    registerPat: 'Ficha jina & Ongeza mgonjwa',
    recentLogs: 'Kumbukumbu za SQLite za Kifaa',
    syncTrigger: 'Sawazisha foleni inayosubiri',
    online: 'MTANDAO UNAFANYA KAZI',
    offline: 'MODE YA OFF-LINE IPO',
    severeStatus: 'TAARIFA YA DHARURA IMETOLEWA',
    recommendation: 'MAPENDEKEZO',
  }
};

export function useLanguage(initialLocale: LanguageCode = 'en') {
  const [locale, setLocale] = useState<LanguageCode>(initialLocale);

  const translate = useCallback((key: string): string => {
    return translations[locale][key] || translations['en'][key] || key;
  }, [locale]);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLocale(lang);
  }, []);

  return {
    locale,
    changeLanguage,
    t: translate,
  };
}
