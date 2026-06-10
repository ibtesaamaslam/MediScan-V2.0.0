import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { InferenceService } from '../../services/inference/InferenceService';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';

export default function ClinicalScreening() {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const captureNewPhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!res.canceled) {
      setImg(res.assets[0].uri);
      await processLocalModel(res.assets[0].uri);
    }
  };

  const processLocalModel = async (uri: string) => {
    try {
      setLoading(true);
      const output = await InferenceService.runScreening('oral', uri);
      setResult(output);

      // Save locally to SQLite instantly
      await ScreeningRepository.save({
        id: Math.random().toString(36).substring(7),
        moduleType: 'oral',
        conditionName: output.label,
        confidence: output.confidence,
        severity: output.severity,
        recommendation: output.recommendation,
        differentials: output.differentials,
        timestamp: new Date().toISOString(),
        imageUri: uri,
        offlineSaved: true,
        synced: false,
        abstainFlag: output.confidence < 0.7
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="ORAL Screening Matrix" />
      <View style={styles.body}>
        <Pressable style={styles.button} onPress={captureNewPhoto}>
          <Text style={styles.btnText}>Trigger Guided Camera</Text>
        </Pressable>

        {img && <Image source={{ uri: img }} style={styles.image} />}

        {loading && <ActivityIndicator color="#fff" size="large" style={{ marginTop: 24 }} />}

        {result && (
          <View style={[styles.resultBox, { borderColor: result.severity === 'urgent' ? colors.error : colors.border }]}>
            <Text style={styles.pRes}>Primary Hypotheses Result:</Text>
            <Text style={styles.cond}>{result.label}</Text>
            <Text style={styles.conf}>Calibrated Margin: {(result.confidence * 100).toFixed(1)}%</Text>
            <Text style={styles.recom}>{result.recommendation}</Text>
            
            <Pressable style={styles.historyBtn} onPress={() => router.push('/dashboard/home')}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete Session</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { padding: 8 },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  btnText: { color: 'white', fontWeight: 'bold' },
  image: { width: '100%', height: 280, borderRadius: 16, marginTop: 16, borderWidth: 1, borderColor: colors.border },
  resultBox: { backgroundColor: colors.surface, padding: 20, borderRadius: 16, marginTop: 20, borderWidth: 1 },
  pRes: { color: colors.textMuted, fontSize: 10, uppercase: true, fontWeight: 'bold' },
  cond: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  conf: { color: colors.success, fontSize: 13, marginTop: 4, fontWeight: '700' },
  recom: { color: colors.textSecondary, fontSize: 13, marginTop: 12, lineHeight: 1.6 },
  historyBtn: { backgroundColor: '#ffffff15', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 }
});