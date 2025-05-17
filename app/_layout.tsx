import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';
import colors from '../constants/colors';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.light },
          headerTintColor: colors.primaryBlue,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </SafeAreaView>
  );
}
