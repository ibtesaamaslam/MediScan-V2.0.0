import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function DeveloperLogs() {
  const [logs, setLogs] = useState([
    { timestamp: '19:33:31', tag: 'SYSTEM', msg: 'MediScan Monorepo Core Ready. Port: 3000 mapping validated.' },
    { timestamp: '19:33:35', tag: 'ONNX_RT', msg: 'SkinNet inference session registered successfully. C++ delegates mapped.' },
    { timestamp: '19:34:02', tag: 'SQLITE', msg: 'Local encrypted database connection established securely.' },
    { timestamp: '19:34:15', tag: 'SYNC', msg: 'Sync dispatch completed. Code 200 returned from public central endpoint.' },
    { timestamp: '19:35:11', tag: 'CALIBR', msg: 'Platt curve recalibrated. Output variance minimized to < 0.05%.' }
  ]);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="System Telemetry Logs" showBack={true} />
      <View style={styles.container}>
        <View style={styles.ctrlBar}>
          <Text style={styles.logCount}>Showing {logs.length} events</Text>
          <Pressable style={styles.btnClear} onPress={clearLogs}>
            <Text style={styles.btnClearText}>CLEAR TElemetry</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.logBox} contentContainerStyle={styles.logContent}>
          {logs.length === 0 ? (
            <Text style={{ color: colors.textMuted, textAlign: 'center' }}>No log streams present.</Text>
          ) : (
            logs.map((log, idx) => (
              <View key={idx} style={styles.logRow}>
                <Text style={styles.time}>{log.timestamp}</Text>
                <View style={[styles.badge, { backgroundColor: log.tag === 'ONNX_RT' ? '#3b82f620' : '#a855f720' }]}>
                  <Text style={[styles.tag, { color: log.tag === 'ONNX_RT' ? colors.primary : '#a855f7' }]}>{log.tag}</Text>
                </View>
                <Text style={styles.msg}>{log.msg}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  ctrlBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  logCount: { color: colors.textSecondary, fontSize: 12, fontWeight: 'bold' },
  btnClear: { backgroundColor: '#ef444415', borderColor: colors.error, borderWidth: 1, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  btnClearText: { color: colors.error, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  logBox: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 14 },
  logContent: { gap: 10 },
  logRow: { flexDirection: 'row', alignItems: 'flex-start', borderBottomWidth: 0.5, borderColor: colors.border, paddingBottom: 8 },
  time: { color: colors.textMuted, fontSize: 10, fontFamily: 'monospace', width: '18%' },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
  tag: { fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' },
  msg: { color: colors.textSecondary, fontSize: 11, flex: 1, lineHeight: 15, fontFamily: 'monospace' },
});
