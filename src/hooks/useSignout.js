import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase/index';
import { signOut } from 'firebase/auth';

function formatFirebaseError(code, message) {
    const messages = {
        'auth/email-already-in-use': 'An account already exists with this email.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/missing-email': 'Please enter your email address.',
        'auth/missing-password': 'Please enter a password.',
        'auth/weak-password': 'Password should be at least 6 characters.',
    };

    return messages[code] || message || 'Could not complete signout.';
}

export default function useSignout() {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signout = async () => {
        setIsPending(true);
        setError(null);

        try {
            await signOut(auth);
        } catch (err) {
            setError(formatFirebaseError(err.code, err.message));
            return null;
        } finally {
            setIsPending(false);
        }
    };

  return { error, isPending, signout }
}
