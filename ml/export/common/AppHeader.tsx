import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export const AppHeader: React.FC<HeaderProps> = ({ title, showBack = true }) => {
  return (
    <View style={styles.header}>
      {showBack && (
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>◀</Text>
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    backgroundColor: colors.surface
  },
  backButton: {
    marginRight: 16,
    padding: 8
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
