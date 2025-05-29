import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import theme from '../../constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function NagrodaSzczegoly() {
  const { name, points } = useLocalSearchParams();
  const [userPoints, setUserPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const docRef = doc(db, 'users', 'demoUser'); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserPoints(docSnap.data().points || 0);
        }
      } catch (e) {
        console.error('Błąd pobierania punktów:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPoints();
  }, []);

  const handleExchange = async () => {
    if (userPoints < Number(points)) return;

    try {
      const newBalance = userPoints - Number(points);
      const docRef = doc(db, 'users', 'demoUser');
      await updateDoc(docRef, { points: newBalance });

      Alert.alert('Sukces!', `Wymieniono nagrodę: ${name}`);
      router.back();
    } catch (e) {
      console.error('Błąd przy wymianie:', e);
      Alert.alert('Błąd', 'Nie udało się wymienić nagrody.');
    }
  };

  const canAfford = userPoints >= Number(points);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/background_standard.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.pointsLabel}>Wymaga: {points} pkt</Text>
          <Text style={styles.userPoints}>Twoje saldo: {userPoints} pkt</Text>

          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/rewards')}>
            <Text style={styles.backButtonText}>← Wróć</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleExchange}
            disabled={!canAfford || isLoading}
            style={[
              styles.exchangeButton,
              !canAfford && styles.disabledButton,
            ]}
          >
            <Text style={styles.exchangeText}>
              {canAfford ? 'Wymień' : 'Za mało punktów'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
  pointsLabel: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textDark,
  },
  userPoints: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.darkGray,
  },
  backButton: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.full,
    alignItems: 'center',
  },
  backButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
  },
  exchangeButton: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  exchangeText: {
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
});
