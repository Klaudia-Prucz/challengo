import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Fredoka-Light': require('../assets/fonts/Fredoka-Light.ttf'),
    'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
    'Fredoka-Medium': require('../assets/fonts/Fredoka-Medium.ttf'),
    'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
