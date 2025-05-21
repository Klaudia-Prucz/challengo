import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppBackground from '../../components/AppBackground';
import theme from '../../constants/theme';

export default function Layout() {
  return (
    <AppBackground>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.darkGray,
          tabBarStyle: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            height: 60,
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.gray,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            fontFamily: 'Fredoka-Medium',
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

        {/* Ukryte zakładki */}
        <Tabs.Screen name="rewards" options={{ href: null }} />
        <Tabs.Screen name="challenge-details" options={{ href: null }} />
        <Tabs.Screen name="challenge-create" options={{ href: null }} />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </AppBackground>
  );
}
