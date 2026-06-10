import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface ImagePreviewProps {
  uri?: string;
  style?: ViewStyle;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ uri, style }) => {
  return (
    <View style={[styles.container, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📸</Text>
          <Text style={styles.placeholderText}>No Active Capture Received</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.background,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  placeholderIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  }
});
