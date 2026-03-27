import { firebaseApp } from "../main.jsx";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export function getFirebaseRef(path) {
  const db = getDatabase(firebaseApp);
  return ref(db, path);
}

export function updateFirebaseValue(path, value) {
  const db = getDatabase(firebaseApp);
  return set(ref(db, path), value);
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