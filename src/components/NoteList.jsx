import { useParams } from 'react-router';
import { useCollection } from '../hooks/useFirestore';

export default function NoteList() {
    const { bookId } = useParams();
    const { error, data: notes, loading } = useCollection(
        'notes',
        'bookUid',
        '==',
        bookId,
        Boolean(bookId)
    );

    if (loading) {
        return <p className="py-4 text-center text-sm text-slate-500">Loading notes...</p>;
    }

    if (error) {
        return <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Error: {error}</p>;
    }

  return (
    <div className="my-4 space-y-3">
        {notes.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-500">No notes for this book yet.</p>
        ) : notes.map(note => (
            <div className='flex space-x-3'>
                <img className='rounded-full w-12 h-12' src="https://avatars.githubusercontent.com/u/197745210?v=4" alt="" />
                <article key={note.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3>Ko Soe Min</h3>
                    <time className="text-xs text-slate-500">
                        {note.date?.toDate?.().toLocaleDateString() ?? 'Just now'}
                    </time>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{note.note}</p>
                </article>
            </div>
        ))}
    </div>
  )
}
