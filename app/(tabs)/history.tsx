import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import theme from '../../constants/theme';

const FILTERS = ['Wszystkie', 'Wygrane', 'Przegrane', 'Nierozstrzygnięte'];

export default function History() {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('Wszystkie');

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const custom = await AsyncStorage.getItem('customChallenges');
        const bets = await AsyncStorage.getItem('userBets');

        const parsedCustom = custom ? JSON.parse(custom) : [];
        const parsedBets = bets ? JSON.parse(bets) : [];

        const combined = [...parsedCustom, ...parsedBets];

        const withStatus = combined.map((item) => ({
          ...item,
          status:
            item.status ||
            ['Wygrane', 'Przegrane', 'Nierozstrzygnięte'][
              Math.floor(Math.random() * 3)
            ],
        }));

        setChallenges(withStatus.reverse());
      } catch (e) {
        console.error('Błąd historii:', e);
      }
    };

    loadChallenges();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Usuń wyzwanie',
      'Czy na pewno chcesz usunąć to wyzwanie?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            const updated = challenges.filter((ch) => ch.id !== id);
            setChallenges(updated);

            // Aktualizujemy tylko customChallenges i userBets
            const newCustom = updated.filter((c) => !c.status);
            const newBets = updated.filter((c) => c.status);

            await AsyncStorage.setItem('customChallenges', JSON.stringify(newCustom));
            await AsyncStorage.setItem('userBets', JSON.stringify(newBets));
          },
        },
      ]
    );
  };

  const filteredChallenges =
    filter === 'Wszystkie'
      ? challenges
      : challenges.filter((ch) => ch.status === filter);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Historia wyzwań</Text>

        {/* FILTRY */}
        <View style={styles.filtersRow}>
          {FILTERS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                filter === item && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LISTA */}
        {filteredChallenges.length === 0 ? (
          <Text style={styles.emptyText}>Brak wyzwań do wyświetlenia.</Text>
        ) : (
          filteredChallenges.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              style={styles.challengeCard}
              onPress={() =>
                router.push({
                  pathname: '/challenge-details',
                  params: ch,
                })
              }
              onLongPress={() => handleDelete(ch.id)}
            >
              <Text style={styles.title}>{ch.title}</Text>
              <Text style={styles.meta}>
                Typ: {ch.type} | Status: {ch.status}
              </Text>
            </TouchableOpacity>
          ))
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
  container: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.textDark,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.radius.full,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.lightPink,
  },
  filterText: {
    color: theme.colors.darkGray,
    fontSize: theme.fontSizes.sm,
  },
  filterTextActive: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },
  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  meta: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.darkGray,
  },
  emptyText: {
    color: theme.colors.darkGray,
    fontSize: theme.fontSizes.sm,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});
