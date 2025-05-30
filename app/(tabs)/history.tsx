import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useRouter } from 'expo-router';

const HistoryScreen = () => {
  const [filter, setFilter] = useState<'wszystkie' | 'wygrane' | 'przegrane'>('wszystkie');
  const [historyData, setHistoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'challenges'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistoryData(items);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData =
    filter === 'wszystkie'
      ? historyData
      : historyData.filter((item) => item.status === filter);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={require('../../assets/background_standard.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerSpacer} />
          <Text style={styles.heading}>Historia zakładów</Text>

          {/* Filtry */}
          <View style={styles.row}>
            {['wszystkie', 'wygrane', 'przegrane'].map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, filter === f && styles.selected]}
                onPress={() => setFilter(f as any)}
              >
                <Text style={styles.filterText}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Lista */}
          {filteredData.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/challenge-details',
                  params: {
                    title: item.title,
                    type: item.type,
                    duration: item.duration,
                    description: item.description,
                    reward: item.reward,
                    invitees: item.invitees,
                    note: item.note,
                    status: item.status,
                    canBet: 'false',
                  },
                })
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardStatus}>{(item.status || 'nierozstrzygnięte').toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerSpacer: {
    height: 48,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3F51B5',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff4ee',
  },
  selected: {
    borderColor: '#E76617',
    backgroundColor: '#ffe7d7',
  },
  filterText: {
    color: '#E76617',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardStatus: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
});

export default HistoryScreen;
