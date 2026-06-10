import React from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function HistorySubPage() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Records Settings" />
      <View style={{ padding: 24 }}>
        <Text style={{ color: 'white' }}>Audit log query controls active.</Text>
      </View>
    </ScreenContainer>
  );
}