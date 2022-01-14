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
import { createUser } from "./createUser";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

interface AuthType {
  user: UserType | null;
  signinWithGitHub: () => Promise<UserType | null>;
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

export interface UserType {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
}

const useProvideAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleUser = (user: User | null) => {
    if (user) {
      const userData: UserType = {
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        providerId: user.providerData[0].providerId,
      };

      createUser(userData.uid, userData);
      setUser(userData);
      return userData;
    } else {
      setUser(null);
      return null;
    }
  };

  const auth = getAuth(app);
  const provider = new GithubAuthProvider();

  const signinWithGitHub = async () => {
    return await signInWithPopup(auth, provider).then((result) => {
      return handleUser(result.user);
    });
  };

  const signout = async () => {
    return await signOut(auth).then(() => {
      handleUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signout,
  };
};
