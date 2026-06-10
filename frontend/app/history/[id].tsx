import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { useLocalSearchParams, router } from 'expo-router';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';
import { ScreeningResult } from '../../types/Screening';
import { ReportService } from '../../services/reports/ReportService';
import * as Sharing from 'expo-sharing';

export default function HistoryDetails() {
  const { id } = useLocalSearchParams();
  const [record, setRecord] = useState<ScreeningResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      ScreeningRepository.findById(id)
        .then((found) => {
          setRecord(found);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const triggerPDFExport = async () => {
    if (!record) return;
    try {
      setExporting(true);
      const path = await ReportService.exportToLocalPDF(record);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
      } else {
        alert(`PDF exported to: ${path}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate or share report.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer scrollable={false}>
        <AppHeader title="Clinical Audit Detail" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  if (!record) {
    return (
      <ScreenContainer scrollable={false}>
        <AppHeader title="Clinical Audit Detail" />
        <View style={styles.center}>
          <Text style={styles.errorText}>Audit entry not located.</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Return to History</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinical Audit Detail" />
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.badgeRow}>
            <View style={[styles.moduleBadge, { backgroundColor: colors.surfaceCard }]}>
              <Text style={styles.badgeLabel}>{record.moduleType.toUpperCase()} MODULE</Text>
            </View>
            <View style={[styles.severityBadge, { 
              backgroundColor: record.severity === 'urgent' ? '#ef44441a' : record.severity === 'moderate' ? '#f59e0b1a' : '#10b9811a',
              borderColor: record.severity === 'urgent' ? colors.error : record.severity === 'moderate' ? colors.warning : colors.success
            }]}>
              <Text style={{ 
                color: record.severity === 'urgent' ? colors.error : record.severity === 'moderate' ? colors.warning : colors.success,
                fontSize: 10,
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {record.severity}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{record.conditionName}</Text>
          <Text style={styles.meta}>Diagnostic ID: #{record.id}</Text>
          <Text style={styles.meta}>Logged: {new Date(record.timestamp).toLocaleString()}</Text>
          
          <View style={styles.metric}>
            <View>
              <Text style={styles.metricVal}>{(record.confidence * 100).toFixed(1)}%</Text>
              <Text style={styles.metricLbl}>CONFIDENCE INDEX</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.metricVal}>{record.severity.toUpperCase()}</Text>
              <Text style={styles.metricLbl}>TRIAGE CLASSIFICATION</Text>
            </View>
          </View>

          <Text style={styles.label}>CLINICAL INTERPRETER ANALYSIS</Text>
          <Text style={styles.desc}>{record.recommendation}</Text>

          {record.differentials && record.differentials.length > 0 && (
            <View style={styles.diffSection}>
              <Text style={styles.label}>DIFFERENTIAL DIAGNOSES CONSIDERING</Text>
              {record.differentials.map((diff, index) => (
                <View key={index} style={styles.diffRow}>
                  <Text style={styles.diffBullet}>•</Text>
                  <Text style={styles.diffText}>{diff}</Text>
                </View>
              ))}
            </View>
          )}

          <Pressable 
            style={[styles.button, exporting && { opacity: 0.6 }]} 
            onPress={triggerPDFExport}
            disabled={exporting}
          >
            {exporting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Export Secure PDF Report</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  moduleBadge: {
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: 'bold',
  },
  severityBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    lineHeight: 28,
  },
  meta: {
    color: colors.textMuted,
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3b82f60a',
    borderColor: '#3b82f61a',
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginVertical: 20,
  },
  metricVal: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLbl: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 3,
  },
  label: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  desc: {
    color: colors.textPrimary,
    lineHeight: 22,
    fontSize: 14,
    marginTop: 6,
  },
  diffSection: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  diffBullet: {
    color: colors.primary,
    fontSize: 18,
    marginRight: 6,
  },
  diffText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 26,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
