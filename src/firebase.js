// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA4ZCy-Yg4n_QAADB6Hz3hi3X0o_rKx580',
    authDomain: 'chat-app-c460a.firebaseapp.com',
    projectId: 'chat-app-c460a',
    storageBucket: 'chat-app-c460a.appspot.com',
    messagingSenderId: '772716247615',
    appId: '1:772716247615:web:43712d9a8885f8cf2a968a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Create a root reference
export const storage = getStorage();
export const db = getFirestore();
