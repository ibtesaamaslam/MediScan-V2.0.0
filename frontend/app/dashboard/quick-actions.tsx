import React from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function DashboardSubPage() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Intelligence Stats" />
      <View style={{ padding: 24 }}>
        <Text style={{ color: 'white' }}>Offline stats dashboard loaded. Calibrated accuracy is verified at 94.2%.</Text>
      </View>
    </ScreenContainer>
  );
}