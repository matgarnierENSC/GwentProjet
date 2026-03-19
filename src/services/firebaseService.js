import { firebaseApp } from "../main.jsx";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// --- DATABASE ---
export function getFirebaseRef(path) {
  const db = getDatabase(firebaseApp);
  return ref(db, path);
}

export function updateFirebaseValue(path, value) {
  const db = getDatabase(firebaseApp);
  return set(ref(db, path), value);
}

// --- AUTH ---
export function loginWithGoogle() {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logout() {
  const auth = getAuth(firebaseApp);
  return signOut(auth);
}

// Écoute les changements de connexion en temps réel
// callback reçoit l'utilisateur connecté ou null si déconnecté
export function onAuthChange(callback) {
  const auth = getAuth(firebaseApp);
  return onAuthStateChanged(auth, callback);
}