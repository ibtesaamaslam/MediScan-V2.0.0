import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { PatientRepository } from '../../services/database/PatientRepository';

export default function RegisterPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | 'O'>('M');

  const onRegister = async () => {
    if (!name || !age) return;
    await PatientRepository.save({
      id: Math.random().toString(36).substring(7),
      fullName: name,
      age: parseInt(age),
      gender: gender,
      registeredAt: new Date().toISOString(),
      offlineCreated: true,
      synced: false
    });
    router.replace('/chw');
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Patient Medical Onboarding" />
      <View style={styles.form}>
        <Text style={styles.lbl}>PATIENT FULL NAME:</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Please input name" placeholderTextColor="#64748b" />

        <Text style={styles.lbl}>PATIENT INT ANATOMICAL AGE:</Text>
        <TextInput value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} placeholder="e.g. 34" placeholderTextColor="#64748b" />

        <Text style={styles.lbl}>PATIENT ASSIGNED GENDER:</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 12 }}>
          {['M', 'F', 'O'].map((g: any) => (
            <Pressable key={g} style={[styles.gBtn, gender === g && styles.gActive]} onPress={() => setGender(g)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{g}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.subBtn} onPress={onRegister}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm Patient Onboarding</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16 },
  lbl: { color: colors.textSecondary, fontSize: 11, fontWeight: 'bold', marginVertical: 6 },
  input: { backgroundColor: colors.surface, border: '1px solid ' + colors.border, padding: 14, borderRadius: 10, color: 'white', marginVertical: 8 },
  gBtn: { flex: 1, padding: 14, backgroundColor: colors.surface, borderRadius: 10, alignItems: 'center' },
  gActive: { backgroundColor: colors.primary },
  subBtn: { backgroundColor: colors.success, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32 }
});