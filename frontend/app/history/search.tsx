import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';
import { ScreeningResult } from '../../types/Screening';

export default function HistorySearch() {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState<ScreeningResult[]>([]);

  useEffect(() => {
    // Standard loading from Repository with custom backup/demo items if empty
    ScreeningRepository.getAll().then((data) => {
      if (data.length === 0) {
        // Fallback for demo demonstration purposes
        const demoRecords: ScreeningResult[] = [
          { id: '1', moduleType: 'skin', conditionName: 'Basal Cell Carcinoma Suspicion', timestamp: '22026-06-08', confidence: 0.94, severity: 'urgent', recommendation: 'Urgent clinic biopsy required.' },
          { id: '2', moduleType: 'eye', conditionName: 'Conjunctivitis Eye Infection', timestamp: '2026-06-07', confidence: 0.88, severity: 'mild', recommendation: 'Avoid touching eyes, hand sanitation.' },
          { id: '3', moduleType: 'skin', conditionName: 'Fungal Tinea Ringworm Lesion', timestamp: '2026-06-05', confidence: 0.76, severity: 'moderate', recommendation: 'Apply topical antifungal creams.' },
          { id: '4', moduleType: 'eye', conditionName: 'Cataract Optical Evidence Detected', timestamp: '2026-06-01', confidence: 0.82, severity: 'urgent', recommendation: 'Refer to regional ophthalmology clinic.' },
        ];
        demoRecords.forEach(r => ScreeningRepository.save(r));
        setRecords(demoRecords);
      } else {
        setRecords(data);
      }
    });
  }, []);

  const filtered = records.filter(item => 
    item.conditionName.toLowerCase().includes(query.toLowerCase()) ||
    item.moduleType.toLowerCase().includes(query.toLowerCase()) ||
    item.severity.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Search Screening Records" showBack={true} />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search by diagnosis, severity, or module..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
        </View>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ color: colors.textMuted }}>No matching audit logs found.</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.card}
                onPress={() => router.push(`/history/${item.id}`)}
              >
                <View style={styles.cardInfo}>
                  <Text style={styles.condition}>{item.conditionName}</Text>
                  <Text style={styles.moduleText}>{item.moduleType.toUpperCase()} MODULE • ID: #{item.id}</Text>
                  <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
                </View>
                <View style={[styles.badge, { 
                  backgroundColor: item.severity === 'urgent' ? '#ef44441a' : item.severity === 'moderate' ? '#f59e0b1a' : '#10b9811a',
                  borderColor: item.severity === 'urgent' ? colors.error : item.severity === 'moderate' ? colors.warning : colors.success,
                  borderWidth: 1
                }]}>
                  <Text style={{ 
                    color: item.severity === 'urgent' ? colors.error : item.severity === 'moderate' ? colors.warning : colors.success, 
                    fontSize: 10, 
                    fontWeight: 'bold' 
                  }}>
                    {item.severity.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    color: '#ffffff',
    fontSize: 14,
  },
  listContent: { gap: 10 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: { flex: 1, paddingRight: 8 },
  condition: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  moduleText: { color: colors.textSecondary, fontSize: 10, marginTop: 4, fontWeight: 'bold' },
  date: { color: colors.textMuted, fontSize: 10, marginTop: 4 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
