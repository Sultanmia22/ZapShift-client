import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
const Googleprovider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    //! Creat User 
    const creatUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //! Sign in User 
    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    //! sign in google 
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth,Googleprovider)
    }

    //! Sign Out User 
    const signOutUser = () => {
        return signOut(auth)
    }

    //! Update Profile 
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser,profile)
    }

    //! user observe 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    },[])

    const authInfo = {
        creatUser,
        signInUser,
        googleSignIn,
        loading,
        user,
        signOutUser,
        updateUserProfile
    }

    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;