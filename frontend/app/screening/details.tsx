import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function ScreeningDetails() {
  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Intake Diagnostic Details" showBack={true} />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.label}>Clinical Triage Label</Text>
          <Text style={styles.value}>Tinea Versicolor Fungal Lesion</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Model Confidence Calibration</Text>
          <Text style={[styles.value, { color: colors.success }]}>94.5% Confidence Score</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Assessed Severity Rating</Text>
          <Text style={[styles.value, { color: colors.warning }]}>Moderate Severity</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Primary Action Recommendation</Text>
          <Text style={styles.paragraph}>
            Apply topical clotrimazole 1% cream twice daily for 2 weeks. Keep lesion area fully dry. If lesion spreads or shows secondary bacterial infection, proceed to clinical care.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Alternative Differential Diagnoses</Text>
          <Text style={styles.paragraph}>
            1. Seborrheic dermatitis (24.2% likelihood)
            {"\n"}2. Pityriasis rosea (11.8% likelihood)
          </Text>
        </View>

        <Pressable 
          style={styles.button} 
          onPress={() => router.replace('/dashboard/home')}
        >
          <Text style={styles.buttonText}>Return to Main Workspace</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  section: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  value: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  paragraph: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 18 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
