import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

interface SettingRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export const SettingRow: React.FC<SettingRowProps> = ({ icon, title, subtitle, onPress, rightElement }) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container 
      onPress={onPress} 
      style={({ pressed }: any) => [
        styles.row,
        onPress && pressed && styles.pressed
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement && <View style={styles.right}>{rightElement}</View>}
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293bbb',
  },
  pressed: {
    backgroundColor: '#3b82f608',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  right: {
    marginLeft: 12,
  }
});
