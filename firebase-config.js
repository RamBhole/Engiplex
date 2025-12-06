// firebase-config.js (Final version for ENGIPLEX)
// Uses Firebase Firestore + Auth (SDK v9)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjQ0sYW7w8sXJJsRxag8t1bIzxQytwEjc",
  authDomain: "engiplex-web.firebaseapp.com",
  databaseURL: "https://engiplex-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "engiplex-web",
  storageBucket: "engiplex-web.appspot.com",
  messagingSenderId: "426410116767",
  appId: "1:426410116767:web:e452d955613eee2bbbc4aa",
  measurementId: "G-X72WK6C1ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const db = getFirestore(app);
export const auth = getAuth(app);