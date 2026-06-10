import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function SettingsSubDetails() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinical Policy Node" />
      <View style={styles.box}>
        <Text style={styles.info}>🔒 HIPAA Level-3 Patient Data Controls</Text>
        <Text style={styles.bodyText}>MediScan Local safeguards local audit databases using SQLite Encryption keys. Telemetry vectors are minimized and anonymized on startup.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, marginTop: 16, borderWidth: 1, borderColor: colors.border },
  info: { color: colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  bodyText: { color: colors.textSecondary, lineHeight: 1.6 }
});