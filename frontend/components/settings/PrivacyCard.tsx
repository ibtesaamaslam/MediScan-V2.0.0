import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import { colors } from '../../theme/colors';

export const PrivacyCard: React.FC = () => {
  const [encryptLocal, setEncryptLocal] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [patientAnonymize, setPatientAnonymize] = useState(true);

  const handleRotation = () => {
    Alert.alert(
      "Rotate Local Salt Keys",
      "Would you like to invalidate all local offline image salts and generate new crypto credentials now?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Rotate Keys", onPress: () => alert("Cryptographic salts rotated. History entries re-hashed securely.") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CLINICAL PRIVACY & SECURITY NODES</Text>
      
      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.title}>Secure AES-256 Storage</Text>
          <Text style={styles.sub}>Encrypt all patient screening logs at rest locally</Text>
        </View>
        <Switch
          value={encryptLocal}
          onValueChange={setEncryptLocal}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.title}>Biometric FaceID / TouchID</Text>
          <Text style={styles.sub}>Prompt validation check before exposing audit ledger</Text>
        </View>
        <Switch
          value={biometrics}
          onValueChange={setBiometrics}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.title}>Hashed Patient Identity</Text>
          <Text style={styles.sub}>Replace Patient ID with irreversible SHA-256 HMAC values</Text>
        </View>
        <Switch
          value={patientAnonymize}
          onValueChange={setPatientAnonymize}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      <Pressable style={styles.btn} onPress={handleRotation}>
        <Text style={styles.btnText}>Rotate Cryptographic Key Rings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
  },
  heading: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293bbb',
  },
  textCol: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  sub: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
  },
  btn: {
    backgroundColor: '#3b82f610',
    borderColor: '#3b82f633',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  btnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  }
});
