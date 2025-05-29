import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import { useRouter } from 'expo-router';

const categories = [
  {
    id: 'electronics',
    title: 'Elektronika',
    items: [
      { name: 'Powerbank 10 000 mAh', points: 2000 },
      { name: 'Mini głośnik Bluetooth', points: 3000 },
    ],
  },
  {
    id: 'home',
    title: 'Dom i relaks',
    items: [
      { name: 'Zestaw świec zapachowych', points: 1200 },
      { name: 'Koc piknikowy', points: 1800 },
    ],
  },
  {
    id: 'sport',
    title: 'Sport i aktywność',
    items: [
      { name: 'Bidon termiczny', points: 1000 },
      { name: 'Skakanka fitness', points: 1500 },
    ],
  },
  {
    id: 'hobby',
    title: 'Inspiracje i hobby',
    items: [
      { name: 'Zestaw brushpenów', points: 2200 },
      { name: 'Planner dzienny', points: 1400 },
    ],
  },
  {
    id: 'other',
    title: 'Inne',
    items: [
      { name: 'Zestaw naklejek motywacyjnych', points: 800 },
      { name: 'Kubek termiczny', points: 1600 },
    ],
  },
];

export default function Rewards() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const current = categories.find((cat) => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/background_standard.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Katalog nagród</Text>

          {!selectedCategory ? (
            <View style={styles.categoriesGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryBox}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.categoryText}>{cat.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{current?.title}</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
                  <Text style={styles.backButtonText}>← Wróć</Text>
                </TouchableOpacity>
              </View>

              {current?.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemRow}
                  onPress={() =>
                    router.push({
                      pathname: '/nagroda-szczegoly',
                      params: {
                        name: item.name,
                        points: item.points,
                      },
                    })
                  }
                >
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPoints}>{item.points} pkt</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.lg,
  },
  categoriesGrid: {
    gap: theme.spacing.md,
  },
  categoryBox: {
    backgroundColor: theme.colors.lightPink,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  categorySection: {
    gap: theme.spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  categoryTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  backButton: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.full,
  },
  backButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
  },
  itemRow: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textDark,
  },
  itemPoints: {
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
});
