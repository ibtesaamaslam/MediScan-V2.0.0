import { useState, useEffect, useCallback } from 'react';
import { ModelLoader, ModelAsset } from '../services/inference/ModelLoader';

export function useModelManifest() {
  const [models, setModels] = useState<ModelAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncingModule, setSyncingModule] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const loadManifest = useCallback(async () => {
    setLoading(true);
    try {
      const assets = await ModelLoader.getAssets();
      setModels(assets);
    } catch (err) {
      console.error('[useModelManifest] Error reading manifest lists:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadWeights = useCallback(async (moduleType: 'skin' | 'eye' | 'oral' | 'wound') => {
    setSyncingModule(moduleType);
    setProgress(0);
    try {
      const ok = await ModelLoader.syncDownloadModel(moduleType, (percent) => {
        setProgress(percent);
      });
      await loadManifest();
      return ok;
    } catch (err) {
      console.error('[useModelManifest] Failed synchronising weights for:', moduleType, err);
      return false;
    } finally {
      setSyncingModule(null);
      setProgress(0);
    }
  }, [loadManifest]);

  const verifyWeights = useCallback(async (moduleType: 'skin' | 'eye' | 'oral' | 'wound') => {
    try {
      const verified = await ModelLoader.verifyModelIntegrity(moduleType);
      await loadManifest();
      return verified;
    } catch (err) {
      console.error('[useModelManifest] Hash verification failed for:', moduleType);
      return false;
    }
  }, [loadManifest]);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  return {
    models,
    loading,
    syncingModule,
    progress,
    loadManifest,
    downloadWeights,
    verifyWeights,
  };
}
