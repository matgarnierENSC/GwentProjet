import { firebaseApp } from "../main.jsx";
import { getDatabase, ref, set, get } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function getFirebaseRef(path) {
  const db = getDatabase(firebaseApp);
  return ref(db, path);
}

export function updateFirebaseValue(path, value) {
  const db = getDatabase(firebaseApp);
  return set(ref(db, path), value);
}

export async function readFirebaseValue(path) {
  const db = getDatabase(firebaseApp);
  const snapshot = await get(ref(db, path));
  return snapshot.val();
}

export function getCurrentUser() {
  return getAuth(firebaseApp).currentUser;
}

export async function getUserDeck(userId) {
  const deck = await readFirebaseValue(`users/${userId}/deck`);
  return deck || [];
}

export async function saveUserDeck(userId, cardKeys) {
  return updateFirebaseValue(`users/${userId}/deck`, cardKeys);
}

export async function getAllCardStats() {
  const stats = await readFirebaseValue("cards");
  return stats || {};
}

export function loginWithGoogle() {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logout() {
  const auth = getAuth(firebaseApp);
  return signOut(auth);
}

export function onAuthChange(callback) {
  const auth = getAuth(firebaseApp);
  return onAuthStateChanged(auth, callback);
}