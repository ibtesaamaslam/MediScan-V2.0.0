import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface DifferentialListProps {
  differentials: string[];
}

export const DifferentialList: React.FC<DifferentialListProps> = ({ differentials }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DIFFERENTIAL CLASSIFIERS METRIC</Text>
      {differentials && differentials.length > 0 ? (
        differentials.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <View style={styles.badgeIndex}>
              <Text style={styles.badgeText}>{idx + 1}</Text>
            </View>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No secondary differential pathologies computed.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
  },
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 41, 59, 0.4)',
  },
  badgeIndex: {
    backgroundColor: '#3b82f615',
    borderColor: '#3b82f633',
    borderWidth: 1,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: 'black',
  },
  itemText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  }
});
