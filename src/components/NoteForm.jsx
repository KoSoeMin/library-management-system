import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useFirestore from '../hooks/useFirestore';

export default function BookForm( { type = 'create', setEditNote, editNote } ) {

    const { bookId } = useParams();
    const [note, setNote]  = useState('');
    
    let { addCollection } = useFirestore();

    useEffect(() => {
        if (type === 'update') {
            setNote(editNote.note)
        } 
    }, [type])

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
    <form onSubmit={addNote} >
        <textarea
            id="note-input"
            name="note"
            rows="4"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts, quotes, or key takeaways here..."
            className="w-full p-3.5 text-slate-800 placeholder-slate-400 text-sm leading-relaxed rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 resize-y"
        />

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
                Saved directly to your book notes
            </span>

            <div className='flex space-x-3'>
                <button
                    type="submit"
                    disabled={!note.trim()}
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-sm shadow-green-600/20 transition-all duration-200 cursor-pointer"
                >
                    <span>{ type === 'create' ? 'Add' : 'Update'} Note</span>
                </button>
                { type === 'update' && <button
                    type="button"
                    onClick={() => {setEditNote(null)}}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-sm shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
                >
                    <span>Cancel</span>
                </button>}
            </div>
        </div>
    </form>
  )
}
