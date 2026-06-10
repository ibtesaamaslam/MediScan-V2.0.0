import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const CaptureGuide: React.FC = () => {
  const guidelines = [
    { num: '1', title: 'Optimal Illumination', text: 'Ensure standard ambient daylight or activate camera torch. Avoid casting heavy shadows.' },
    { num: '2', title: 'Macro Focus Alignment', text: 'Keep lens parallel and located 10-15cm away from target pathology. Hold phone steady.' },
    { num: '3', title: 'Avoid Motion Blur', text: 'Wait for focus indicators to lock green. Ensure maximum resolution intake.' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CAMERA CAPTURE PATHOLOGY PROTOCOL</Text>
      {guidelines.map((g) => (
        <View key={g.num} style={styles.row}>
          <View style={styles.numBox}>
            <Text style={styles.numText}>{g.num}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{g.title}</Text>
            <Text style={styles.desc}>{g.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
  },
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  numBox: {
    backgroundColor: '#3b82f615',
    borderColor: '#3b82f633',
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  numText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  desc: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  }
});
