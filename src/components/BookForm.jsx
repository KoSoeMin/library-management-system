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
    <form onSubmit={addNote} >
        <div className="flex items-center justify-between mb-3">
            <label 
                htmlFor="note-input" 
                className="flex items-center gap-2 text-sm font-semibold text-slate-800 tracking-tight"
            >
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                New Note
            </label>
            <span className="text-xs font-medium text-slate-400">
                {note.length} chars
            </span>
        </div>

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

            <button
                type="submit"
                disabled={!note.trim()}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-sm shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
            >
                <svg 
                    xmlns="http://w3.org" 
                    className="h-4 w-4" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                        clipRule="evenodd" 
                    />
                </svg>
                <span>Add Note</span>
            </button>
        </div>
    </form>
  )
}
