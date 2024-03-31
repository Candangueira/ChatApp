import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState({});

  // Effect hook to listen to the authentication state
  useEffect(() => {
    // Unsubscribe function to stop listening to the authentication state
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};