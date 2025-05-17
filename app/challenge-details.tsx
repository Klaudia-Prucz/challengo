import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import theme from '../constants/theme';

export default function ChallengeDetails() {
  const {
    title,
    type,
    duration,
    description,
    reward,
    invitees,
    note,
    status,
  } = useLocalSearchParams();

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

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{status || 'Nierozstrzygnięte'}</Text>
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
});
