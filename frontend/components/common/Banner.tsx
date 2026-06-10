import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface BannerProps {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  style?: ViewStyle;
}

export const Banner: React.FC<BannerProps> = ({ message, type = 'info', style }) => {
  const getBannerConfig = () => {
    switch (type) {
      case 'warning':
        return { bg: '#f59e0b10', border: '#f59e0b33', text: colors.warning, icon: '⚠️' };
      case 'error':
        return { bg: '#ef444410', border: '#ef444433', text: colors.error, icon: '🛑' };
      case 'success':
        return { bg: '#10b98110', border: '#10b98133', text: colors.success, icon: '✅' };
      case 'info':
      default:
        return { bg: '#3b82f610', border: '#3b82f633', text: colors.info, icon: 'ℹ️' };
    }
  };

  const config = getBannerConfig();

  return (
    <View style={[styles.banner, { backgroundColor: config.bg, borderColor: config.border }, style]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.text, { color: config.text }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  }
});
