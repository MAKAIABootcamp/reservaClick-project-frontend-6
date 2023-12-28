// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtaJCTyoB687V7IU2ddl922nXwbDF6MeY',
  authDomain: 'reservaclick-23151.firebaseapp.com',
  projectId: 'reservaclick-23151',
  storageBucket: 'reservaclick-23151.appspot.com',
  messagingSenderId: '316452630953',
  appId: '1:316452630953:web:73d9bc6a562688ea4714b8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
