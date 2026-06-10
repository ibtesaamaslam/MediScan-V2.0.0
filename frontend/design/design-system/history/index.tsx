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
    ScreeningRepository.getAll().then(setList);
  }, []);

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Screening Audit Records" />
      
      {list.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: colors.textMuted }}>No screenings on-record locally.</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => router.push(`/history/${item.id}`)}>
              <View>
                <Text style={styles.cName}>{item.conditionName}</Text>
                <Text style={styles.cMeta}>{item.moduleType.toUpperCase()} Screening • {new Date(item.timestamp).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.score}>{(item.confidence * 100).toFixed(0)}%</Text>
            </Pressable>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 16, marginVertical: 6, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cName: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  cMeta: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  score: { color: colors.primary, fontWeight: '900', fontSize: 16 }
});