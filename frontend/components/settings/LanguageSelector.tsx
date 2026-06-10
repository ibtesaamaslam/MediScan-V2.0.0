import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

export const LanguageSelector: React.FC = () => {
  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ur', label: 'Urdu', native: 'اردو' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'sw', label: 'Swahili', native: 'Kiswahili' }
  ];

  const [activeCode, setActiveCode] = useState('en');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CLINICAL INTERFACE LANGUAGE</Text>
      <View style={styles.grid}>
        {languages.map((lang) => {
          const isActive = lang.code === activeCode;
          return (
            <Pressable
              key={lang.code}
              style={[
                styles.card,
                isActive && styles.activeCard
              ]}
              onPress={() => setActiveCode(lang.code)}
            >
              <Text style={[styles.label, isActive && styles.activeText]}>
                {lang.label}
              </Text>
              <Text style={[styles.nativeLabel, isActive && styles.activeSubtext]}>
                {lang.native}
              </Text>
              {isActive && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
  },
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  card: {
    width: '47%',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    margin: '1.5%',
    position: 'relative',
  },
  activeCard: {
    borderColor: colors.primary,
    backgroundColor: '#3b82f60a',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  nativeLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'sans-serif',
  },
  activeText: {
    color: 'white',
  },
  activeSubtext: {
    color: colors.primary,
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'black',
  }
});
