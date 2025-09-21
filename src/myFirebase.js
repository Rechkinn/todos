import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhI0J6eriWGITZj2VOyVYQxP1AXg0C1Qo",
  authDomain: "todos-b78d5.firebaseapp.com",
  projectId: "todos-b78d5",
  storageBucket: "todos-b78d5.firebasestorage.app",
  messagingSenderId: "271992967090",
  appId: "1:271992967090:web:c059155285a74731c9deab",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
