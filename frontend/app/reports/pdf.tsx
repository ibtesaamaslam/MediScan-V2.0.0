import React from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function ReportsHub() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinician Report Hub" />
      <View style={{ padding: 24 }}>
        <Text style={{ color: 'white' }}>PDF report generation modules are loaded. Export is accessible from any history audit entry card details.</Text>
      </View>
    </ScreenContainer>
  );
}