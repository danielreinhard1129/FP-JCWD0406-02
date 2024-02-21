'use client'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useContext, createContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userGoogle, setUser] = useState(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unSubscribe()
    }, [userGoogle])
    return (
        <AuthContext.Provider value={{ userGoogle, googleSignIn, logOut }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
} 