import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function HistoryTimeline() {
  const events = [
    { date: 'Today, 14:24', title: 'Skin Screening Completed', desc: 'Analyzed suspicious lesion image using local CNN model. Triage urgency assessed as MODERATE.', status: 'completed' },
    { date: 'Yesterday, 10:12', title: 'Ocular Intake Evaluation', desc: 'Identified Conjunctivitis infection pathology under LED focal illumination support.', status: 'completed' },
    { date: '05 Jun 2026', title: 'Batch Database Sync', desc: 'Synchronized 18 history files with the aggregate regional PostgreSQL server. 100% data integrity verified.', status: 'sync' },
    { date: '02 Jun 2026', title: 'Device Calibration Completed', desc: 'Recalibrated camera light balance and lux sensors against clinical targets.', status: 'system' }
  ];

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Chronological Timeline" showBack={true} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.introHeader}>AUDIT LEDGER ACTIVITY TRAIL</Text>
        {events.map((ev, idx) => (
          <View key={idx} style={styles.timelineRow}>
            <View style={styles.leftCol}>
              <Text style={styles.date}>{ev.date}</Text>
            </View>

            <View style={styles.markerCol}>
              <View style={[styles.circle, { 
                backgroundColor: ev.status === 'sync' ? colors.success : ev.status === 'system' ? colors.warning : colors.primary 
              }]} />
              {idx < events.length - 1 ? <View style={styles.vertLine} /> : null}
            </View>

            <View style={styles.rightCol}>
              <View style={styles.bubble}>
                <View style={styles.bubbleHeaderRow}>
                  <Text style={styles.title}>{ev.title}</Text>
                  <Text style={[styles.statusBadge, {
                    color: ev.status === 'sync' ? colors.success : ev.status === 'system' ? colors.warning : colors.primary
                  }]}>
                    {ev.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.desc}>{ev.desc}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  introHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  timelineRow: { flexDirection: 'row', minHeight: 96 },
  leftCol: { width: '25%', paddingRight: 8, alignItems: 'flex-end' },
  date: { color: colors.textSecondary, fontSize: 11, fontWeight: 'bold', textAlign: 'right' },
  markerCol: { width: '10%', alignItems: 'center' },
  circle: { width: 10, height: 10, borderRadius: 5, zIndex: 1, marginTop: 4 },
  vertLine: { width: 1.5, flex: 1, backgroundColor: colors.border, marginVertical: 4 },
  rightCol: { width: '65%', paddingLeft: 8, paddingBottom: 16 },
  bubble: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    marginTop: -4,
  },
  bubbleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  statusBadge: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  desc: { color: colors.textSecondary, fontSize: 11, lineHeight: 16 }
});
