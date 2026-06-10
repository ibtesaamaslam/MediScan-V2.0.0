import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/dashboard/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEDISCAN</Text>
      <Text style={styles.subtitle}>UNIVERSAL DECISION ENGINE</Text>
      <View style={styles.box}>
        <ActivityIndicator color={colors.success} size="small" />
        <Text style={styles.integrity}>Securing Local AES-256 Storage Nodes...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2
  },
  subtitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 4,
    marginTop: 8
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48,
    gap: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  integrity: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: 'monospace'
  }
});