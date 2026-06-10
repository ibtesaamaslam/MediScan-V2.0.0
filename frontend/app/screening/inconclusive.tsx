import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';

export default function ScreeningSubPage() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Clinical Workflow Node" />
      <View style={{ padding: 24 }}>
        <Text style={{ color: 'white' }}>Core guided framing scanner is active. Adjust focus and light margins in the Diagnostic Sandbox.</Text>
      </View>
    </ScreenContainer>
  );
}