import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import images from '../assets/images.jpg'
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BookList() {

  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search')?.trim().toLocaleLowerCase() ?? '';

  // const { data: books, loading, error } = useFetch('http://localhost:3000/books', "GET");

  let [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  useEffect(function() {
      setLoading(true);
      let ref = collection(db, 'books');
      getDocs(ref).then((docs) => {
        let booksData = [];
        docs.forEach((doc) => {
          booksData.push({ id: doc.id, ...doc.data() });
        });
        setBooks(booksData);
        setLoading(false);
      }).catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  },[]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredBooks = (books ?? []).filter((book) => {
    if (!search) return true;

    const searchableText = [
      book.title,
      book.description,
      ...(Array.isArray(book.categories) ? book.categories : []),
    ].join(' ').toLocaleLowerCase();

    return searchableText.includes(search);
  });

  return (
    <section className="px-4 pb-12 sm:px-6">

      {!!books && (
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Your collection
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Discover books
              </h2>
            </div>
            <span className="text-sm text-slate-500">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.length === 0 ? (
              <p className="col-span-full text-center text-slate-500">No books found{search ? ` for "${search}"` : ''}.</p>
            ) : filteredBooks.map((book) => (
              <Link 
                key={book.id} 
                to={`/books/${book.id}`} 
                className="block" // Prevents layout shifts from the Link wrapper
              >
                <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="bg-slate-100">
                    <img
                      src={images}
                      alt={`${book.title} cover`}
                      className="aspect-[2/3] w-full object-contain"
                    />
                  </div>
                  
                  <div className="space-y-3 p-5">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 line-clamp-2"> {/* Added line-clamp to keep card sizes uniform */}
                        {book.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {book.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
