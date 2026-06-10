import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function PatientList() {
  const patientQueue = [
    { id: '1', name: 'Fatima Sheikh', details: 'F • Age 42 • CHW-9011', state: 'unscreened' },
    { id: '2', name: 'Zainab Bibi', details: 'F • Age 29 • CHW-9012', state: 'completed' },
    { id: '3', name: 'Karanja Mwangi', details: 'M • Age 54 • CHW-9013', state: 'unscreened' },
  ];

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Intake Patient Queue" showBack={true} />
      <View style={styles.container}>
        <View style={styles.topInfo}>
          <Text style={styles.sessionTitle}>Active Field Campaign</Text>
          <Text style={styles.sessionDesc}>Manage patient identifiers and trigger sequential on-device screening.</Text>
        </View>

        <FlatList
          data={patientQueue}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subtext}>{item.details}</Text>
              </View>
              
              <View style={styles.actions}>
                <Pressable
                  style={[styles.btn, item.state === 'completed' ? styles.btnDone : styles.btnActive]}
                  onPress={() => item.state === 'unscreened' && router.push('/screening/select-type')}
                >
                  <Text style={styles.btnText}>
                    {item.state === 'completed' ? '✓ DONE' : 'SCREEN'}
                  </Text>
                </Pressable>
                
                <Pressable 
                  style={styles.btnEdit}
                  onPress={() => router.push(`/chw/edit-patient`)}
                >
                  <Text style={{ color: colors.textSecondary, fontSize: 11, fontWeight: 'bold' }}>EDIT</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topInfo: { marginBottom: 16 },
  sessionTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  sessionDesc: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  list: { gap: 10 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: { flex: 1 },
  name: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  subtext: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  btnActive: { backgroundColor: colors.primary },
  btnDone: { backgroundColor: '#10b98120', borderColor: colors.success, borderWidth: 1 },
  btnText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
  btnEdit: { backgroundColor: '#ffffff0d', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
});
