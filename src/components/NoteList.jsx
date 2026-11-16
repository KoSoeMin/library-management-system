import { useParams } from 'react-router';
import useFirestore, { useCollection } from '../hooks/useFirestore';
import deleteIcon from '../assets/delete.svg';

export default function NoteList() {
  const { bookId } = useParams();
  const { error, data: notes, loading } = useCollection(
    'notes',
    'bookUid',
    '==',
    bookId,
    Boolean(bookId)
  );

  const { deleteDocument } = useFirestore();

  const handleDeleteNote = async (noteId) => {
    await deleteDocument('notes', noteId)

  };

  if (loading) {
    return (
      <div className="my-6 space-y-4">
        {[1, 2].map((skeleton) => (
          <div
            key={skeleton}
            className="flex animate-pulse items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
              <div className="mt-4 h-12 w-full rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700">
        <p className="font-medium">Unable to load notes</p>
        <p className="mt-1 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-6 space-y-4">
      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-10 text-center">
          <p className="text-sm font-medium text-slate-600">No notes yet</p>
          <p className="mt-1 text-xs text-slate-400">
            Thoughts and highlights you add for this book will appear here.
          </p>
        </div>
      ) : (
        notes.map((note) => (
          <article
            key={note.id}
            className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            {/* Author Avatar */}
            <img
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
              src="https://avatars.githubusercontent.com/u/197745210?v=4"
              alt="Ko Soe Min"
            />

            {/* Note Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Ko Soe Min
                  </h3>
                  <time className="block text-xs text-slate-400">
                    {note.date?.toDate?.().toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }) ?? 'Just now'}
                  </time>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  aria-label="Delete note"
                  className="rounded-lg p-2 text-white bg-red-500 opacity-90 transition-all hover:bg-red-700 hover:opacity-100 group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
                >
                  <img
                    src={deleteIcon}
                    alt=""
                    className="cursor-pointer h-4 w-4 transition-transform active:scale-90"
                  />
                </button>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {note.note}
              </p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
