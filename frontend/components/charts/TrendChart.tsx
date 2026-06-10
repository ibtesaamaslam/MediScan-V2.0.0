import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const TrendChart: React.FC = () => {
  const weeks = [
    { label: 'Wk 1', count: 18, active: false },
    { label: 'Wk 2', count: 24, active: false },
    { label: 'Wk 3', count: 15, active: false },
    { label: 'Wk 4', count: 32, active: true }, // Highlight current peak week
    { label: 'Wk 5', count: 21, active: false },
    { label: 'Wk 6', count: 28, active: false }
  ];

  const maxVal = 40;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SCREENING ACQUISITION RATE (WEEKLY)</Text>
      
      <View style={styles.gridContainer}>
        {/* Y Axis Guide Lines */}
        <View style={styles.yAxisLine} />
        <View style={[styles.yAxisLine, { bottom: '50%' }]} />
        
        <View style={styles.columnsWrapper}>
          {weeks.map((wk, idx) => {
            const hPercentage = `${(wk.count / maxVal) * 100}%`;
            return (
              <View key={idx} style={styles.barCol}>
                <View style={styles.barPath}>
                  <View style={[
                    styles.barFill, 
                    { 
                      height: hPercentage, 
                      backgroundColor: wk.active ? colors.primary : '#3b82f644',
                      borderColor: wk.active ? '#60a5fa' : 'transparent',
                    }
                  ]}>
                    <Text style={styles.valTip}>{wk.count}</Text>
                  </View>
                </View>
                <Text style={[styles.axisLabel, wk.active && { color: 'white', fontWeight: 'bold' }]}>
                  {wk.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.metaLabel}>✦ Highlighted columns denote active synchronizations</Text>
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
    marginBottom: 24,
  },
  gridContainer: {
    height: 150,
    position: 'relative',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  yAxisLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '0%',
    height: 1,
    backgroundColor: '#1e293bbb',
    borderStyle: 'dashed',
  },
  columnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 8,
    zIndex: 2,
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barPath: {
    height: '80%',
    width: 24,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  valTip: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  axisLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 8,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 9,
    alignSelf: 'center',
    marginTop: 10,
  }
});
