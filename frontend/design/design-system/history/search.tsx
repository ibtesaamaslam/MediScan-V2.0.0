import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

interface SampleItem {
  id: string;
  patientName: string;
  conditionName: string;
  timestamp: string;
  severity: string;
}

export default function HistorySearch() {
  const [query, setQuery] = useState('');
  
  const sampleRecords: SampleItem[] = [
    { id: '1', patientName: 'Amina Bibi', conditionName: 'Basal Cell Carcinoma Suspicion', timestamp: '2026-06-08', severity: 'urgent' },
    { id: '2', patientName: 'Rajesh Kumar', conditionName: 'Conjunctivitis Infection', timestamp: '2026-06-07', severity: 'mild' },
    { id: '3', patientName: 'Siti Aminah', conditionName: 'Fungal Tinea Ringworm', timestamp: '2026-06-05', severity: 'moderate' },
    { id: '4', patientName: 'John Doe', conditionName: 'Cataract Optical Evidence', timestamp: '2026-06-01', severity: 'urgent' },
  ];

  const filtered = sampleRecords.filter(item => 
    item.patientName.toLowerCase().includes(query.toLowerCase()) ||
    item.conditionName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Search Screening Records" showBack={true} />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search by patient or condition..."
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
                  <Text style={styles.patientName}>{item.patientName}</Text>
                  <Text style={styles.condition}>{item.conditionName}</Text>
                  <Text style={styles.date}>{item.timestamp}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: item.severity === 'urgent' ? '#ef444420' : '#f59e0b20' }]}>
                  <Text style={{ color: item.severity === 'urgent' ? colors.error : colors.warning, fontSize: 10, fontWeight: 'bold' }}>
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
  cardInfo: { flex: 1 },
  patientName: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  condition: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  date: { color: colors.textMuted, fontSize: 10, marginTop: 4 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
