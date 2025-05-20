import { ImageBackground, StyleSheet, View, Pressable, Text } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/welcomepage_2.png')} // ← Twoje tło z Figma
      style={styles.background}
      resizeMode="cover"
    >
<View style={styles.buttonRow}>
  <Pressable style={styles.button} onPress={() => router.push('/login')}>
    <Text style={styles.buttonText}>Zaloguj</Text>
  </Pressable>

  <Pressable style={styles.button} onPress={() => router.push('/register')}>
    <Text style={styles.buttonText}>Zarejestruj</Text>
  </Pressable>
</View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  buttonRow: {
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'center',
  marginBottom: 180, 
},
button: {
  backgroundColor: '#3F51B5',
  paddingVertical: 18,
  paddingHorizontal: 28,
  borderRadius: 36,
  minWidth: 160,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 4,
},
buttonText: {
  color: '#fff',
  fontFamily: 'Fredoka-Medium',
  fontSize: 26, // 
  textAlign: 'center',
},



});
