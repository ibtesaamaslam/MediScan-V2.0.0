import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function ConsentScreen() {
  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Clinical Consent</Text>
          <Text style={styles.subtitle}>Please review the ethical guidelines for utilizing MediScan Local in the field.</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>1. Advisory Triage Only</Text>
          <Text style={styles.bodyText}>
            This application is designed as an advisory triage and screening tool using on-device quantized neural networks. It does not replace definitive clinical consultation or laboratory histopathology.
          </Text>

          <Text style={styles.sectionTitle}>2. Patient Informed Oral Consent</Text>
          <Text style={styles.bodyText}>
            Community health workers must explain the tool to each patient in their preferred local dialect, obtaining explicit oral consent before capturing clinical photographs.
          </Text>

          <Text style={styles.sectionTitle}>3. Extreme Sensitivity & Safety</Text>
          <Text style={styles.bodyText}>
            For cases identified as high-risk or suspicious (e.g., suspected malignancies or severe ocular infections), prompt clinical referral to nearest hospital must be initiated immediately, regardless of model confidence score.
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable 
            style={styles.button} 
            onPress={() => router.push('/onboarding/privacy')}
          >
            <Text style={styles.buttonText}>I Understand & Agree</Text>
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  bodyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
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
