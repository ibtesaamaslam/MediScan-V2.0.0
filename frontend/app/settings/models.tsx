import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function SettingsModels() {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState('All offline models up to date.');

  const checkUpdates = () => {
    setChecking(true);
    setStatus('Contacting validation server...');
    setTimeout(() => {
      setChecking(false);
      setStatus('Success: Version 1.2.0 is the latest calibrated model.');
    }, 1500);
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Neural Networks & Models" showBack={true} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Model Manifest Catalog</Text>
          <Text style={styles.desc}>This device hosts INT8 quantized ONNX checkpoints for extreme latency compression.</Text>

          <View style={styles.divider} />

          <View style={styles.modelRow}>
            <View>
              <Text style={styles.modelName}>SkinNet Classifier</Text>
              <Text style={styles.modelMeta}>v1.2.0 • INT8 Quantized • 7.8 MB</Text>
              <Text style={styles.hash}>SHA256: 8f3b2cbcf31222b0a9cdcb08...</Text>
            </View>
            <View style={styles.activeBadge}><Text style={styles.activeText}>ACTIVE</Text></View>
          </View>

          <View style={[styles.modelRow, { borderTopWidth: 1, borderColor: colors.border, paddingTop: 16 }]}>
            <View>
              <Text style={styles.modelName}>EyeNet Classifier</Text>
              <Text style={styles.modelMeta}>v1.1.0 • NNAPI Executed • 5.9 MB</Text>
              <Text style={styles.hash}>SHA256: c92850cd7c40e5a89f3cb2cb...</Text>
            </View>
            <View style={styles.activeBadge}><Text style={styles.activeText}>ACTIVE</Text></View>
          </View>
        </View>

        <Pressable style={styles.btnAction} onPress={checkUpdates} disabled={checking}>
          <Text style={styles.btnActionText}>Check for Safe Updates</Text>
        </Pressable>
        <Text style={styles.status}>{status}</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 18, borderRadius: 16, gap: 14 },
  title: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  desc: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
  divider: { height: 1, backgroundColor: colors.border },
  modelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modelName: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  modelMeta: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  hash: { color: colors.textMuted, fontSize: 10, marginTop: 4, fontFamily: 'monospace' },
  activeBadge: { backgroundColor: '#10b98120', borderColor: colors.success, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  activeText: { color: colors.success, fontSize: 10, fontWeight: 'bold' },
  btnAction: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnActionText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  status: { color: colors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 4 },
});
