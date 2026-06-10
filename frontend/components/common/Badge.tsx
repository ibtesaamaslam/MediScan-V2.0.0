import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style, textStyle }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { bg: '#64748b15', border: colors.secondary, text: colors.secondary };
      case 'success':
        return { bg: '#10b98115', border: colors.success, text: colors.success };
      case 'warning':
        return { bg: '#f59e0b15', border: colors.warning, text: colors.warning };
      case 'error':
        return { bg: '#ef444415', border: colors.error, text: colors.error };
      case 'info':
        return { bg: '#3b82f615', border: colors.info, text: colors.info };
      case 'primary':
      default:
        return { bg: '#2563eb15', border: colors.primary, text: colors.primary };
    }
  };

  const currentVariant = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: currentVariant.bg, borderColor: currentVariant.border }, style]}>
      <Text style={[styles.text, { color: currentVariant.text }, textStyle]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
