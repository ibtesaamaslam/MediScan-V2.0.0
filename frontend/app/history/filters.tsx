import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Alert } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';
import { ScreeningRepository } from '../../services/database/ScreeningRepository';

export default function HistoryFilters() {
  const [showUrgent, setShowUrgent] = useState(true);
  const [showModerate, setShowModerate] = useState(true);
  const [showMild, setShowMild] = useState(true);
  
  const [moduleSkin, setModuleSkin] = useState(true);
  const [moduleEye, setModuleEye] = useState(true);
  const [moduleOral, setModuleOral] = useState(true);
  const [moduleWound, setModuleWound] = useState(true);

  const [cacheImages, setCacheImages] = useState(true);
  const [compactStorage, setCompactStorage] = useState(false);

  const triggerReset = () => {
    // Elegant system reset
    Alert.alert(
      "Confirm Ledger Wipe",
      "Are you sure you want to delete all cached diagnostic reviews locally from this device?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Wipe Data", 
          style: "destructive",
          onPress: async () => {
            await ScreeningRepository.clear();
            alert("Local clinical index wiped successfully.");
            router.push('/history');
          }
        }
      ]
    );
  };

  return (
    <ScreenContainer scrollable={true}>
      <AppHeader title="Records Filters & Storage" showBack={true} />
      
      <View style={styles.container}>
        {/* Severity Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FILTER BY TRIAGE SEVERITY</Text>
          
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.indicator, { backgroundColor: colors.error }]} />
              <Text style={styles.label}>Urgent Suspicions</Text>
            </View>
            <Switch 
              value={showUrgent} 
              onValueChange={setShowUrgent}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={showUrgent ? '#ffffff' : '#94a3b8'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.indicator, { backgroundColor: colors.warning }]} />
              <Text style={styles.label}>Moderate Issues</Text>
            </View>
            <Switch 
              value={showModerate} 
              onValueChange={setShowModerate}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={showModerate ? '#ffffff' : '#94a3b8'}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.indicator, { backgroundColor: colors.success }]} />
              <Text style={styles.label}>Mild Alterations</Text>
            </View>
            <Switch 
              value={showMild} 
              onValueChange={setShowMild}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={showMild ? '#ffffff' : '#94a3b8'}
            />
          </View>
        </View>

        {/* Module Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIVE CLINICAL MODULES</Text>

          <View style={styles.row}>
            <Text style={styles.label}>🧴 Skin Lesion Classifier</Text>
            <Switch 
              value={moduleSkin} 
              onValueChange={setModuleSkin}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>👁️ Optical Pathology Assayer</Text>
            <Switch 
              value={moduleEye} 
              onValueChange={setModuleEye}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🦷 Oral Cancer Screener</Text>
            <Switch 
              value={moduleOral} 
              onValueChange={setModuleOral}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>🩹 Wound Granulation Monitor</Text>
            <Switch 
              value={moduleWound} 
              onValueChange={setModuleWound}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </View>

        {/* Local Storage Tuning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STORAGE OPTIMIZATION</Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Keep Diagnostic Images</Text>
              <Text style={styles.subText}>Cache captured test photos on regional storage</Text>
            </View>
            <Switch 
              value={cacheImages} 
              onValueChange={setCacheImages}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Compact Sql Database</Text>
              <Text style={styles.subText}>Shrink indexes automatically on synchronization</Text>
            </View>
            <Switch 
              value={compactStorage} 
              onValueChange={setCompactStorage}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </View>

        {/* Destructive controls */}
        <Pressable style={styles.dangerWipeButton} onPress={triggerReset}>
          <Text style={styles.wipeText}>Wipe Local Diagnostic Indexes</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  section: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293bbb',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  dangerWipeButton: {
    backgroundColor: '#ef444412',
    borderColor: '#ef444455',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  wipeText: {
    color: colors.error,
    fontWeight: 'bold',
    fontSize: 13,
  }
});
