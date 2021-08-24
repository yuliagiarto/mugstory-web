import { auth } from "../firebase";
import { useState, useEffect } from 'react'

interface IUser{
    uid: string
    email:string
}

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState({});
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState:IUser) => {
        if (!authState) {
            setLoading(false)
            return;
        }

        setLoading(true)

        setAuthUser(authState);

        setLoading(false);

    };
    const clear = () => {
        setAuthUser({});
        setLoading(true);
    };
  
    const signInWithEmailAndPassword = (email:string, password:string) =>
      auth.signInWithEmailAndPassword(email, password);
  
    const createUserWithEmailAndPassword = (email:string, password:string) =>
      auth.createUserWithEmailAndPassword(email, password);
  
    const signOut = () =>
      auth.signOut().then(clear);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(authStateChanged as any);
      return () => unsubscribe();
    }, []);
  
    return {
      authUser,
      loading,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut
    };
  }