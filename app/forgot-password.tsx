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

export default function ForgotPasswordScreen() {
  const handleReset = () => {
    Alert.alert('Przypomnienie hasła', 'Link do resetu został wysłany (symulacja)');
    router.replace('/login');
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
            <Text style={styles.title}>Odzyskaj hasło</Text>

            <TextInput
              style={styles.input}
              placeholder="adres e-mail"
              placeholderTextColor="#BBB"
              keyboardType="email-address"
            />

            <Pressable style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Wyślij link resetujący</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={() => router.push('/login')}>
              <Text style={styles.secondaryButtonText}>Powrót do logowania</Text>
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
  title: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 22,
    color: '#3F51B5',
    marginBottom: 12,
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
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
  },
  secondaryButton: {
    marginTop: 24,
    backgroundColor: '#E76617',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 36,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Fredoka-Medium',
  },
});
