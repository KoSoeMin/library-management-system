import React, { useState } from 'react'
import { useParams } from 'react-router';
import useFirestore from '../hooks/useFirestore';

export default function BookForm() {

    const { bookId } = useParams();
    const [note, setNote]  = useState('');
    
    let { addCollection } = useFirestore();

    let addNote = async (e) => {
        e.preventDefault();
        let data = {
            note,
            bookUid: bookId
        }
        await addCollection('notes', data);
        setNote('')
    }

  return (
    <form action="" onSubmit={addNote}>
        <textarea value={note} onChange={e => setNote(e.target.value)} className='bg-gray-50 w-full shadow-md border-1' name='id' cols="30" rows="5"></textarea>
        <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 my-3 rounded transition duration-200 flex items-center gap-2">
            <span className=''>Add Note</span>
        </button>
    </form>
  )
}
