import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

export default function useFirestore() {

    let getCollection = (collectionName) => {

        let [data, setData] = useState([]);
        let [loading, setLoading] = useState(false);
        let [error, setError] = useState(null);

        useEffect(function() {
            setLoading(true);
            let ref = collection(db, collectionName);
            let unsubscribe = onSnapshot(ref, snapshot => {
                let collectionDatas = snapshot.docs.map(bookDoc => ({
                id: bookDoc.id,
                ...bookDoc.data(),
                }));
                collectionDatas.sort((first, second) => {
                const firstTime = first.data?.toMillis?.() ?? 0;
                const secondTime = second.data?.toMillis?.() ?? 0;
                return secondTime - firstTime;
                });
                setData(collectionDatas);
                setLoading(false);
                setError(null);
            }, snapshotError => {
                setError(snapshotError.message);
                setLoading(false);
            })
            return unsubscribe;
        },[]);

        return { error, data, loading };
    }

    let addCollection = async (collectionName, data) => {
        data.date = serverTimestamp();
        //Create Firestore document books // Send the data to the firebase server
        let ref = collection(db, collectionName);
        return addDoc(ref, data);
    }

    let getDocument = (collectionName, bookId) => {

        let [data, setData] = useState(null);
        let [loading, setLoading] = useState(false);
        let [error, setError] = useState(null);

        useEffect(() => {
            setLoading(true);
            let ref = doc(db, collectionName, bookId);
            onSnapshot(ref, snapshot => {
                if (snapshot.exists()) {
                setData({
                    id: snapshot.id,
                    ...snapshot.data(),
                });
                setError(null);
                } else {
                setError('Book not found');
                }
                setLoading(false);
            }, snapshotError => {
                setError(snapshotError.message);
                setLoading(false);
            });
        }, [bookId]);

        return { error, data, loading };

    }

    let deleteDocument = async (collectionName, id) => {
        //Delete Firestore document books by id
        let ref = doc(db, collectionName, id);
        //Backend delete books in Firestore
        return deleteDoc(ref);
    }

    let updateDocument = async (collectionName, bookId, data) => {
        data.date = serverTimestamp();
        //Update Firestore document books by id
        let ref = doc(db, collectionName, bookId);
        return updateDoc(ref, data);
    }

    return { getCollection, addCollection, getDocument, deleteDocument, updateDocument };

}
