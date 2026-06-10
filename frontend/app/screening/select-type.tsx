import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function SelectScreeningType() {
  const types = [
    { code: 'skin', title: '🧴 Skin Lesion Screening', desc: 'Classification for 12 conditions including eczemas, ringworms, and suspicious moles.', route: '/screening/skin', labelColor: '#3b82f6' },
    { code: 'eye', title: '👁️ Ocular External Analysis', desc: 'Screening for cataract progression, conjunctivitis indicators, and trachoma.', route: '/screening/eye', labelColor: '#10b981' },
    { code: 'oral', title: '🦷 Oral Mucosa Screening', desc: 'Assessment of lesions, leukoplakias, and potential structural cancers.', route: '/screening/oral', labelColor: '#f59e0b' },
  ];

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Active Intake Node" showBack={true} />
      <View style={styles.container}>
        <View style={styles.introBox}>
          <Text style={styles.title}>Select Disease Vector</Text>
          <Text style={styles.subtitle}>Trigger calibrated mobile camera matrices for instant visual triage.</Text>
        </View>

        <View style={styles.grid}>
          {types.map((t) => (
            <Pressable
              key={t.code}
              style={[styles.card, { borderLeftColor: t.labelColor }]}
              onPress={() => router.push(t.route as any)}
            >
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{t.title}</Text>
              </View>
              <Text style={styles.cardDesc}>{t.desc}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  introBox: { marginBottom: 24 },
  title: { color: '#ffffff', fontSize: 22, fontWeight: '900' },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 18 },
  grid: { gap: 16 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 18,
    borderRadius: 14,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  cardDesc: { color: colors.textSecondary, fontSize: 12, marginTop: 6, lineHeight: 16 },
});
