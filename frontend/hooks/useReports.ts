import { useState, useCallback } from 'react';
import { ScreeningResult } from '../types/Screening';
import { ReportService } from '../services/reports/ReportService';

export interface ReportState {
  isCompiling: boolean;
  isTransmitting: boolean;
  lastGeneratedPath: string | null;
  error: string | null;
}

export function useReports() {
  const [state, setState] = useState<ReportState>({
    isCompiling: false,
    isTransmitting: false,
    lastGeneratedPath: null,
    error: null,
  });

  const compilePdfReport = useCallback(async (record: ScreeningResult, patientData?: any) => {
    setState(prev => ({ ...prev, isCompiling: true, error: null }));
    try {
      const uri = await ReportService.exportToLocalPDF(record, patientData);
      setState(prev => ({
        ...prev,
        isCompiling: false,
        lastGeneratedPath: uri,
      }));
      return uri;
    } catch (err: any) {
      console.error('[useReports] PDF generation failed:', err);
      setState(prev => ({
        ...prev,
        isCompiling: false,
        error: 'PDF generation routine failed: layout compilation error.',
      }));
      return null;
    }
  }, []);

  const transmitReport = useCallback(async (uri: string, targetEndpoint: string) => {
    setState(prev => ({ ...prev, isTransmitting: true, error: null }));
    try {
      const success = await ReportService.transmitPdfToClinic(uri, targetEndpoint);
      setState(prev => ({ ...prev, isTransmitting: false }));
      return success;
    } catch (err: any) {
      console.error('[useReports] Transmit failure:', err);
      setState(prev => ({
        ...prev,
        isTransmitting: false,
        error: 'Failed dispatching PDF packet safely to remote hospital terminal.',
      }));
      return false;
    }
  }, []);

  return {
    ...state,
    compilePdfReport,
    transmitReport,
  };
}
