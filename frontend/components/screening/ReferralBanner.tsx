import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ReferralBannerProps {
  clinicianNotes?: string;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({
  clinicianNotes = 'Pathology warrants referral follow-up. Please schedule a specialized clinic review.'
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🏥</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>REFERRAL REQUIRED</Text>
        <Text style={styles.description}>{clinicianNotes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ef444410',
    borderColor: '#ef444433',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.error,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  }
});
