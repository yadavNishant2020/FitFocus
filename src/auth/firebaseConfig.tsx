// src/firebaseConfig.js
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyT2UOTu3Mz57jFER_kOiY9h3u5QKfh7E',
  authDomain: 'fitfocus-423409.web.app',
  projectId: 'fitfocus-423409',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {auth};
