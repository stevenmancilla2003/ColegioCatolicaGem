// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBrKGWFINiyrB1tEmo_jgQDT4M-W3Ne1ow",
    authDomain: "colegio-catolica.firebaseapp.com",
    projectId: "colegio-catolica",
    storageBucket: "colegio-catolica.firebasestorage.app",
    messagingSenderId: "728518203318",
    appId: "1:728518203318:web:9321e1bf176f7074de1317",
    measurementId: "G-W7V4FVE9WW"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);