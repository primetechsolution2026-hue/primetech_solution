// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnKe7h0DLTau6iASFuy14NTmnw71YIxh4",
  authDomain: "primetech-solutions-c7806.firebaseapp.com",
  projectId: "primetech-solutions-c7806",
  storageBucket: "primetech-solutions-c7806.firebasestorage.app",
  messagingSenderId: "1036506607623",
  appId: "1:1036506607623:web:afcd2593b1394325e77aa2",
  measurementId: "G-T8WB37LB0N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics only runs in the browser (not during SSR)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;