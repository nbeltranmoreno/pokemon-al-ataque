import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  }), []);

  const signup = async (email, password, name) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(credential.user, { displayName: name });
    return credential;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

  const logout = () => signOut(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-rose-700 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-3">⚡</div>
          <p className="text-white font-black text-[10px]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
