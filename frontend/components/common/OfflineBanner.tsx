import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface OfflineBannerProps {
  offlineHeadline?: string;
  offlineDesc?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  offlineHeadline = 'OFFLINE MODE ACTIVE',
  offlineDesc = 'Local SQLite ledger and fully isolated ONNX WASM models are operational. All diagnostics persist on-device.'
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headline}>{offlineHeadline}</Text>
        <Text style={styles.desc}>{offlineDesc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f59e0b10',
    borderColor: '#f59e0b33',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  dotContainer: {
    marginRight: 10,
    marginTop: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
  },
  content: {
    flex: 1,
  },
  headline: {
    color: colors.warning,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  desc: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  }
});
