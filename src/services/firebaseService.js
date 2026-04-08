import { firebaseApp } from "../main.jsx";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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
