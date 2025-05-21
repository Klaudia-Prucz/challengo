import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ChallengeCreate = () => {
  const [type, setType] = useState<'wyzwanie' | 'pojedynek' | 'zaklad'>('wyzwanie');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rewardType, setRewardType] = useState<'punkty' | 'rzeczowa'>('punkty');
  const [reward, setReward] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [rewardImage, setRewardImage] = useState<string | null>(null);
  const [opponent, setOpponent] = useState('');
  const [betContent, setBetContent] = useState('');
  const [betGuess, setBetGuess] = useState<'tak' | 'nie' | 'inny' | ''>('');
  const [participants, setParticipants] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setRewardImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../../assets/background_standard.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Utwórz zadanie</Text>

          <Text style={styles.label}>Typ zadania</Text>
          <View style={styles.row}>
            {['wyzwanie', 'pojedynek', 'zaklad'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.optionButton, type === t && styles.selected]}
                onPress={() => setType(t as any)}
              >
                <Text style={styles.optionText}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tytuł</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Data rozpoczecia</Text>
          <TextInput style={styles.input} placeholder="RRRR-MM-DD" value={startDate} onChangeText={setStartDate} />

          <Text style={styles.label}>Data zakończenia</Text>
          <TextInput style={styles.input} placeholder="RRRR-MM-DD" value={endDate} onChangeText={setEndDate} />

          {type === 'pojedynek' && (
            <>
              <Text style={styles.label}>Z kim się pojedynkujesz?</Text>
              <TextInput style={styles.input} value={opponent} onChangeText={setOpponent} />
            </>
          )}

          {type === 'zaklad' && (
            <>
              <Text style={styles.label}>Treść zakładu</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={betContent}
                onChangeText={setBetContent}
                multiline
              />
              <Text style={styles.label}>Obstawiasz wynik zakładu:</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.optionButton, betGuess === 'tak' && styles.selected]}
                  onPress={() => setBetGuess('tak')}
                >
                  <Text style={styles.optionText}>Tak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionButton, betGuess === 'nie' && styles.selected]}
                  onPress={() => setBetGuess('nie')}
                >
                  <Text style={styles.optionText}>Nie</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionButton, betGuess === 'inny' && styles.selected]}
                  onPress={() => setBetGuess('inny')}
                >
                  <Text style={styles.optionText}>Inny wynik</Text>
                </TouchableOpacity>
              </View>
              {betGuess === 'inny' && (
                <>
                  <Text style={styles.label}>Wpisz swój typ</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="np. Zadzwoni tylko raz"
                    onChangeText={setBetContent}
                    value={betContent}
                  />
                </>
              )}
            </>
          )}

          <Text style={styles.label}>Typ nagrody</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.optionButton, rewardType === 'punkty' && styles.selected]}
              onPress={() => setRewardType('punkty')}
            >
              <Text style={styles.optionText}>Punkty</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, rewardType === 'rzeczowa' && styles.selected]}
              onPress={() => setRewardType('rzeczowa')}
            >
              <Text style={styles.optionText}>Własna rzecz</Text>
            </TouchableOpacity>
          </View>

          {rewardType === 'punkty' ? (
            <>
              <Text style={styles.label}>Liczba punktów</Text>
              <TextInput
                style={styles.input}
                value={reward}
                onChangeText={setReward}
                keyboardType="numeric"
                placeholder="np. 50"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Nazwa nagrody</Text>
              <TextInput
                style={styles.input}
                value={reward}
                onChangeText={setReward}
                placeholder="np. Kawa w Starbucksie"
              />
              <Text style={styles.label}>Opis nagrody</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={rewardDescription}
                onChangeText={setRewardDescription}
                multiline
              />
              <Text style={styles.label}>Zdjęcie nagrody</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadText}>Wybierz zdjęcie</Text>
              </TouchableOpacity>
              {rewardImage && <Image source={{ uri: rewardImage }} style={styles.imagePreview} />}
            </>
          )}

          <Text style={styles.label}>Zaproś uczestników</Text>
          <TextInput
            style={styles.input}
            placeholder="np. Ola, Bartek, Ania"
            value={participants}
            onChangeText={setParticipants}
          />

          <Text style={styles.label}>Kto może zobaczyć zadanie?</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.optionButton, visibility === 'private' && styles.selected]}
              onPress={() => setVisibility('private')}
            >
              <Text style={styles.optionText}>Tylko zaproszeni</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, visibility === 'public' && styles.selected]}
              onPress={() => setVisibility('public')}
            >
              <Text style={styles.optionText}>Publiczne</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Zapisz zadanie</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  background: { flex: 1, resizeMode: 'cover' },
  container: { padding: 16, paddingBottom: 32 },
  heading: { fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#3F51B5' },
  label: { fontSize: 16, fontWeight: '500', marginTop: 12, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f9f9f9' },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  optionButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff4ee', marginRight: 8, marginBottom: 4 },
  selected: { borderColor: '#E76617', backgroundColor: '#ffe7d7' },
  optionText: { color: '#E76617', fontWeight: '500', fontSize: 14 },
  uploadButton: { marginTop: 8, marginBottom: 12, padding: 10, backgroundColor: '#3F51B5', borderRadius: 10, alignItems: 'center' },
  uploadText: { color: '#fff', fontWeight: '600' },
  imagePreview: { width: '100%', height: 150, borderRadius: 10, marginTop: 10, resizeMode: 'cover' },
  submitButton: { marginTop: 24, backgroundColor: '#E76617', paddingVertical: 14, borderRadius: 16, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default ChallengeCreate;
