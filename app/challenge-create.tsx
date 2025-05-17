import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../constants/theme';

const TYPES = ['Wyzwanie', 'Pojedynek', 'Zakład'];

export default function ChallengeCreate() {
  const [type, setType] = useState('Wyzwanie');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [invitees, setInvitees] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Błąd', 'Podaj tytuł!');
      return;
    }

    const newChallenge = {
      id: Date.now(),
      type,
      title,
      duration,
      description,
      reward,
      invitees,
      note,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('customChallenges');
      const parsed = existing ? JSON.parse(existing) : [];

      const updated = [...parsed, newChallenge];
      await AsyncStorage.setItem('customChallenges', JSON.stringify(updated));

      console.log('Zapisane wyzwanie:', newChallenge);

      // ✅ CZYSZCZENIE PÓL
      setType('Wyzwanie');
      setTitle('');
      setDuration('');
      setDescription('');
      setReward('');
      setInvitees('');
      setNote('');

      Alert.alert('Sukces', 'Wyzwanie zostało zapisane!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (e) {
      console.error('Błąd zapisu:', e);
      Alert.alert('Błąd', 'Nie udało się zapisać wyzwania.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      >
        <View style={styles.typeSelector}>
          {TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeButton,
                type === t && styles.typeButtonActive,
              ]}
              onPress={() => setType(t)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === t && styles.typeButtonTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Tytuł"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Czas trwania (np. 3 dni)"
          value={duration}
          onChangeText={setDuration}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Nagroda"
          value={reward}
          onChangeText={setReward}
        />
        <TextInput
          style={styles.input}
          placeholder="Zaproś znajomych (np. @ola, @bartek)"
          value={invitees}
          onChangeText={setInvitees}
        />
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Informacje dodatkowe"
          value={note}
          onChangeText={setNote}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Utwórz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scroll: {
    padding: theme.spacing.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  typeButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightPink,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: theme.colors.burgundy,
  },
  typeButtonText: {
    color: theme.colors.burgundy,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: theme.colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.textDark,
  },
  button: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
});
