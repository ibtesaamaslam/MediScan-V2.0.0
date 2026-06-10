import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { PatientRepository } from '../../services/database/PatientRepository';
import { PatientRecord } from '../../types/Patient';

export default function CHWTerminal() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);

  useEffect(() => {
    PatientRepository.getAll().then(setPatients);
  }, []);

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="CHW Active Queue Console" />
      
      <View style={styles.topSection}>
        <Pressable style={styles.btnPrimary} onPress={() => router.push('/chw/add-patient')}>
          <Text style={styles.btnText}>+ Register New Patient</Text>
        </Pressable>
        <Pressable style={styles.btnSecondary} onPress={() => router.push('/chw/create-session')}>
          <Text style={styles.btnSecText}>Start Batch Screening</Text>
        </Pressable>
      </View>

      <Text style={styles.subTitle}>Registered Patient Roster:</Text>

      {patients.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: colors.textMuted }}>No patients listed. Tap above to register patients.</Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => router.push(`/chw/patient-details?id=${item.id}`)}>
              <View>
                <Text style={styles.pName}>{item.fullName}</Text>
                <Text style={styles.pMeta}>{item.age} years old • Gender: {item.gender}</Text>
              </View>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: 'bold' }}>View File</Text>
            </Pressable>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topSection: { flexDirection: 'row', gap: 12, marginVertical: 12 },
  btnPrimary: { flex: 1, backgroundColor: colors.primary, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnSecondary: { flex: 1, backgroundColor: colors.surface, border: '1px solid ' + colors.border, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  btnSecText: { color: colors.textSecondary, fontWeight: 'bold' },
  subTitle: { color: 'white', fontSize: 15, fontWeight: 'bold', marginVertical: 10 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 16, marginVertical: 6, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pName: { color: 'white', fontWeight: 'bold' },
  pMeta: { color: colors.textMuted, fontSize: 12, marginTop: 4 }
});