import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const PdfPreview: React.FC<any> = ({ id, label, children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Clinical Widget: PdfPreview</Text>
      <Text style={styles.subtitle}>{label || 'Safe diagnostic telemetry check (OK)'}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.surface, border: '1px solid ' + colors.border, borderRadius: 12, marginVertical: 6 },
  title: { color: colors.primary, fontWeight: 'bold', fontSize: 13, fontFamily: 'monospace' },
  subtitle: { color: colors.textSecondary, fontSize: 11, marginTop: 4 }
});