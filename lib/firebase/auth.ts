import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

export async function loginAdmin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}

export function onAuthChange(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}
