import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function PermissionsScreen() {
  const triggerPermissionsRequest = async () => {
    // In actual production runtime, we prompt camera permissions from Expo Camera layer.
    // For this onboarding UI experience:
    router.push('/onboarding/complete');
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Device Access</Text>
          <Text style={styles.subtitle}>MediScan Local requires a few permissions to function fully offline.</Text>
        </View>

        <View style={styles.list}>
          <View style={styles.permissionBox}>
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>📷</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.permissionTitle}>Camera Diagnostic Node</Text>
              <Text style={styles.permissionDesc}>Required to capture macro focus pictures of skin lesions, external eye conditions, and oral health.</Text>
            </View>
          </View>

          <View style={styles.permissionBox}>
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>💾</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.permissionTitle}>Secure Local storage</Text>
              <Text style={styles.permissionDesc}>Used to save screening records, patient registers, and model execution check hashes locally.</Text>
            </View>
          </View>
        </View>

        <Pressable 
          style={styles.button} 
          onPress={triggerPermissionsRequest}
        >
          <Text style={styles.buttonText}>Enable Access & Continue</Text>
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
  header: {
    marginTop: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  list: {
    gap: 16,
    marginVertical: 24,
  },
  permissionBox: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  permissionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  permissionDesc: {
    color: colors.textSecondary,
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
