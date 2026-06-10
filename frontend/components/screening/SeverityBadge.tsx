import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface SeverityBadgeProps {
  severity: 'mild' | 'moderate' | 'urgent';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const isUrgent = severity === 'urgent';
  const isModerate = severity === 'moderate';

  const badgeColor = isUrgent
    ? colors.error
    : isModerate
    ? colors.warning
    : colors.success;

  const bgAlphaColor = isUrgent
    ? '#ef444415'
    : isModerate
    ? '#f59e0b15'
    : '#10b98115';

  return (
    <View style={[styles.badge, { backgroundColor: bgAlphaColor, borderColor: badgeColor }]}>
      <View style={[styles.dot, { backgroundColor: badgeColor }]} />
      <Text style={[styles.text, { color: badgeColor }]}>
        {severity.toUpperCase()} TRIAGE
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
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
