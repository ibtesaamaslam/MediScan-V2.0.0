import { useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { runSkinInference } from '../../hooks/useInference';
import { saveScreeningResult } from '../../lib/database';
import { v4 as uuidv4 } from 'uuid';

export default function SkinScreeningPage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission required');
      return;
    }

    const response = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false
    });

    if (!response.canceled) {
      setImageUri(response.assets[0].uri);
      await runInference(response.assets[0].uri);
    }
  };

  const runInference = async (uri: string) => {
    try {
      setLoading(true);
      const prediction = await runSkinInference(uri);
      setResult(prediction);

      await saveScreeningResult({
        id: uuidv4(),
        condition_name: prediction.label,
        confidence: prediction.confidence,
        recommendation: prediction.recommendation
      });
    } catch (error) {
      console.error(error);
      alert('Inference failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 20 }}>
        Skin Screening
      </Text>

      <Pressable onPress={pickImage} style={{ backgroundColor: '#2563eb', padding: 18, borderRadius: 14 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
          Capture Image
        </Text>
      </Pressable>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: 300, marginTop: 20, borderRadius: 20 }}
        />
      )}

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />}

      {result && (
        <View style={{ backgroundColor: '#111827', padding: 20, borderRadius: 18, marginTop: 24 }}>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>{result.label}</Text>
          <Text style={{ color: '#94a3b8', marginTop: 8 }}>
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </Text>
          <Text style={{ color: '#e2e8f0', marginTop: 14 }}>{result.recommendation}</Text>
        </View>
      )}
    </View>
  );
}
