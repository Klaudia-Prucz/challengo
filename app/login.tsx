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

export default function LoginScreen() {
  const handleLogin = () => {
    Alert.alert('Logowanie', 'Logowanie udane (symulacja)');
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
            />

            <TextInput
              style={styles.input}
              placeholder="hasło"
              placeholderTextColor="#BBB"
              secureTextEntry
            />

            <Pressable style={styles.forgotPassword} onPress={() => Alert.alert('Reset hasła')}>
              <Text style={styles.forgotText}>Nie pamiętam hasła</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Zaloguj się</Text>
            </Pressable>

            <Text style={styles.orText}>lub kontynuuj przy użyciu</Text>

            <View style={styles.socialRow}>
              <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
              <Image source={require('../assets/google.png')} style={styles.socialIcon} />
            </View>

            <Text style={styles.noAccountText}>Nie masz konta?</Text>

            <Pressable style={styles.secondaryButton} onPress={() => router.push('/register')}>
              <Text style={styles.secondaryButtonText}>Zarejestruj się</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 8,
  },
  forgotText: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    color: '#E76617',
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
  orText: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 14,
    color: '#E76617',
    marginTop: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 24,
    marginVertical: 8,
  },
  socialIcon: {
    width: 40,
    height: 40,
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
