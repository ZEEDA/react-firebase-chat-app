import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDuxKBZ55keCUodt_dDtZeaaw14PpyiEI",
  authDomain: "chat-e5cf6.firebaseapp.com",
  projectId: "chat-e5cf6",
  storageBucket: "chat-e5cf6.appspot.com",
  messagingSenderId: "611805157350",
  appId: "1:611805157350:web:a9ea704ae4c62e3ab82827",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
