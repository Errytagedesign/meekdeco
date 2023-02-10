import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt9dOQwFGL4iZRlwaIidmrqSq5Y87kZ20",
  authDomain: "meekdeco-12cb9.firebaseapp.com",
  projectId: "meekdeco-12cb9",
  storageBucket: "meekdeco-12cb9.appspot.com",
  messagingSenderId: "849321108486",
  appId: "1:849321108486:web:40f87a7b9c5cc520d58f87",
};

// initialize firebase
const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  auth,
  app,
  firestore,
  storage,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
