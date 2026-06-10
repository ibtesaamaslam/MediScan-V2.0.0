import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface RecommendationCardProps {
  recommendation: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CLINICAL WORKFLOW RECOMMENDATIONS</Text>
      <Text style={styles.text}>{recommendation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b82f60a',
    borderColor: '#3b82f622',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
  },
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  }
});
