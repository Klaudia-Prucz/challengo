import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import theme from '../../constants/theme';
import { v4 as uuidv4 } from 'uuid';

export default function ChallengeCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [rewardPoints, setRewardPoints] = useState('');
  const [rewardText, setRewardText] = useState('');
  const [invitee, setInvitee] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert('Błąd', 'Podaj tytuł wyzwania.');
      return;
    }

    if (rewardPoints && rewardText) {
      Alert.alert('Błąd', 'Podaj tylko punkty lub opis nagrody, nie oba.');
      return;
    }

    const challenge = {
      id: uuidv4(),
      type: 'Wyzwanie',
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      rewardPoints: rewardPoints ? parseInt(rewardPoints) : null,
      rewardText: rewardText || null,
      invitee: invitee || null,
      createdBy: 'uid_usera', // TODO: podmień na faktyczny UID z auth
      createdAt: new Date().toISOString(),
      status: 'oczekujące',
    };

    console.log('Utworzono:', challenge);
    Alert.alert('Sukces', 'Wyzwanie zostało utworzone!');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Nowe wyzwanie</Text>

      <TextInput
        style={styles.input}
        placeholder="Tytuł"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Data rozpoczęcia */}
      <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          Start: {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(Platform.OS === 'ios');
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* Data zakończenia */}
      <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          Koniec: {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(Platform.OS === 'ios');
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Nagroda */}
      <TextInput
        style={styles.input}
        placeholder="Nagroda punktowa (np. 100)"
        keyboardType="numeric"
        value={rewardPoints}
        onChangeText={setRewardPoints}
      />

      <Text style={styles.or}>lub</Text>

      <TextInput
        style={styles.input}
        placeholder="Opis nagrody rzeczowej"
        value={rewardText}
        onChangeText={setRewardText}
      />

      <TextInput
        style={styles.input}
        placeholder="Zaproś znajomego (np. @ania)"
        value={invitee}
        onChangeText={setInvitee}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Utwórz wyzwanie</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundLight,
  },
  heading: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.md,
  },
  dateButton: {
    backgroundColor: theme.colors.lightPink,
    padding: theme.spacing.md,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  dateButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '600',
    color: theme.colors.darkGray,
  },
  button: {
    backgroundColor: theme.colors.lightPink,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
});
