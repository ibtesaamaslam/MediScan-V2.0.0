import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { useLocalSearchParams } from 'expo-router';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';
import { ScreeningResult } from '../../types/Screening';
import { ReportService } from '../../services/reports/ReportService';
import * as Sharing from 'expo-sharing';

export default function HistoryDetails() {
  const { id } = useLocalSearchParams();
  const [record, setRecord] = useState<ScreeningResult | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      ScreeningRepository.findById(id).then(setRecord);
    }
  }, [id]);

  const triggerPDFExport = async () => {
    if (!record) return;
    const path = await ReportService.exportToLocalPDF(record);
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(path);
    }
  };

  if (!record) {
    return (
      <ScreenContainer scrollable={true}>
        <Text style={{ color: 'white' }}>Audit entry not located.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinical Audit Detail" />
      <View style={styles.box}>
        <Text style={styles.title}>{record.conditionName}</Text>
        <Text style={styles.meta}>Triage Node: {record.moduleType.toUpperCase()}</Text>
        <Text style={styles.meta}>Logged: {new Date(record.timestamp).toLocaleString()}</Text>
        
        <View style={styles.metric}>
          <Text style={styles.mText}>Confidence: {(record.confidence * 100).toFixed(1)}%</Text>
          <Text style={styles.mText}>Assessed Severity: {record.severity.toUpperCase()}</Text>
        </View>

        <Text style={styles.label}>CLINICAL INTERPRETER NOTES:</Text>
        <Text style={styles.desc}>{record.recommendation}</Text>

        <Pressable style={styles.button} onPress={triggerPDFExport}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Export Secure PDF Report</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: colors.surface, border: '1px solid ' + colors.border, padding: 24, borderRadius: 16, marginTop: 16 },
  title: { fontSize: 24, fontWeight: '700', color: 'white' },
  meta: { color: colors.textSecondary, marginTop: 6, fontSize: 12 },
  metric: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.surfaceCard, padding: 12, borderRadius: 8, marginVertical: 18 },
  mText: { color: colors.success, fontSize: 12, fontWeight: 'bold' },
  label: { color: colors.textMuted, fontSize: 10, uppercase: true, fontWeight: 'bold', marginTop: 12 },
  desc: { color: colors.textPrimary, lineHeight: 1.6, fontSize: 14, marginTop: 6 },
  button: { backgroundColor: colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 24 }
});