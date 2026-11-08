import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import  useFetch  from '../hooks/useFetch'

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const {setPostData, data:book, loading, error} = useFetch('http://localhost:3000/books', "POST");

  const navigate = useNavigate();

  const addCategory = () => {
    const category = newCategory.trim();
    if (!category) return;

    setCategories(prev => prev.includes(category) ? prev : [category, ...prev])
    setNewCategory('')
  }

  const addBook = (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories
    }
    setPostData(data);
  }

  useEffect(() => {
    if(book) {
      navigate('/');
    }
  },[book, navigate])

  return (
    <section  className="mx-auto max-w-2xl py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Add a new book</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          Add the details below to grow your personal library.
        </p>
      </header>
      <form onSubmit={addBook} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
              Book title
            </label>
            <input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="e.g. The Midnight Library"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="block min-h-36 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              id="description"
              placeholder="Write a short summary of the book..."
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <div className="flex items-center gap-3">
              <input
                id="category"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="block min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="e.g. Fiction"
              />
              <button
                type='button' onClick={addCategory} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                aria-label="Add category"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  {category}
                </span>
              ))}
            </div>
        </div>

        {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              Unable to create the book: {error}
            </p>
        )}

        <button disabled={loading} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{loading ? 'Creating book...' : 'Create book'}</span>
        </button>
      </form>
    </section>
  )
}
