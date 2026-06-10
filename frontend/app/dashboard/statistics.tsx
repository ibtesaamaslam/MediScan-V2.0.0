import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function StatisticsDashboard() {
  const diagnosisRates = [
    { label: 'Normal / Healthy No Lesion', count: 48, percentage: 34 },
    { label: 'Inflammatory Skin Conditions', count: 32, percentage: 23 },
    { label: 'Trachoma Ocular Indicators', count: 24, percentage: 17 },
    { label: 'Cataract Advanced Referrals', count: 18, percentage: 12 },
    { label: 'Inconclusive (Abstained Flag)', count: 20, percentage: 14 }
  ];

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinical Audit & Statistics" showBack={true} />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Demographic Bias Calibration</Text>
          <Text style={styles.cardDesc}>
            Offline Platt-calibrated accuracy audited across Fitzpatrick skin classifications (Type I - VI) to ensure algorithmic fairness.
          </Text>

          <View style={styles.chartRow}>
            <View style={styles.chartCol}>
              <Text style={styles.chartVal}>95.4%</Text>
              <Text style={styles.chartLbl}>Types I - III</Text>
            </View>
            <View style={styles.chartDivider} />
            <View style={styles.chartCol}>
              <Text style={styles.chartVal}>94.8%</Text>
              <Text style={styles.chartLbl}>Types IV - VI</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Diagnosis Distribution (N=142)</Text>
        <View style={styles.list}>
          {diagnosisRates.map((d, idx) => (
            <View key={idx} style={styles.distributionBox}>
              <View style={styles.distHeader}>
                <Text style={styles.distLabel}>{d.label}</Text>
                <Text style={styles.distCount}>{d.count} ({d.percentage}%)</Text>
              </View>
              {/* Process Bar representing percentage */}
              <View style={styles.barOuter}>
                <View style={[styles.barInner, { width: `${d.percentage}%` }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.cardSecondary}>
          <Text style={styles.perfLabel}>Latency Target (Samsung Exynos Benchmark):</Text>
          <Text style={styles.perfValue}>~114ms avg inference cycle</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 20, borderRadius: 16, marginBottom: 20 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  cardDesc: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18 },
  chartRow: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
  chartCol: { flex: 1, alignItems: 'center' },
  chartVal: { color: colors.success, fontSize: 24, fontWeight: 'bold' },
  chartLbl: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  chartDivider: { width: 1, height: 40, backgroundColor: colors.border },
  sectionTitle: { color: '#ffffff', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  list: { gap: 12, marginBottom: 24 },
  distributionBox: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 14, borderRadius: 12 },
  distHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  distLabel: { color: '#ffffff', fontSize: 13, fontWeight: '500' },
  distCount: { color: colors.primary, fontSize: 13, fontWeight: 'bold' },
  barOuter: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  barInner: { height: '100%', backgroundColor: colors.primary },
  cardSecondary: { backgroundColor: '#2563eb0a', borderColor: '#2563eb30', borderWidth: 1, padding: 16, borderRadius: 12, alignItems: 'center' },
  perfLabel: { color: colors.textSecondary, fontSize: 12 },
  perfValue: { color: '#ffffff', fontSize: 14, fontWeight: 'bold', marginTop: 2 }
});
