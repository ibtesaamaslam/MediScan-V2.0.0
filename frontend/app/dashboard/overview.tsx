import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function OverviewDashboard() {
  const metrics = [
    { title: 'Total Registered Triage', value: '142', emoji: '📊' },
    { title: 'Demographic Calibration', value: '94.2%', emoji: '🎯' },
    { title: 'Pending Sync Sessions', value: '4', emoji: '🔄' },
    { title: 'Active Health Workers', value: '12', emoji: '👩‍⚕️' }
  ];

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Workgroup Overview" showBack={true} />
      <View style={styles.container}>
        <View style={styles.metricsGrid}>
          {metrics.map((m, idx) => (
            <View key={idx} style={styles.metricCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.metricTitle}>{m.title}</Text>
                <Text style={styles.emoji}>{m.emoji}</Text>
              </View>
              <Text style={styles.metricValue}>{m.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.alertBox}>
          <Text style={styles.alertHeading}>⚠️ Offline Sync Action Required</Text>
          <Text style={styles.alertDesc}>
            There are 4 completed local diagnostic sessions awaiting secure HMAC validation before upload to central registry.
          </Text>
          <Pressable style={styles.btnAction} onPress={() => router.push('/chw/sync')}>
            <Text style={styles.btnActionText}>Navigate to Sync Ledger</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Model Status Check</Text>
        <View style={styles.modelRow}>
          <View>
            <Text style={styles.modelName}>SkinNet (MobileNetV3)</Text>
            <Text style={styles.modelVersion}>v1.2.0 • INT8 Quantized</Text>
          </View>
          <Text style={styles.statusActive}>HEALTHY</Text>
        </View>

        <View style={styles.modelRow}>
          <View>
            <Text style={styles.modelName}>EyeNet (EfficientNet-Lite)</Text>
            <Text style={styles.modelVersion}>v1.1.0 • NNAPI Executed</Text>
          </View>
          <Text style={styles.statusActive}>HEALTHY</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricTitle: { color: colors.textSecondary, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  emoji: { fontSize: 18 },
  metricValue: { color: '#ffffff', fontSize: 22, fontWeight: 'bold', marginTop: 8 },
  alertBox: {
    backgroundColor: '#f59e0b10',
    borderColor: colors.warning,
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
    marginBottom: 24,
  },
  alertHeading: { color: colors.warning, fontSize: 14, fontWeight: 'bold' },
  alertDesc: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18 },
  btnAction: { backgroundColor: colors.warning, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start', marginTop: 12 },
  btnActionText: { color: '#040815', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  modelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  modelName: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  modelVersion: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  statusActive: { color: colors.success, fontWeight: 'bold', fontSize: 11 },
});
