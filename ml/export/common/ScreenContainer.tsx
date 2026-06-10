import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar, I18nManager } from 'react-native';
import { colors } from '../../theme/colors';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ContainerProps> = ({ children, scrollable = false }) => {
  const containerStyle = [styles.safeArea, { direction: I18nManager.isRTL ? 'rtl' as const : 'ltr' as const }];
  
  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.outerContainer}>
        {scrollable ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.staticContent}>
            {children}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  outerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  staticContent: {
    flex: 1,
    paddingVertical: 16,
  }
});
