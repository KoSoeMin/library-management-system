import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase/index';
import { signInWithEmailAndPassword } from 'firebase/auth';

function formatFirebaseError(code, message) {
    const messages = {
        'auth/email-already-in-use': 'An account already exists with this email.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/missing-email': 'Please enter your email address.',
        'auth/missing-password': 'Please enter a password.',
        'auth/weak-password': 'Password should be at least 6 characters.',
    };

    return messages[code] || message || 'Could not complete signup.';
}

export default function useSignin() {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signin = async (email, password) => {
        setIsPending(true);
        setError(null);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            if (!res) {
                throw new Error("Could not complete signin");
            }
            return res.user;
        } catch (err) {
            setError(formatFirebaseError(err.code, err.message));
            return null;
        } finally {
            setIsPending(false);
        }
    };

  return { error, isPending, signin }
}
