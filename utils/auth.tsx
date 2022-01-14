import React, { createContext, useContext, useEffect, useState } from "react";
import app from "./firebase";
import "firebase/auth";
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

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
