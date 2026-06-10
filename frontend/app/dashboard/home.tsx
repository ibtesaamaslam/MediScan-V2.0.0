import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from 'react-i18next';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';
import { ScreeningResult } from '../../types/Screening';

export default function HomeDashboard() {
  const { t } = useTranslation();
  const [recentList, setRecentList] = useState<ScreeningResult[]>([]);
  const isOnline = useAppStore(state => state.connectionStatus.isOnline);

  useEffect(() => {
    ScreeningRepository.getAll().then(setRecentList);
  }, []);

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{t('welcome_title')}</Text>
          <Text style={styles.subText}>{t('welcome_subtitle')}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: isOnline ? '#10b98120' : '#ef444420', borderColor: isOnline ? colors.success : colors.error }]}>
          <Text style={{ color: isOnline ? colors.success : colors.error, fontSize: 10, fontWeight: 'bold' }}>
            {isOnline ? t('online_banner_text') : t('offline_banner_text')}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t('quick_screen')}</Text>
      <View style={styles.grid}>
        <Pressable style={styles.gridCard} onPress={() => router.push('/screening/skin')}>
          <Text style={styles.cardEmoji}>🧴</Text>
          <Text style={styles.cardTitle}>{t('skin_screen')}</Text>
        </Pressable>
        <Pressable style={[styles.gridCard, { borderColor: '#10b98140' }]} onPress={() => router.push('/screening/eye')}>
          <Text style={styles.cardEmoji}>👁️</Text>
          <Text style={styles.cardTitle}>{t('eye_screen')}</Text>
        </Pressable>
        <Pressable style={[styles.gridCard, { borderColor: '#f59e0b40' }]} onPress={() => router.push('/screening/oral')}>
          <Text style={styles.cardEmoji}>🦷</Text>
          <Text style={styles.cardTitle}>{t('oral_screen')}</Text>
        </Pressable>
        <Pressable style={[styles.gridCard, { borderColor: '#a855f740' }]} onPress={() => router.push('/screening/wound')}>
          <Text style={styles.cardEmoji}>🩹</Text>
          <Text style={styles.cardTitle}>{t('wound_screen')}</Text>
        </Pressable>
      </View>

      <View style={styles.auditHeader}>
        <Text style={styles.sectionTitle}>{t('recent_screenings')}</Text>
        <Pressable onPress={() => router.push('/history')}>
          <Text style={{ color: colors.primary, fontSize: 13, fontWeight: 'bold' }}>View All</Text>
        </Pressable>
      </View>

      {recentList.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={{ color: colors.textMuted, fontSize: 14 }}>No local triage screenings recorded yet.</Text>
        </View>
      ) : (
        recentList.slice(0, 3).map(item => (
          <Pressable key={item.id} style={styles.historyCard} onPress={() => router.push(`/history/${item.id}`)}>
            <View>
              <Text style={styles.hxTitle}>{item.conditionName}</Text>
              <Text style={styles.hxSubtitle}>{item.moduleType.toUpperCase()} Screening • {new Date(item.timestamp).toLocaleDateString()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{(item.confidence * 100).toFixed(0)}%</Text>
              <Text style={{ color: colors.textMuted, fontSize: 10 }}>Calibrated</Text>
            </View>
          </Pressable>
        ))
      )}

      {/* Community health worker portal segment */}
      <Pressable style={styles.chwBanner} onPress={() => router.push('/chw')}>
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>👩‍⚕️ {t('batch_session')}</Text>
        <Text style={{ color: '#e2e8f0', fontSize: 12, marginTop: 4 }}>Access sequential screening, patients queue & referral registers</Text>
      </Pressable>

      <Pressable style={styles.settingsBanner} onPress={() => router.push('/settings')}>
        <Text style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 'bold' }}>⚙️ Setup & System Health Controls</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  subText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  emptyCard: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  hxTitle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  hxSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  chwBanner: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 14,
    marginTop: 24,
  },
  settingsBanner: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  }
});