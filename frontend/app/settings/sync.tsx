import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Switch } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function SettingsSync() {
  const [endpoint, setEndpoint] = useState('https://central-api.mediscan.local');
  const [autoSync, setAutoSync] = useState(true);
  const [status, setStatus] = useState('Idle');

  const executeSync = () => {
    setStatus('Synchronizing database...');
    setTimeout(() => {
      setStatus('Success! 4 records uploaded securely.');
    }, 1500);
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Synchronization Pathways" showBack={true} />
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Data Sync Settings</Text>
          <Text style={styles.desc}>Configure central directory targets for secure metadata ledger uploads.</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Central API Endpoint URL</Text>
            <TextInput
              style={styles.input}
              value={endpoint}
              onChangeText={setEndpoint}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={styles.rowLabel}>Opportunistic Auto Sync</Text>
              <Text style={styles.rowDesc}>Sync instantly whenever secure Wi-Fi or mobile link is established.</Text>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={autoSync ? '#ffffff' : '#64748b'}
            />
          </View>
        </View>

        <View style={styles.actionBox}>
          <Pressable style={styles.btnSync} onPress={executeSync}>
            <Text style={styles.btnSyncText}>Trigger Manual Synchronization</Text>
          </Pressable>
          <Text style={styles.statusLabel}>Sync Status: <Text style={{ color: colors.success, fontWeight: 'bold' }}>{status}</Text></Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 20 },
  formBox: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 18, borderRadius: 16, gap: 16 },
  title: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  desc: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
  formGroup: { gap: 8 },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: 'bold' },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    color: '#ffffff',
    fontSize: 14,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderColor: colors.border, paddingTop: 16 },
  rowLabel: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  rowDesc: { color: colors.textMuted, fontSize: 11, marginTop: 2, lineHeight: 14 },
  actionBox: { gap: 12, alignItems: 'center' },
  btnSync: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnSyncText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  statusLabel: { color: colors.textSecondary, fontSize: 12 },
});
