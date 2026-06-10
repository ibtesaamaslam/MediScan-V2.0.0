import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function HistoryTimeline() {
  const events = [
    { date: 'Today, 14:24', title: 'Skin Screening Completed', desc: 'Patient Amina Bibi, diagnosed with suspicious lesion, urgent clinical referral printed.', status: 'completed' },
    { date: 'Yesterday, 10:12', title: 'Ocular Intake Evaluation', desc: 'Patient Rajesh Kumar, Cataract opacity level 2 identified.', status: 'completed' },
    { date: '05 Jun 2026', title: 'Batch Database Sync', desc: 'Synchronized 18 history files with the aggregate regional PostgreSQL server.', status: 'sync' },
    { date: '02 Jun 2026', title: 'Device Calibration Completed', desc: 'Recalibrated Platt output margins against test accuracy thresholds.', status: 'system' }
  ];

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Chronological Timeline" showBack={true} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {events.map((ev, idx) => (
          <View key={idx} style={styles.timelineRow}>
            <View style={styles.leftCol}>
              <Text style={styles.date}>{ev.date}</Text>
            </View>

            <View style={styles.markerCol}>
              <View style={[styles.circle, { backgroundColor: ev.status === 'sync' ? colors.success : colors.primary }]} />
              {idx < events.length - 1 ? <View style={styles.vertLine} /> : null}
            </View>

            <View style={styles.rightCol}>
              <View style={styles.bubble}>
                <Text style={styles.title}>{ev.title}</Text>
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
  timelineRow: { flexDirection: 'row', minHeight: 90 },
  leftCol: { width: '25%', paddingRight: 8, alignItems: 'flex-end' },
  date: { color: colors.textSecondary, fontSize: 11, fontWeight: 'bold', textAlign: 'right' },
  markerCol: { width: '10%', alignItems: 'center' },
  circle: { width: 12, height: 12, borderRadius: 6, zIndex: 1 },
  vertLine: { width: 1.5, flex: 1, backgroundColor: colors.border },
  rightCol: { width: '65%', paddingLeft: 8, pb: 16 },
  bubble: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginTop: -4,
  },
  title: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  desc: { color: colors.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 }
});
