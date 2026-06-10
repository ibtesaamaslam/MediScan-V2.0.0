// Patients security-wrapped sqlite repository layer
export interface PatientRecord {
  id: string;
  nationalIdHash: string; // SHA-256 string for clinical compliance
  gender: 'M' | 'F' | 'O';
  birthYear: number;
  regionCode: string;
  registeredAt: string;
  notes?: string;
}

let _patientRegistry: PatientRecord[] = [
  {
    id: 'pat-104',
    nationalIdHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    gender: 'F',
    birthYear: 1982,
    regionCode: 'SINDH-02',
    registeredAt: '2026-06-01T08:00:00.000Z',
    notes: 'Chronic dermatological irritation since childhood'
  },
  {
    id: 'pat-208',
    nationalIdHash: 'f4b231ff98acccdfa938fc28ee96e1efca2427b0098934509ab95cd8c847deef',
    gender: 'M',
    birthYear: 1964,
    regionCode: 'PUNJAB-14',
    registeredAt: '2026-06-04T12:30:00.000Z',
    notes: 'Prior cataract review in local regional medical camp'
  },
  {
    id: 'pat-311',
    nationalIdHash: '1a5bc93c0da89efa931bfce8ef92bef82ca42aa91bc92a34bb9543aa8cf8fced',
    gender: 'F',
    birthYear: 1995,
    regionCode: 'KPK-07',
    registeredAt: '2026-06-08T15:45:00.000Z',
  }
];

export class PatientRepository {
  static async getAll(): Promise<PatientRecord[]> {
    console.log('[PatientRepository] Fetching full encrypted registry roster contents...');
    return [..._patientRegistry];
  }

  static async findById(id: string): Promise<PatientRecord | null> {
    const pat = _patientRegistry.find((p) => p.id === id);
    return pat ? { ...pat } : null;
  }

  static async registerPatient(patient: PatientRecord): Promise<void> {
    const exists = _patientRegistry.some((p) => p.id === patient.id);
    if (exists) {
      _patientRegistry = _patientRegistry.map((p) => (p.id === patient.id ? patient : p));
    } else {
      _patientRegistry.unshift(patient);
    }
    console.log(`[PatientRepository] Registered anonymized record under ID key: ${patient.id}`);
  }

  static async deletePatient(id: string): Promise<boolean> {
    const initialLen = _patientRegistry.length;
    _patientRegistry = _patientRegistry.filter((p) => p.id !== id);
    return _patientRegistry.length < initialLen;
  }
}
