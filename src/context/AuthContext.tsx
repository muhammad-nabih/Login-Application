import React, { createContext, useState, useContext, useEffect } from "react";
import auth from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  generatePasswordResetLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
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

  const logout = () => {
    return signOut(auth);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserEmail = (email: string) => {
    if (auth.currentUser) {
      return updateEmail(auth.currentUser, email);
    }
    throw new Error("No user is currently signed in");
  };

  const updateUserPassword = (password: string) => {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    }
    throw new Error("No user is currently signed in");
  };

  const sendVerificationEmail = (email: string) => {
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser);
    }
    throw new Error("No user is currently signed in");
  };

  const generatePasswordResetLink = (email: string) => {
    return sendPasswordResetEmail(auth, email);
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
        login,
        generatePasswordResetLink,
        updateUserEmail,
        updateUserPassword,
        sendVerificationEmail,
      }}
    >
      {children}
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
