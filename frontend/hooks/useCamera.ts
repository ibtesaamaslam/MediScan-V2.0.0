import { useState, useCallback } from 'react';

export interface CameraState {
  hasPermission: boolean | null;
  flashMode: 'on' | 'off';
  isCapturing: boolean;
  lastCapturedUri: string | null;
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    hasPermission: null,
    flashMode: 'off',
    isCapturing: false,
    lastCapturedUri: null,
  });

  const requestPermission = useCallback(async () => {
    setState(prev => ({ ...prev, isCapturing: true }));
    // Simulate iOS/Android biometric permission request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setState(prev => ({ ...prev, hasPermission: true, isCapturing: false }));
    return true;
  }, []);

  const toggleFlash = useCallback(() => {
    setState(prev => ({
      ...prev,
      flashMode: prev.flashMode === 'on' ? 'off' : 'on',
    }));
  }, []);

  const capturePhoto = useCallback(async (moduleType: 'skin' | 'eye' | 'oral' | 'wound') => {
    setState(prev => ({ ...prev, isCapturing: true }));
    // Simulate high-definition exposure synchronization
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Choose realistic mock images representing the moduleType
    const mockUris: Record<string, string> = {
      skin: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
      eye: 'https://images.unsplash.com/photo-1518244979647-284c8989c950?auto=format&fit=crop&q=80&w=600',
      oral: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600',
      wound: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    };
    
    const uri = mockUris[moduleType] || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600';
    
    setState(prev => ({
      ...prev,
      isCapturing: false,
      lastCapturedUri: uri,
    }));
    
    return uri;
  }, []);

  const resetCamera = useCallback(() => {
    setState(prev => ({ ...prev, lastCapturedUri: null }));
  }, []);

  return {
    ...state,
    requestPermission,
    toggleFlash,
    capturePhoto,
    resetCamera,
  };
}
