import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { useAppStore } from '../../store/appStore';

export default function SettingsHub() {
  const { activeLanguage, setLanguage } = useAppStore();

  const toggleLang = () => {
    setLanguage(activeLanguage === 'en' ? 'ur' : 'en');
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Setup Panel" />
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.txt}>System Language</Text>
          <Pressable style={styles.toggle} onPress={toggleLang}>
            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{activeLanguage.toUpperCase()}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.navRow} onPress={() => router.push('/settings/privacy')}>
          <Text style={styles.txt}>Clinical Disclaimers & Privacy</Text>
          <Text style={styles.arrow}>▶</Text>
        </Pressable>

        <Pressable style={styles.navRow} onPress={() => router.push('/settings/storage')}>
          <Text style={styles.txt}>Storage Allocation & Purge</Text>
          <Text style={styles.arrow}>▶</Text>
        </Pressable>

        <Pressable style={styles.navRow} onPress={() => router.push('/settings/security')}>
          <Text style={styles.txt}>PIN Biometric Security</Text>
          <Text style={styles.arrow}>▶</Text>
        </Pressable>

        <Pressable style={styles.navRow} onPress={() => router.push('/settings/about')}>
          <Text style={styles.txt}>Clinical Version Specifications</Text>
          <Text style={styles.arrow}>▶</Text>
        </Pressable>

        {/* Developer diagnostics link */}
        <Pressable style={[styles.navRow, { marginTop: 32, borderTopWidth: 1, borderTopColor: '#38bdf820' }]} onPress={() => router.push('/developer/diagnostics')}>
          <Text style={[styles.txt, { color: '#38bdf8' }]}>Developer Calibration Deck</Text>
          <Text style={{ color: '#38bdf8' }}>▶</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  txt: { color: 'white', fontWeight: '500' },
  toggle: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  arrow: { color: colors.textMuted }
});