import React, { createContext, useState, useContext, useEffect } from "react";
import auth from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
  signOut,
} from "firebase/auth";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const signup = (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout =  () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {!isAuthenticated && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
