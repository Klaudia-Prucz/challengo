import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../constants/theme';

export default function Home() {
  const user = {
    name: 'Użytkownik',
    points: 120,
    avatar: 'https://i.pravatar.cc/150',
    rankingPosition: 7,
    topUsers: ['Ola', 'Bartek', 'Ania'],
  };

  const latestChallenges = [
    { title: 'Wstań przed 6:00' },
    { title: 'Nie używaj telefonu 3h' },
    { title: 'Zrób 50 pompek' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* SALDO PUNKTOWE */}
      <View style={styles.pointsWrapper}>
        <Text style={styles.pointsText}>🏆 {user.points} pkt</Text>
      </View>

      {/* POWITANIE */}
      <View style={styles.welcomeSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Witaj,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

      {/* PODSUMOWANIE */}
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

      {/* PRZYCISK: WSZYSTKIE STATYSTYKI */}
      <View style={styles.statsButtonWrapper}>
        <Text style={styles.statsButton}>Wszystkie statystyki →</Text>
      </View>

      {/* SEPARATOR */}
      <View style={styles.separator} />

      {/* NAGŁÓWEK SEKCJI */}
      <Text style={styles.sectionTitle}>Najświeższe wyzwania</Text>

      {/* LISTA WYZWAN */}
      {latestChallenges.map((challenge, index) => (
        <View key={index} style={styles.challengeCard}>
          <Text style={styles.challengeText}>{challenge.title}</Text>
          <TouchableOpacity style={styles.betButton}>
            <Text style={styles.betButtonText}>Obstaw</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* PRZYCISK: DODAJ WŁASNE */}
      <View style={styles.addCustomButtonWrapper}>
        <TouchableOpacity
          style={styles.addCustomButton}
          onPress={() => console.log('Dodaj własne')}
        >
          <Text style={styles.addCustomButtonText}>+ Dodaj własne</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
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

  statsButtonWrapper: {
    alignItems: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  statsButton: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.lightPink,
    borderRadius: theme.radius.full,
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
