import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnKe7h0DLTau6iASFuy14NTmnw71YIxh4",
  authDomain: "primetech-solutions-c7806.firebaseapp.com",
  projectId: "primetech-solutions-c7806",
  storageBucket: "primetech-solutions-c7806.appspot.com", // ✅ FIXED: was .firebasestorage.app
  messagingSenderId: "1036506607623",
  appId: "1:1036506607623:web:afcd2593b1394325e77aa2",
  measurementId: "G-T8WB37LB0N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ FIXED: wrapped in try/catch to prevent crash during Vercel build/SSR
export const analytics =
  typeof window !== "undefined"
    ? (() => {
        try {
          return getAnalytics(app);
        } catch {
          return null;
        }
      })()
    : null;

// ✅ Export storage once from here — do NOT call getStorage(app) again in other files
export const storage = getStorage(app);