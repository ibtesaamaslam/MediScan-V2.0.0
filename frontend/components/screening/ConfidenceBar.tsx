import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ConfidenceBarProps {
  confidence: number; // probability between 0 and 1
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence }) => {
  const percentage = Math.min(100, Math.max(0, confidence * 100));
  
  const getConfidenceColor = () => {
    if (percentage >= 85) return colors.success;
    if (percentage >= 50) return colors.warning;
    return colors.error;
  };

  const activeColor = getConfidenceColor();

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.title}>PATHOLOGY CONFIDENCE PROBABILITY</Text>
        <Text style={[styles.val, { color: activeColor }]}>{percentage.toFixed(1)}%</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: activeColor }]} />
      </View>
      <Text style={styles.hint}>Platt-Calibrated SVM Sigmoid model calculation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  title: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  val: {
    fontSize: 14,
    fontWeight: '900',
  },
  barBg: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 4,
    fontFamily: 'monospace',
  }
});
