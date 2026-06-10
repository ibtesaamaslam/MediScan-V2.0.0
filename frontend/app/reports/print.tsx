import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function ReportsPrint() {
  const triggerPrint = async () => {
    // Under actual runtime conditions, we leverage standard expo-print mechanisms.
    // For this prototype, we simulate successful connection to receipt printers!
    alert('Connecting to nearby Wi-Fi thermal printer...');
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Print Diagnostic Report" showBack={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🖨️</Text>
          <Text style={styles.title}>Printer Configuration</Text>
          <Text style={styles.subtitle}>
            Connect and dispatch certified PDF reports straight to adjacent A4 or localized bluetooth thermal printers.
          </Text>

          <View style={styles.optionsBox}>
            <View style={styles.row}>
              <Text style={styles.optionLabel}>Paper Sizing</Text>
              <Text style={styles.optionValue}>ISO Standard A4</Text>
            </View>
            <View style={[styles.row, { borderTopWidth: 1, borderColor: colors.border, paddingTop: 12 }]}>
              <Text style={styles.optionLabel}>Color Scale</Text>
              <Text style={styles.optionValue}>High Contrast Monochrome</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.button} onPress={triggerPrint}>
          <Text style={styles.buttonText}>Print Now</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between', backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  subtitle: { color: colors.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 18, marginBottom: 28 },
  optionsBox: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 18, borderRadius: 14, width: '100%', gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionLabel: { color: colors.textSecondary, fontSize: 13, fontWeight: '500' },
  optionValue: { color: colors.primary, fontSize: 13, fontWeight: 'bold' },
  button: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
