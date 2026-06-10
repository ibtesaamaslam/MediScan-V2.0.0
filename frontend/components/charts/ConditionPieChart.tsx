import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const ConditionPieChart: React.FC = () => {
  const data = [
    { label: 'Skin Pathology', percentage: 42, color: colors.primary, count: 68 },
    { label: 'Optical Pathology', percentage: 28, color: colors.warning, count: 45 },
    { label: 'Oral Lesions', percentage: 18, color: colors.success, count: 29 },
    { label: 'Wound Assessments', percentage: 12, color: colors.info, count: 18 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SCREEN COMPOSITION BY CLASSIFICATION</Text>
      
      {/* Outer Circle Visual Mimic */}
      <View style={styles.chartWrapper}>
        <View style={styles.donutCircle}>
          <View style={styles.donutValueContainer}>
            <Text style={styles.totalCount}>160</Text>
            <Text style={styles.totalLabel}>TOTAL SCREENS</Text>
          </View>
        </View>
      </View>

      {/* Legend list with custom styled progress bars */}
      <View style={styles.legendContainer}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.legendRow}>
            <View style={styles.rowTop}>
              <View style={styles.labelCol}>
                <View style={[styles.indicator, { backgroundColor: item.color }]} />
                <Text style={styles.label}>{item.label}</Text>
              </View>
              <View style={styles.valCol}>
                <Text style={styles.valPercent}>{item.percentage}%</Text>
                <Text style={styles.valCount}>({item.count} cases)</Text>
              </View>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { backgroundColor: item.color, width: `${item.percentage}%` }]} />
            </View>
          </View>
        ))}
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
    marginBottom: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  donutCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 8,
    borderColor: colors.primary,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: colors.background,
  },
  donutValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCount: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
  },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  legendContainer: {
    marginTop: 20,
    gap: 12,
  },
  legendRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b44',
    paddingBottom: 10,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  valCol: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valPercent: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  valCount: {
    color: colors.textMuted,
    fontSize: 9,
    marginLeft: 4,
  },
  barBg: {
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  }
});
