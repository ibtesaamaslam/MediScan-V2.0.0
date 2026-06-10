import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const ReferralChart: React.FC = () => {
  const categories = [
    { label: 'Mild Routine Monitoring', count: 65, color: colors.success, max: 80, hint: 'Assayed with low clinical suspicion' },
    { label: 'Moderate Clinic Follow-up', count: 20, color: colors.warning, max: 80, hint: 'Assessed with medium urgency triggers' },
    { label: 'Urgent Biopsy / Direct Referral', count: 11, color: colors.error, max: 80, hint: 'Pathology flags mandate immediate oncology review' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PATIENT TRIAGE & REFERRAL DISTRIBUTION</Text>
      
      <View style={styles.chartArea}>
        {categories.map((cat, idx) => {
          const barWidthPercentage = `${(cat.count / cat.max) * 100}%`;
          return (
            <View key={idx} style={styles.metricRow}>
              <View style={styles.rowLabel}>
                <Text style={styles.label}>{cat.label}</Text>
                <Text style={[styles.count, { color: cat.color }]}>{cat.count} Patients</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { backgroundColor: cat.color, width: barWidthPercentage }]} />
              </View>
              <Text style={styles.hintText}>{cat.hint}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.footerLabel}>
          <Text style={styles.fTerm}>Total Triage Records</Text>
          <Text style={styles.fVal}>96 Cases</Text>
        </View>
        <View style={styles.footerLabel}>
          <Text style={styles.fTerm}>Transfer Success</Text>
          <Text style={[styles.fVal, { color: colors.success }]}>100% Sync</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
  },
  title: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  chartArea: {
    gap: 16,
  },
  metricRow: {
    paddingBottom: 4,
  },
  rowLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  label: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 12,
    fontWeight: '900',
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: colors.border,
    borderWidth: 1,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  hintText: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#1e293b44',
    marginTop: 18,
    paddingTop: 12,
  },
  footerLabel: {
    alignItems: 'center',
    flex: 1,
  },
  fTerm: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: 'bold',
  },
  fVal: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 3,
  }
});
