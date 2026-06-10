import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function ChwReferrals() {
  const referrals = [
    { id: '1', patient: 'Amina Bibi', condition: 'Basal Cell Carcinoma Suspicion', clinic: 'District General Hospital', status: 'pending' },
    { id: '2', patient: 'John Doe', condition: 'Cataract advanced degradation', clinic: 'Rural Surgical Outreach Camp', status: 'referred' },
    { id: '3', patient: 'Zainab Bibi', condition: 'Inflammatory Eczema Acute', clinic: 'Community Primary Clinic', status: 'resolved' },
  ];

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Referrals & Handoffs" showBack={true} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Clinical Referral Registry</Text>
          <Text style={styles.subtext}>Monitor institutional handoffs and coordinate outpatient follow-ups.</Text>
        </View>

        <FlatList
          data={referrals}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.patient}>{item.patient}</Text>
                <Text style={styles.desc}>{item.condition}</Text>
                <Text style={styles.clinic}>📍 {item.clinic}</Text>
              </View>

              <View style={[styles.badge, { backgroundColor: item.status === 'resolved' ? '#10b98120' : '#ef444420' }]}>
                <Text style={{ color: item.status === 'resolved' ? colors.success : colors.error, fontSize: 10, fontWeight: 'bold' }}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  heading: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  subtext: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  list: { gap: 10 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patient: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  desc: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  clinic: { color: colors.textMuted, fontSize: 11, marginTop: 6 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
});
