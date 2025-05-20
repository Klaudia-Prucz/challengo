import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme'; // Uwaga: ../ zmienione na ../../

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.darkGray,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: theme.colors.gray,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Czat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ustawienia',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />

      {/* Ukryty ekran: katalog nagród */}
      <Tabs.Screen
        name="rewards"
        options={{
          href: null, // 👈 ukrywa z tab bara
        }}
      />

      {/* Ukryty ekran: szczegóły wyzwania */}
      <Tabs.Screen
        name="challenge-details"
        options={{
          href: null,
        }}
      />

      {/* Ukryty ekran: dodaj własne */}
      <Tabs.Screen
        name="challenge-create"
        options={{
          href: null,
        }}
      />

      {/* Ukryty domyślny index */}
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
