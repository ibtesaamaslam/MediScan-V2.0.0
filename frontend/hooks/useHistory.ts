import { useState, useEffect, useCallback } from 'react';
import { ScreeningResult } from '../types/Screening';
import { ScreeningRepository } from '../services/database/ScreeningRepository';

export function useHistory() {
  const [screenings, setScreenings] = useState<ScreeningResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const logs = await ScreeningRepository.getAll();
      setScreenings(logs);
    } catch (err: any) {
      console.error('[useHistory] Failed pulling history logs from SQLite database:', err);
      setError('SQLite schema lookup or decryption failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addRecord = useCallback(async (record: ScreeningResult) => {
    try {
      await ScreeningRepository.save(record);
      await fetchHistory();
    } catch (err: any) {
      setError('Could not write clinical record to safe memory sector.');
      throw err;
    }
  }, [fetchHistory]);

  const clearAllHistory = useCallback(async () => {
    setLoading(true);
    try {
      await ScreeningRepository.clear();
      setScreenings([]);
    } catch (err: any) {
      setError('Wiping history databases failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    screenings,
    loading,
    error,
    refresh: fetchHistory,
    addRecord,
    clearAllHistory,
  };
}
