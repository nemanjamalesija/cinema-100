// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBNtWd7J3pMiFqqjpkeRGq8pr6QBrgPtH0',
  authDomain: 'cinema-100.firebaseapp.com',
  projectId: 'cinema-100',
  storageBucket: 'cinema-100.appspot.com',
  messagingSenderId: '12062736803',
  appId: '1:12062736803:web:4dc99bcb17b142a8e71a16',
};

export const initialize = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  return { firebaseApp, db, auth };
};
