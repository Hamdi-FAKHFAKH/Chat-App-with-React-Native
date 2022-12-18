// Import the functions you need from the SDKs you need
import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB20PiLZ05Tbt60yFTFP_t4-LUp4IiAQBM',
  authDomain: 'chatapp-4d54e.firebaseapp.com',
  databaseURL:
    'https://chatapp-4d54e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chatapp-4d54e',
  storageBucket: 'chatapp-4d54e.appspot.com',
  messagingSenderId: '292515041737',
  appId: '1:292515041737:web:f489539b0930682b1d1818',
  measurementId: 'G-3D54TPGCV2',
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);
export default initfirebase;
