import { Link, useParams } from 'react-router';
import bookImg from '../assets/images.jpg'
import useFirestore from '../hooks/useFirestore';
import { getBookCoverUrl } from '../utils/bookCover'
import BookForm from '../components/BookForm';

export default function BookDetail() {

    const { bookId } = useParams();

    let { getDocument } = useFirestore();
    let { error, data: book, loading } = getDocument('books', bookId);
  
    //  const { data : book, loading, error } = useFetch(`http://localhost:3000/books/${bookId}`);

     if (loading) {
       return (
         <p className="py-16 text-center text-sm font-medium text-slate-500">
           Loading book details...
         </p>
       );
     }
     if (error) {
       return (
         <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
           Error: {error}
         </p>
       );
     }

  return (
    <section className="py-2 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          <span aria-hidden="true">&larr;</span>
          Back to collection
        </Link>

        { book && (
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-50 p-8 sm:p-12">
              <img
                src={book.coverUrl ? getBookCoverUrl(book.coverUrl) : bookImg}
                alt={`${book.title} cover`}
                className="max-h-[28rem] max-w-full rounded-xl object-contain shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Book details
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {book.title}
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {book.categories?.map(category => (
                  <span
                    key={category}
                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  About this book
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {book.description}
                </p>
              </div>
            </div>
          </article>
        ) }
      </div>
      <div className="mx-auto max-w-4xl py-5">
        <h3 className='font-bold text-xl text-center'>My Notes</h3>
        <BookForm/>
        <div className='border-1 shadow-md p-3 my-2'>
          <div className='flex space-x-3'>
            <img className='rounded-full w-12 h-12' src="https://avatars.githubusercontent.com/u/197745210?v=4" alt="" />
            <div>
              <h3>Ko Soe Min</h3>
            <div>16.11.2026</div>
            </div>
          </div>
          <div className='mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestiae dolore amet repellat ex nulla ad, hic non iusto numquam iste deleniti, necessitatibus temporibus velit iure laudantium adipisci. Eos, iste.
          </div>
        </div>
      </div>
    </section>
  )
}
