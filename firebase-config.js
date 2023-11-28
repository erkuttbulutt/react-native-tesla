// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBpF7fPmWMFqQcHKPuECSU8EWWhY5HLlFo',
  authDomain: 'react-native-tesla.firebaseapp.com',
  projectId: 'react-native-tesla',
  storageBucket: 'react-native-tesla.appspot.com',
  messagingSenderId: '856987775648',
  appId: '1:856987775648:web:83afe5d9f1ae04f7dd8fc5',
  measurementId: 'G-BNBSKXKSZM',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
