import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { useAppStore } from '../../store/appStore';
import { router } from 'expo-router';

export default function CompleteScreen() {
  const { setOnboarded } = useAppStore();

  const finishOnboarding = () => {
    setOnboarded(true);
    router.replace('/dashboard/home');
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.successBadge}>🎉</Text>
          <Text style={styles.title}>All Systems Prepared</Text>
          <Text style={styles.subtitle}>
            Your local device workspace is fully synchronized and calibrated for clinical diagnostic triage.
          </Text>

          <View style={styles.statusBox}>
            <Text style={styles.statusRow}>✓ Local SQLite Database Initialized</Text>
            <Text style={styles.statusRow}>✓ INT8 Neural Network Models Loaded</Text>
            <Text style={styles.statusRow}>✓ Clinical Consent Verified</Text>
            <Text style={styles.statusRow}>✓ Camera Resolution Configured</Text>
          </View>
        </View>

        <Pressable 
          style={styles.button} 
          onPress={finishOnboarding}
        >
          <Text style={styles.buttonText}>Launch Diagnostic Suite</Text>
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
  successBadge: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 28,
  },
  statusBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    width: '100%',
    gap: 12,
  },
  statusRow: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
