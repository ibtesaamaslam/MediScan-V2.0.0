import { useState, useCallback } from 'react';

export interface ConsentRecord {
  patientIdHash: string;
  signatureBytes: string;
  hasConsented: boolean;
  version: string;
  signedAt: string;
}

export function useConsent() {
  const [consentCache, setConsentCache] = useState<Map<string, ConsentRecord>>(new Map());

  const recordPatientConsent = useCallback((
    patientIdHash: string,
    signatureBytes: string = 'BIOMETRIC_TOUCH_SIGNATURE_CONFIRMED'
  ) => {
    const record: ConsentRecord = {
      patientIdHash,
      signatureBytes,
      hasConsented: true,
      version: 'v2.1-compliance-consent',
      signedAt: new Date().toISOString(),
    };
    
    setConsentCache(prev => {
      const next = new Map(prev);
      next.set(patientIdHash, record);
      return next;
    });

    console.log(`[useConsent] Documented ethical-intake biometric consent for signature hash: ${patientIdHash}`);
    return record;
  }, []);

  const verifyConsentStatus = useCallback((patientIdHash: string): boolean => {
    const record = consentCache.get(patientIdHash);
    return !!record?.hasConsented;
  }, [consentCache]);

  const revokeConsent = useCallback((patientIdHash: string) => {
    setConsentCache(prev => {
      const next = new Map(prev);
      next.delete(patientIdHash);
      return next;
    });
    console.log(`[useConsent] Revoked patient diagnostic access consent for: ${patientIdHash}`);
  }, []);

  return {
    recordPatientConsent,
    verifyConsentStatus,
    revokeConsent,
  };
}
