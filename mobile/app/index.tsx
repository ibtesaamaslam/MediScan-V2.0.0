import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 34, fontWeight: '700', marginBottom: 10 }}>
        MediScan Local
      </Text>

      <Text style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40 }}>
        Offline AI health screening for underserved communities.
      </Text>

      <Pressable
        onPress={() => router.push('/screening/skin')}
        style={{ backgroundColor: '#2563eb', padding: 18, borderRadius: 18, marginBottom: 16 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
          Start Skin Screening
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/screening/eye')}
        style={{ backgroundColor: '#059669', padding: 18, borderRadius: 18 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
          Start Eye Screening
        </Text>
      </Pressable>
    </View>
  );
}
