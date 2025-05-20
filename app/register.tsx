import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła nie są takie same');
      return;
    }

    // 🔄 Tylko symulacja
    Alert.alert('Sukces!', 'Zarejestrowano pomyślnie (symulacja)');
    router.replace('/(tabs)/home');
  };

  return (
    <ImageBackground
      source={require('../assets/background_standard.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.wrapper}>
          <Image source={require('../assets/logotyp.png')} style={styles.logo} />

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="adres e-mail"
              placeholderTextColor="#BBB"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="hasło"
              placeholderTextColor="#BBB"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="powtórz hasło"
              placeholderTextColor="#BBB"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Zarejestruj się</Text>
            </Pressable>

            <Text style={styles.noAccountText}>Masz już konto?</Text>

            <Pressable style={styles.secondaryButton} onPress={() => router.push('/login')}>
              <Text style={styles.secondaryButtonText}>Zaloguj się</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  wrapper: {
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  form: {
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: '#F6F6FA',
    borderWidth: 1.5,
    borderColor: '#3F51B5',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 16,
    fontFamily: 'Fredoka-Regular',
  },
  button: {
    backgroundColor: '#3F51B5',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Fredoka-Bold',
  },
  noAccountText: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 14,
    color: '#E76617',
    marginTop: 24,
  },
  secondaryButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 36,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Fredoka-Medium',
  },
});
