// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsNtdCNZPOoO2Ln9nHYOj_Gr04R3m91z0",
  authDomain: "clone-1-32115.firebaseapp.com",
  projectId: "clone-1-32115",
  storageBucket: "clone-1-32115.firebasestorage.app",
  messagingSenderId: "766880340228",
  appId: "1:766880340228:web:866d3e7cdd8b7a6fa95851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export them so you can import elsewhere in your app
export { auth, db };