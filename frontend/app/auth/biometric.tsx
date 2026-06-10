import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function BiometricSetup() {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleFinish = () => {
    // Save configuration and finalize setup
    router.replace('/dashboard/home');
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Device Security" showBack={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>🧬</Text>
          <Text style={styles.title}>Biometric Unlock</Text>
          <Text style={styles.subtitle}>
            Enable Face ID or Fingerprint scanning on your device to access patient files instantly without typing your PIN.
          </Text>

          <View style={styles.optionBox}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Use Fingerprint / Face ID</Text>
              <Text style={styles.optionDesc}>Saves authorization timestamps securely on your secure hardware chip.</Text>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isEnabled ? '#ffffff' : '#64748b'}
            />
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Complete Secure Calibration</Text>
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
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  optionTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  optionDesc: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
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
