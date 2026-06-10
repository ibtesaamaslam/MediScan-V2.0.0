import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAppStore } from '../store/appStore';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function EntryPoint() {
  const isOnboarded = useAppStore(state => state.isOnboarded);

  useEffect(() => {
    // Navigate straight to appropriate flow
    if (isOnboarded) {
      router.replace('/dashboard/home');
    } else {
      router.replace('/onboarding/welcome');
    }
  }, [isOnboarded]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}