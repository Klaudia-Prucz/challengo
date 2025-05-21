import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAQAZwgWXwvugHiKzVGbwbMKKxIchGwaUk',
  authDomain: 'chall-app-b6f18.firebaseapp.com',
  projectId: 'chall-app-b6f18',
  storageBucket: 'chall-app-b6f18.appspot.com',
  messagingSenderId: '617595303270',
  appId: '1:617595303270:web:6a804f7c278ae1c33144a7',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
