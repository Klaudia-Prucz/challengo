import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../constants/theme';

const topRewards = [
  {
    id: 1,
    name: 'Smartwatch Xiaomi',
    image: 'https://m.media-amazon.com/images/I/71CS4QfRL-L._AC_UF1000,1000_QL80_.jpg',
    points: 5000,
  },
  {
    id: 2,
    name: 'Słuchawki JBL',
    image: 'https://m.media-amazon.com/images/I/61pPrc-LGFL._AC_UF894,1000_QL80_.jpg',
    points: 4000,
  },
  {
    id: 3,
    name: 'Mata do jogi',
    image: 'https://m.media-amazon.com/images/I/71c0OCh8bNL._AC_UF894,1000_QL80_.jpg',
    points: 2500,
  },
];

const categories = [
  {
    title: '🎧 Elektronika',
    items: [
      { name: 'Powerbank 10 000 mAh', points: 2000 },
      { name: 'Mini głośnik Bluetooth', points: 3000 },
    ],
  },
  {
    title: '🏠 Dom i relaks',
    items: [
      { name: 'Zestaw świec zapachowych', points: 1200 },
      { name: 'Koc piknikowy', points: 1800 },
    ],
  },
  {
    title: '🏋️‍♀️ Sport i aktywność',
    items: [
      { name: 'Bidon termiczny', points: 1000 },
      { name: 'Skakanka fitness', points: 1500 },
    ],
  },
  {
    title: '🎨 Inspiracje i hobby',
    items: [
      { name: 'Zestaw brushpenów', points: 2200 },
      { name: 'Planner dzienny', points: 1400 },
    ],
  },
];

export default function Rewards() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>🎁 Top nagrody</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <Image source={{ uri: reward.image }} style={styles.rewardImage} />
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardPoints}>{reward.points} pkt</Text>
            </View>
          ))}
        </ScrollView>

        {categories.map((category, index) => (
          <View key={index} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPoints}>{item.points} pkt</Text>
              </View>
            ))}
          </View>
        ))}
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
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.primaryDark,
  },
  rewardCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  rewardName: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: theme.fontSizes.sm,
    marginBottom: 4,
  },
  rewardPoints: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  categorySection: {
    marginTop: theme.spacing.lg,
  },
  categoryTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textDark,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightGray,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  itemName: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.darkGray,
  },
  itemPoints: {
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
});
