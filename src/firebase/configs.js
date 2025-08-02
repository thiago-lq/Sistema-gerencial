// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHe2MywQR-mxD3NQdBeeOfaFpSvsmmg68",
  authDomain: "db-lojabicicleta.firebaseapp.com",
  projectId: "db-lojabicicleta",
  storageBucket: "db-lojabicicleta.firebasestorage.app",
  messagingSenderId: "941426161769",
  appId: "1:941426161769:web:53b7117b2bb9b70636caf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth(app)