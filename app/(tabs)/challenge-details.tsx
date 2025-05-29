import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import theme from '../../constants/theme';

export default function ChallengeDetails() {
  const router = useRouter();

  const {
    title,
    type,
    duration,
    description,
    reward,
    invitees,
    note,
    status,
    canBet,
  } = useLocalSearchParams();

  const handleBet = async () => {
    try {
      const newBet = {
        title,
        type,
        duration,
        description,
        reward,
        invitees,
        note,
        status: 'nierozstrzygnięte',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'userBets'), newBet);

      Alert.alert('Sukces!', 'Wyzwanie zostało obstawione.', [
        {
          text: 'OK',
          onPress: () => router.replace('/history'),
        },
      ]);
    } catch (e) {
      console.error('Błąd zapisu do Firestore:', e);
      Alert.alert('Błąd', 'Nie udało się zapisać zakładu.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        <Text style={styles.heading}>{title}</Text>

        <Text style={styles.label}>Typ wyzwania</Text>
        <Text style={styles.value}>{type}</Text>

        <Text style={styles.label}>Czas trwania</Text>
        <Text style={styles.value}>{duration || 'Nieokreślony'}</Text>

        <Text style={styles.label}>Opis</Text>
        <Text style={styles.value}>{description || 'Brak opisu'}</Text>

        <Text style={styles.label}>Nagroda</Text>
        <Text style={styles.value}>{reward || 'Brak'}</Text>

        <Text style={styles.label}>Zaproś znajomych</Text>
        <Text style={styles.value}>{invitees || 'Brak'}</Text>

        <Text style={styles.label}>Informacje dodatkowe</Text>
        <Text style={styles.value}>{note || 'Brak'}</Text>

        {status && (
          <>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{status}</Text>
          </>
        )}

        {canBet !== 'false' && (
          <TouchableOpacity style={styles.betButton} onPress={handleBet}>
            <Text style={styles.betButtonText}>Obstaw wyzwanie</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scroll: {
    padding: theme.spacing.lg,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
    color: theme.colors.darkGray,
    marginTop: theme.spacing.md,
  },
  value: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textDark,
    marginTop: 4,
  },
  betButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    alignItems: 'center',
  },
  betButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
});
