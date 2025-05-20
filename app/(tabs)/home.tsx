import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, router } from 'expo-router';
import theme from '../../constants/theme';
import AppBackground from '../../components/AppBackground';

export default function Home() {
  const [customChallenges, setCustomChallenges] = useState([]);

  const user = {
    name: 'Użytkownik',
    points: 120,
    avatar: 'https://i.pravatar.cc/150',
    rankingPosition: 7,
    topUsers: ['Ola', 'Bartek', 'Ania'],
  };

  const latestChallenges = [
    { id: 'static1', title: 'Wstań przed 6:00', type: 'Wyzwanie' },
    { id: 'static2', title: 'Nie użyj telefonu 3h', type: 'Zakład' },
    { id: 'static3', title: 'Zrób 50 pompek', type: 'Pojedynek' },
  ];

  useFocusEffect(
    React.useCallback(() => {
      const loadChallenges = async () => {
        try {
          const data = await AsyncStorage.getItem('customChallenges');
          const parsed = data ? JSON.parse(data) : [];
          setCustomChallenges(parsed.reverse());
        } catch (e) {
          console.error('Błąd odczytu z AsyncStorage:', e);
        }
      };

      loadChallenges();
    }, [])
  );

  const allChallenges = [...customChallenges, ...latestChallenges];

  const handleBetQuick = async (challenge) => {
    Alert.alert(
      'Obstaw wyzwanie',
      `Czy chcesz obstawić "${challenge.title}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Obstaw',
          onPress: async () => {
            try {
              const newBet = {
                ...challenge,
                id: Date.now(),
                status: 'Nierozstrzygnięte',
                createdAt: new Date().toISOString(),
              };

              const existing = await AsyncStorage.getItem('userBets');
              const parsed = existing ? JSON.parse(existing) : [];

              const updated = [...parsed, newBet];
              await AsyncStorage.setItem('userBets', JSON.stringify(updated));

              Alert.alert('Sukces!', 'Wyzwanie zostało obstawione.');
            } catch (e) {
              console.error('Błąd obstawiania:', e);
              Alert.alert('Błąd', 'Nie udało się zapisać zakładu.');
            }
          },
        },
      ]
    );
  };

  return (
    <AppBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.pointsWrapper}>
            <Text style={styles.pointsText}>🏆 {user.points} pkt</Text>
          </View>

          <View style={styles.welcomeSection}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Witaj,</Text>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Twoje miejsce</Text>
              <Text style={styles.summaryValue}>#{user.rankingPosition}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Top 3 – Maj</Text>
              {user.topUsers.map((name, index) => (
                <Text key={index} style={styles.summaryList}>
                  {['🥇', '🥈', '🥉'][index]} {name}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.rewardsCardWrapper}>
            <TouchableOpacity
              style={styles.rewardsCard}
              onPress={() => router.push('/rewards')}
            >
              <Text style={styles.rewardsCardTitle}>Sprawdź katalog nagród</Text>
              <Text style={styles.rewardsCardSubtitle}>
                Wymień punkty na nagrody
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Najświeższe wyzwania</Text>

          {allChallenges.map((challenge, index) => (
            <View key={challenge.id ?? index} style={styles.challengeCard}>
              <Text style={styles.challengeText}>{challenge.title}</Text>
              <TouchableOpacity
                style={styles.betButton}
                onPress={() => handleBetQuick(challenge)}
              >
                <Text style={styles.betButtonText}>Obstaw</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.addCustomButtonWrapper}>
            <TouchableOpacity
              style={styles.addCustomButton}
              onPress={() => router.push('/challenge-create')}
            >
              <Text style={styles.addCustomButtonText}>+ Dodaj własne</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  pointsWrapper: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  pointsText: {
    backgroundColor: theme.colors.lightPink,
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.radius.full,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: theme.radius.full,
    marginRight: theme.spacing.md,
  },
  welcomeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: theme.spacing.sm,
  },
  welcomeText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.darkGray,
    marginBottom: 4,
  },
  userName: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: theme.colors.peachLight,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.light,
  },
  summaryTitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.darkGray,
    marginBottom: 8,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
  summaryList: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  rewardsCardWrapper: {
    marginTop: theme.spacing.lg,
  },
  rewardsCard: {
    backgroundColor: theme.colors.lightPink,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  rewardsCardTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
  rewardsCardSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.darkGray,
    marginTop: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textDark,
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightGray,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  challengeText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.darkGray,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  betButton: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: theme.radius.full,
  },
  betButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  addCustomButtonWrapper: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  addCustomButton: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.radius.full,
  },
  addCustomButtonText: {
    color: theme.colors.primaryDark,
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
  },
});