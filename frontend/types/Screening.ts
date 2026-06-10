export interface ScreeningResult {
  id: string;
  moduleType: 'skin' | 'eye' | 'oral' | 'wound';
  conditionName: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'urgent';
  recommendation: string;
  differentials?: string[];
  timestamp: string;
  imageUrl?: string;
}
