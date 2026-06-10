import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function PinSetup() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [error, setError] = useState('');

  const handleNumPress = (num: number) => {
    setError('');
    const current = step === 'create' ? pin : confirmPin;
    if (current.length < 4) {
      if (step === 'create') setPin(current + num);
      else setConfirmPin(current + num);
    }
  };

  const handleDelete = () => {
    const current = step === 'create' ? pin : confirmPin;
    if (current.length > 0) {
      if (step === 'create') setPin(current.slice(0, -1));
      else setConfirmPin(current.slice(0, -1));
    }
  };

  const handleContinue = () => {
    if (step === 'create') {
      if (pin.length !== 4) {
        setError('PIN must be 4 digits.');
        return;
      }
      setStep('confirm');
    } else {
      if (confirmPin !== pin) {
        setError('PINs do not match. Try again.');
        setConfirmPin('');
        return;
      }
      // PIN is successfully set! Progress to biometric optional configuration
      router.push('/auth/biometric');
    }
  };

  const getDots = () => {
    const length = step === 'create' ? pin.length : confirmPin.length;
    return (
      <View style={styles.dotsRow}>
        {[1, 2, 3, 4].map((dot) => (
          <View
            key={dot}
            style={[
              styles.dot,
              length >= dot ? styles.dotFilled : styles.dotEmpty,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Secure PIN Lock" showBack={true} />
      <View style={styles.container}>
        <View style={styles.topSide}>
          <Text style={styles.title}>
            {step === 'create' ? 'Create Secure PIN' : 'Confirm Your PIN'}
          </Text>
          <Text style={styles.subtitle}>
            Protects diagnostic reports and patients' credentials stored on this device.
          </Text>

          {getDots()}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Custom Numerical Matrix */}
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Pressable
              key={num}
              style={styles.keyCell}
              onPress={() => handleNumPress(num)}
            >
              <Text style={styles.keyText}>{num}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.keyCell} onPress={() => setPin('')}>
            <Text style={[styles.keyText, { fontSize: 13, color: colors.textMuted }]}>CLEAR</Text>
          </Pressable>
          <Pressable style={styles.keyCell} onPress={() => handleNumPress(0)}>
            <Text style={styles.keyText}>0</Text>
          </Pressable>
          <Pressable style={styles.keyCell} onPress={handleDelete}>
            <Text style={[styles.keyText, { fontSize: 13, color: colors.error }]}>DELETE</Text>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {step === 'create' ? 'Continue' : 'Finalize Lock Setup'}
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  topSide: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
    paddingHorizontal: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 24,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
  },
  dotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dotEmpty: {
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: 'bold',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '100%',
    rowGap: 16,
    marginVertical: 16,
  },
  keyCell: {
    width: '30%',
    aspectRatio: 1.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginHorizontal: '1.5%',
    borderColor: colors.border,
    borderWidth: 1,
  },
  keyText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
