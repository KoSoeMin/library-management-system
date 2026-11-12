import { initializeApp } from 'firebase/app';
import{ getFirestore } from 'firebase/firestore';  
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmsaoNGB-HG8ehoufnNrHqApFExYtkndw",
  authDomain: "library-app-dec93.firebaseapp.com",
  projectId: "library-app-dec93",
  storageBucket: "library-app-dec93.firebasestorage.app",
  messagingSenderId: "966234588283",
  appId: "1:966234588283:web:b2eeec0cc30fd9c1e34ede",
  measurementId: "G-MXZQPHC35W"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);