import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function PrivacyScreen() {
  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Data Privacy Policy</Text>
          <Text style={styles.subtitle}>Our strict privacy safeguards ensure your clinical operations are highly secure.</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔒</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>On-Device Processing Only</Text>
              <Text style={styles.featureDesc}>
                All images and diagnosis scans are processed instantly on-device using local models. No images are ever uploaded to standard cloud servers.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔑</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Encrypted SQLite Core</Text>
              <Text style={styles.featureDesc}>
                Clinical records are stored on your local disk in a heavily encrypted database ledger, preventing unauthorized extraction.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🌀</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Anonymized Metadata Sync</Text>
              <Text style={styles.featureDesc}>
                Optional data sync pathways only transmit aggregated health telemetry statistics (e.g., patient counts and regional disease labels), keeping patient PII safely secure.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable 
            style={styles.button} 
            onPress={() => router.push('/onboarding/permissions')}
          >
            <Text style={styles.buttonText}>Agree & Proceed</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
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
  scroll: {
    flex: 1,
    marginVertical: 12,
  },
  scrollContent: {
    gap: 20,
    paddingBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    alignItems: 'flex-start',
    gap: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    marginTop: 12,
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
