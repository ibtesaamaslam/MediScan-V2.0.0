import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { colors } from '../../theme/colors';
import { useAppStore } from '../../store/appStore';
import { router } from 'expo-router';

export default function LanguageScreen() {
  const { activeLanguage, setLanguage } = useAppStore();

  const locales = [
    { code: 'en', label: 'English', desc: 'Standard clinical terminology' },
    { code: 'ur', label: 'اردو', desc: 'اردو صحت اسسٹنٹ (RTL layout)' },
    { code: 'hi', label: 'हिन्दी', desc: 'हिन्दी चिकित्सा सहायक' },
    { code: 'sw', label: 'Kiswahili', desc: 'Msaidizi wa matibabu' },
  ];

  const handleSelect = (code: string) => {
    setLanguage(code);
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Language / زبان / भाषा</Text>
          <Text style={styles.subtitle}>Select your preferred clinical language for diagnosis instructions.</Text>
        </View>

        <View style={styles.list}>
          {locales.map((item) => {
            const isSelected = activeLanguage === item.code;
            return (
              <Pressable
                key={item.code}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => handleSelect(item.code)}
              >
                <View>
                  <Text style={[styles.optionLabel, isSelected && styles.textWhite]}>
                    {item.label}
                  </Text>
                  <Text style={styles.optionDesc}>{item.desc}</Text>
                </View>
                {isSelected && (
                  <View style={styles.checkedCircle}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <Pressable 
          style={styles.button} 
          onPress={() => router.push('/onboarding/consent')}
        >
          <Text style={styles.buttonText}>Confirm & Continue</Text>
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
    marginVertical: 24,
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    borderRadius: 14,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#2563eb15',
  },
  optionLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#ffffff',
  },
  optionDesc: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  checkedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
