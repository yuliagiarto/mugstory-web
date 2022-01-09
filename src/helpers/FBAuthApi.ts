import { auth, firebase } from "../firebase";
import { useState, useEffect } from "react";
import router from "next/router";

interface IUser {
  uid: string | null | undefined;
  email: string | null | undefined;
}

const formatAuthUser: (user: firebase.User | null) => IUser | null = (
  user: firebase.User | null
) => ({
  uid: user?.uid,
  email: user?.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null as IUser | null);
  const [loading, setLoading] = useState(true);

  const authStateChanged: (authState: firebase.User | null) => any = (
    authState: firebase.User | null
  ) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);

    setLoading(false);
  };
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
