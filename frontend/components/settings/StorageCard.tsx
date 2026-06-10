import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { colors } from '../../theme/colors';

export const StorageCard: React.FC = () => {
  const [cacheSize, setCacheSize] = useState('146.4 MB');

  const handleClearCache = () => {
    Alert.alert(
      "Confirm Cache Clear",
      "Are you sure you want to delete all cached intake images and free up on-device storage?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear Files", 
          onPress: () => {
            setCacheSize('0.0 KB');
            alert("Local file cache purged successfully.");
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OFFLINE LOGS & DATA ALLOCATION</Text>

      <View style={styles.barContainer}>
        <View style={styles.barLabelRow}>
          <Text style={styles.barTitle}>SQLite DB & Images</Text>
          <Text style={styles.barVal}>{cacheSize} / 500 MB</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: cacheSize === '0.0 KB' ? '0%' : '29.2%' }]} />
        </View>
        <Text style={styles.hint}>Approximate offline capability: ~150 diagnostic screenings with full photography.</Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>SQLite</Text>
          <Text style={styles.metricLbl}>INDEX ENGINE</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>4.2 MB</Text>
          <Text style={styles.metricLbl}>LEDGER SPACE</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>142.2 MB</Text>
          <Text style={styles.metricLbl}>IMAGE STORE</Text>
        </View>
      </View>

      <Pressable style={styles.btn} onPress={handleClearCache}>
        <Text style={styles.btnText}>Purge Image Cache</Text>
      </Pressable>
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
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 18,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  barVal: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#1e293b55',
    borderRightWidth: 1,
  },
  metricVal: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  metricLbl: {
    color: colors.textMuted,
    fontSize: 7,
    marginTop: 4,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  btn: {
    backgroundColor: '#ef44440a',
    borderColor: '#ef444433',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: 'bold',
  }
});
