import { ScreeningResult } from '../../types/Screening';

let _mockDetailsList: ScreeningResult[] = [
  {
    id: '1',
    moduleType: 'skin',
    conditionName: 'Tinea Versicolor Fungal Lesion',
    confidence: 0.945,
    severity: 'moderate',
    recommendation: 'Apply topical antifungal cream twice daily. Keep area clean and dry. Standard clinical referral within 2 weeks if no lesion reduction.',
    timestamp: '2026-06-08T14:24:00.000Z',
    differentials: ['Pityriasis Rosea', 'Eczema', 'Vitiligo']
  },
  {
    id: '2',
    moduleType: 'eye',
    conditionName: 'Conjunctivitis Infection',
    confidence: 0.88,
    severity: 'mild',
    recommendation: 'Avoid touching eyes, apply saline drops regularly to flush discharge. Keep hands sanitized. If light sensitivity occurs, refer immediately.',
    timestamp: '2026-06-07T10:12:00.000Z',
    differentials: ['Allergic Conjunctivitis', 'Dry Eye Syndrome', 'Keratitis']
  },
  {
    id: '3',
    moduleType: 'oral',
    conditionName: 'Basal Cell Carcinoma Suspicion',
    confidence: 0.72,
    severity: 'urgent',
    recommendation: 'Schedule biopsy with clinical oncology urgently. Avoid sun exposure and cover lesion. Follow-up is required immediately to prevent progression.',
    timestamp: '2026-06-05T09:15:00.000Z',
    differentials: ['Oral Leukoplakia', 'Aphthous Ulcer', 'Squamous Cell Carcinoma']
  }
];

export class ScreeningRepository {
  static async getAll(): Promise<ScreeningResult[]> {
    return [..._mockDetailsList];
  }

  static async findById(id: string): Promise<ScreeningResult | null> {
    const item = _mockDetailsList.find(r => r.id === id);
    return item ? { ...item } : null;
  }

  static async save(record: ScreeningResult): Promise<void> {
    const idx = _mockDetailsList.findIndex(r => r.id === record.id);
    if (idx !== -1) {
      _mockDetailsList[idx] = record;
    } else {
      _mockDetailsList.unshift(record);
    }
  }

  static async clear(): Promise<void> {
    _mockDetailsList = [];
  }
}
