import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function CHWSubProcess() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="CHW Session Flow" />
      <View style={{ padding: 24, gap: 16 }}>
        <Text style={{ color: 'white' }}>Batch session workspace active. Add patients or review queue logs.</Text>
        <Pressable style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' }} onPress={() => router.push('/chw')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Back to CHW Queue</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}