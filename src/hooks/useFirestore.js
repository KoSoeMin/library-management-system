import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase';

export function useCollection(collectionName, field, operator, value, enabled = true) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData([]);
        setError(null);
        if (!enabled || value == null) {
            setLoading(false);
            return undefined;
        }

        setLoading(true);
        const collectionRef = collection(db, collectionName);
        const collectionQuery = query(collectionRef, where(field, operator, value));
        const unsubscribe = onSnapshot(collectionQuery, snapshot => {
            const collectionData = snapshot.docs.map(bookDoc => ({
                id: bookDoc.id,
                ...bookDoc.data(),
            }));
            collectionData.sort((first, second) => {
                const firstTime = first.date?.toMillis?.() ?? 0;
                const secondTime = second.date?.toMillis?.() ?? 0;
                return secondTime - firstTime;
            });
            setData(collectionData);
            setLoading(false);
            setError(null);
        }, snapshotError => {
            setError(snapshotError.message);
            setLoading(false);
        });

        return unsubscribe;
    }, [collectionName, field, operator, value, enabled]);

    return { error, data, loading };
}

export default function useFirestore() {

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

    return { addCollection, getDocument, deleteDocument, updateDocument };

}
