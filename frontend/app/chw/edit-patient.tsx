import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function EditPatient() {
  const [name, setName] = useState('Fatima Sheikh');
  const [age, setAge] = useState('42');
  const [gender, setGender] = useState('Female');
  const [chwId, setChwId] = useState('CHW-9011');

  const handleSave = () => {
    // Save demographics back to offline memory / SQLite
    router.back();
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Ammend Patient Records" showBack={true} />
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Patient Display Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Patient Age (years)</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Assigned Biological Gender</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Custom CHW Program Registry ID</Text>
          <TextInput
            style={styles.input}
            value={chwId}
            onChangeText={setChwId}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Persist Demographics Updates</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
  formGroup: { gap: 8 },
  label: { color: colors.textSecondary, fontSize: 13, fontWeight: 'bold' },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
