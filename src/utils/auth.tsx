import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
  unlink,
  linkWithRedirect,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser } from "./createUser";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

export interface AuthType {
  user: UserType | null;
  signinWithGitHub: () => Promise<UserType | null>;
  signinWithGoogle: () => Promise<UserType | null>;
  linkAccounts: () => Promise<any>;
  unlinkAccount: () => Promise<any>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthType>({} as AuthType);

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
  providerData: string[];
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
        providerData: user.providerData.map((provider) => provider.providerId),
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
  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const signinWithGitHub = async () => {
    return await signInWithPopup(auth, githubProvider)
      .then((result) => {
        return handleUser(result.user);
      })
      .catch(async () => {
        await signInWithRedirect(auth, googleProvider);
        const result = await getRedirectResult(auth);

        return handleUser(result?.user!);
      });
  };

  const signinWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider).then((result) => {
      return handleUser(result.user);
    });
  };

  const linkAccounts = async () => {
    return await linkWithPopup(auth.currentUser!, githubProvider)
      .then((result) => {
        return handleUser(result.user);
      })
      .catch(async () => {
        await linkWithRedirect(auth.currentUser!, githubProvider);
        const result = await getRedirectResult(auth);

        return handleUser(result?.user!);
      });
  };

  const unlinkAccount = async () => {
    return await unlink(auth.currentUser!, githubProvider.providerId).then(
      (result) => {
        handleUser(result);
      }
    );
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
    signinWithGoogle,
    linkAccounts,
    unlinkAccount,
    signout,
  };
};
