import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';
import { ScreeningResult } from '../../types/Screening';

export default function ScreeningHistory() {
  const [list, setList] = useState<ScreeningResult[]>([]);

  useEffect(() => {
    ScreeningRepository.getAll()
      .then((records) => {
        setList(records);
      })
      .catch(() => {
        // Fallback for safety/preview
        setList([]);
      });
  }, []);

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Screening Audit Records" />
      
      {/* Quick Access Subpages */}
      <View style={styles.actionGrid}>
        <Pressable style={styles.actionTab} onPress={() => router.push('/history/search')}>
          <Text style={styles.tabIcon}>🔍</Text>
          <Text style={styles.tabLabel}>Search</Text>
        </Pressable>
        <Pressable style={styles.actionTab} onPress={() => router.push('/history/filters')}>
          <Text style={styles.tabIcon}>🎛️</Text>
          <Text style={styles.tabLabel}>Filters</Text>
        </Pressable>
        <Pressable style={styles.actionTab} onPress={() => router.push('/history/timeline')}>
          <Text style={styles.tabIcon}>⏳</Text>
          <Text style={styles.tabLabel}>Timeline</Text>
        </Pressable>
        <Pressable style={styles.actionTab} onPress={() => router.push('/history/export')}>
          <Text style={styles.tabIcon}>📤</Text>
          <Text style={styles.tabLabel}>Export</Text>
        </Pressable>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Local Diagnostics Index</Text>
        <Text style={styles.countBadge}>{list.length} Items</Text>
      </View>

      {list.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No local screenings found on-record.</Text>
          <Pressable style={styles.startButton} onPress={() => router.push('/dashboard/home')}>
            <Text style={styles.startButtonText}>Start New Screening</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => router.push(`/history/${item.id}`)}>
              <View style={styles.cardMain}>
                <View style={styles.dotContainer}>
                  <View style={[styles.statusDot, { 
                    backgroundColor: item.severity === 'urgent' ? colors.error : item.severity === 'moderate' ? colors.warning : colors.success 
                  }]} />
                </View>
                <View style={styles.textBlock}>
                  <Text style={styles.cName} numberOfLines={1}>{item.conditionName}</Text>
                  <Text style={styles.cMeta}>
                    {item.moduleType?.toUpperCase()} MODULE • {new Date(item.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.score}>{(item.confidence * 100).toFixed(0)}%</Text>
                <Text style={styles.scoreLabel}>CONFIDENCE</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 14,
  },
  actionTab: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  countBadge: {
    fontSize: 11,
    color: colors.primary,
    backgroundColor: '#3b82f61a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 6,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotContainer: {
    marginRight: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textBlock: {
    flex: 1,
  },
  cName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cMeta: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  cardRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  score: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 16,
  },
  scoreLabel: {
    fontSize: 8,
    color: colors.textMuted,
    fontWeight: 'bold',
    marginTop: 1,
  },
});
