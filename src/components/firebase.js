// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZGvWtKxZJ7PQpDa3LM8SMBBTGm_OC8xw",
  authDomain: "carbonforge-c2047.firebaseapp.com",
  projectId: "carbonforge-c2047",
  storageBucket: "carbonforge-c2047.appspot.com",
  messagingSenderId: "17294355036",
  appId: "1:17294355036:web:bf6dfd3fb715b05b541499",
  measurementId: "G-WPJ4GWCZZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore


// Export the necessary instances
export { auth, googleProvider, analytics, db };
