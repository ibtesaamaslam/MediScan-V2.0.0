import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';

export default function CalibrationNode() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="ORT Calibration diagnostics" />
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>CPU Execution thread metrics:</Text>
        <Text style={styles.stat}>• SkinNet v1 size: 7.4 MB (Quantized INT8)</Text>
        <Text style={styles.stat}>• EyeNet v1 size: 5.2 MB (Quantized INT8)</Text>
        <Text style={styles.stat}>• Median Local Latency: 320ms</Text>
        <Text style={styles.stat}>• Base Execution FPS: 24 FPS</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  deck: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, marginTop: 16, border: '1px solid ' + colors.border },
  deckTitle: { color: colors.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  stat: { color: colors.textSecondary, fontFamily: 'monospace', marginVertical: 4 }
});