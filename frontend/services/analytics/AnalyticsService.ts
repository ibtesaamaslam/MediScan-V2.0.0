import { ScreeningResult } from '../../types/Screening';
import { ScreeningRepository } from '../database/ScreeningRepository';

export interface DemographicStat {
  moduleType: string;
  count: number;
  avgConfidence: number;
  severityDist: { mild: number; moderate: number; urgent: number };
}

export class AnalyticsService {
  /**
   * Evaluates the comprehensive ledger database to produce offline demographic profiles.
   */
  static async compileLocalInsights(): Promise<{
    grandTotal: number;
    distribution: DemographicStat[];
    urgentRatio: number;
  }> {
    console.log('[AnalyticsService] Evaluating on-device sqlite entries... compiling demographic profiles');
    const records = await ScreeningRepository.getAll();
    const grandTotal = records.length;

    if (grandTotal === 0) {
      return { grandTotal: 0, distribution: [], urgentRatio: 0 };
    }

    const categories = ['skin', 'eye', 'oral', 'wound'] as const;
    let urgentCount = 0;

    const distribution = categories.map((module) => {
      const subset = records.filter((r) => r.moduleType === module);
      const count = subset.length;
      
      const sumConfidence = subset.reduce((acc, curr) => acc + curr.confidence, 0);
      const avgConfidence = count > 0 ? parseFloat((sumConfidence / count).toFixed(3)) : 0;
      
      const severityDist = { mild: 0, moderate: 0, urgent: 0 };
      subset.forEach((sub) => {
        if (sub.severity === 'urgent') {
          urgentCount++;
          severityDist.urgent++;
        } else if (sub.severity === 'moderate') {
          severityDist.moderate++;
        } else {
          severityDist.mild++;
        }
      });

      return {
        moduleType: module,
        count,
        avgConfidence,
        severityDist
      };
    });

    const urgentRatio = parseFloat((urgentCount / grandTotal).toFixed(3));

    return {
      grandTotal,
      distribution,
      urgentRatio
    };
  }

  /**
   * Gathers daily stats specifically geared towards the clinical community health worker (CHW).
   */
  static async getCHWDailySummaries(): Promise<{
    processedToday: number;
    pendingUplink: number;
    flaggedUrgent: number;
  }> {
    console.log('[AnalyticsService] Generating daily summary metrics for active CHW dashboard...');
    const records = await ScreeningRepository.getAll();
    
    const processedToday = records.length;
    const flaggedUrgent = records.filter(r => r.severity === 'urgent').length;
    
    return {
      processedToday,
      pendingUplink: Math.max(0, processedToday - 2), // Mock a couple items remaining unscanned
      flaggedUrgent
    };
  }
}
