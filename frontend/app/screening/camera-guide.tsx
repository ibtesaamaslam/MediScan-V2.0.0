import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function CameraGuide() {
  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Focal Photography Guide" showBack={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>📸</Text>
          <Text style={styles.title}>Guided Shutter Protocol</Text>
          <Text style={styles.subtitle}>
            Accurate on-device inference relies heavily on image clarity and exposure.
          </Text>

          <View style={styles.guideBox}>
            <Text style={styles.guideRow}>📏 Keep 10 - 15 cm distance from focus area.</Text>
            <Text style={styles.guideRow}>💡 Ensure even, ambient lighting (use flash if dim).</Text>
            <Text style={styles.guideRow}>✋ Keep your hands stable to avoid lens motion blur.</Text>
            <Text style={styles.guideRow}>🎯 Align center reticle with target skin/eye/oral spot.</Text>
          </View>
        </View>

        <Pressable 
          style={styles.button} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Acknowledge & Return</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 24,
  },
  guideBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    borderRadius: 14,
    width: '100%',
    gap: 12,
  },
  guideRow: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
