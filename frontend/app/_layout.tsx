import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAppStore } from '../store/appStore';
import { I18nManager } from 'react-native';
import { colors } from '../theme/colors';
import '../locales/index'; // Init i18next

export default function RootLayout() {
  const activeLanguage = useAppStore(state => state.activeLanguage);

  useEffect(() => {
    const isUrdu = activeLanguage === 'ur';
    if (I18nManager.isRTL !== isUrdu) {
      I18nManager.forceRTL(isUrdu);
    }
  }, [activeLanguage]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/consent" options={{ title: 'Informed Consent' }} />
      <Stack.Screen name="onboarding/language" options={{ title: 'Select Language' }} />
      <Stack.Screen name="onboarding/permissions" options={{ title: 'Grant Permissions' }} />
      <Stack.Screen name="onboarding/completed" options={{ headerShown: false }} />
    </Stack>
  );
}