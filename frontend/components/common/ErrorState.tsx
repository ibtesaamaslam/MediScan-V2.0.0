import React from 'react';
import { View, Text, Run, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Interruption',
  message,
  onRetry,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry Sequence</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef44440b',
    borderColor: '#ef444422',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 12,
  },
  icon: {
    fontSize: 36,
    marginBottom: 12,
  },
  title: {
    color: colors.error,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 12,
  }
});
