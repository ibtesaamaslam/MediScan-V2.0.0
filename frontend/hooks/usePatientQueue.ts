import { useState, useEffect, useCallback } from 'react';
import { PatientRepository, PatientRecord } from '../services/database/PatientRepository';
import { EncryptionService } from '../services/security/EncryptionService';

export function usePatientQueue() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [encryptingId, setEncryptingId] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PatientRepository.getAll();
      setPatients(data);
    } catch (err: any) {
      console.error('[usePatientQueue] Failed pulling patients:', err);
      setError('Patient register lookup failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerPatientWithHMAC = useCallback(async (
    gender: 'M' | 'F' | 'O',
    birthYear: number,
    regionCode: string,
    rawNationalId: string,
    notes?: string
  ) => {
    setEncryptingId(true);
    try {
      // 1. Generate sha256 checksum to enforce anonymity
      const anonymizedIdHash = await EncryptionService.hashSHA256(rawNationalId);
      
      const newPatient: PatientRecord = {
        id: `pat-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        nationalIdHash: anonymizedIdHash,
        gender,
        birthYear,
        regionCode,
        registeredAt: new Date().toISOString(),
        notes,
      };

      await PatientRepository.registerPatient(newPatient);
      await fetchPatients();
      return newPatient;
    } catch (err: any) {
      console.error('[usePatientQueue] Encryption registration fail:', err);
      setError('AES decryption salt configuration or credential lookup mismatch.');
      return null;
    } finally {
      setEncryptingId(false);
    }
  }, [fetchPatients]);

  const deletePatientFromRegistry = useCallback(async (id: string) => {
    try {
      const removed = await PatientRepository.deletePatient(id);
      if (removed) {
        await fetchPatients();
      }
      return removed;
    } catch (err: any) {
      setError('Patient deletion failure.');
      return false;
    }
  }, [fetchPatients]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    encryptingId,
    error,
    refresh: fetchPatients,
    registerPatientWithHMAC,
    deletePatientFromRegistry,
  };
}
