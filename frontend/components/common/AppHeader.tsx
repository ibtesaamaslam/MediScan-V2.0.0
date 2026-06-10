import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export const AppHeader: React.FC<HeaderProps> = ({ title, showBack = true, onBackPress, rightElement }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <Text style={styles.backText}>◀</Text>
          </Pressable>
        )}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      {rightElement && <View style={styles.rightContainer}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    backgroundColor: colors.surface
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    marginLeft: 16,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  }
});
