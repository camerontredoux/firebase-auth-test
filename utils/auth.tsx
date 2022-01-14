import React, { createContext, useContext, useEffect, useState } from "react";
import "firebase/auth";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

interface AuthType {
  user: User | null;
  signinWithGitHub: () => Promise<User>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);
  const provider = new GithubAuthProvider();

  const signinWithGitHub = async () => {
    return await signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
      return result.user;
    });
  };

  const signout = async () => {
    return await signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signout,
  };
};
