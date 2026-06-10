import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function DeveloperDiagnostics() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Model Calibration Sandbox" />
      
      <View style={styles.body}>
        <Pressable style={styles.row} onPress={() => router.push('/developer/model-status')}>
          <Text style={styles.txt}>ONNX Model Registration & manifest</Text>
          <Text style={styles.arr}>▶</Text>
        </Pressable>

        <Pressable style={styles.row} onPress={() => router.push('/developer/benchmark')}>
          <Text style={styles.txt}>On-Device FPS Memory & Thermal Benchmark</Text>
          <Text style={styles.arr}>▶</Text>
        </Pressable>

        <Pressable style={styles.row} onPress={() => router.push('/developer/calibration')}>
          <Text style={styles.txt}>Platt Temperature Curve calibration</Text>
          <Text style={styles.arr}>▶</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 18, borderBottomWidth: 1, borderBottomColor: colors.border },
  txt: { color: 'white', fontWeight: '500' },
  arr: { color: colors.textMuted }
});