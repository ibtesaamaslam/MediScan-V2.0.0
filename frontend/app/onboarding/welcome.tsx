import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.logo}>🩺</Text>
          <Text style={styles.title}>MediScan Local</Text>
          <Text style={styles.subtitle}>
            Empowering community health workers with calibrated, offline clinical AI diagnostic triage.
          </Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ Offline-First Intelligence</Text>
            <Text style={styles.cardText}>
              All image analysis, ONNX models, and database records run 100% locally. No internet required.
            </Text>
          </View>
        </View>

        <Pressable 
          style={styles.button} 
          onPress={() => router.push('/onboarding/language')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
