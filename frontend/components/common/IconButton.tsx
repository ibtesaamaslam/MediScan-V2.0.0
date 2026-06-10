import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  iconStyle?: TextStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, disabled = false, style, iconStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.iconText, iconStyle]}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    backgroundColor: '#3b82f61a',
    borderColor: colors.primary,
  },
  iconText: {
    color: colors.textPrimary,
    fontSize: 18,
    textAlign: 'center',
  }
});
