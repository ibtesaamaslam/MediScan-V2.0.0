import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const AppFooter: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>MediScan Suite v2.0 • Offline Primary Care</Text>
      <Text style={styles.subText}>Secure Regional Diagnostic Ledger • Platt-Calibrated</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  subText: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
    fontWeight: '500',
  }
});
