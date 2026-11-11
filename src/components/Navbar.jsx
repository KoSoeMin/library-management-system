import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useTheme from '../hooks/useTheme'
import lightIcon from '../assets/light.svg'
import darkIcon from '../assets/dark.svg'

export default function Navbar() {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const query = search.trim();
        navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
    }

    let {theme, changeTheme} = useTheme();


  return (
    <div>
        <nav className="border border-b-1">
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <form onSubmit={handleSearch} className="flex items-center gap-3">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} className='border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                            type="text"
                            placeholder="Search Books..."
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded transition duration-200 flex items-center gap-2">
                            <span className='hidden md:block'>Search</span>
                        </button>
                    </form>
                </li>
                
                <li className='flex items-center gap-3 md:-ml-35'>
                    <Link to="/" className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                        </svg>
                        <span className='text-2xl font-bold text-indigo-600 hidden md:block'>
                            Book Store
                        </span>
                    </Link>
                </li>

                <li className='flex items-center gap-3'>
                    {/* create books */}
                    <Link to="/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='hidden md:block'>Create Book</span>
                    </Link>

                    {/* profile image */}
                    <div className='w-11'>
                        <img className='rounded-full' src="https://avatars.githubusercontent.com/u/197745210?v=4" alt="" />
                    </div>
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                        <img src={theme === 'dark' ? lightIcon : darkIcon} alt="" />
                    </button>
                </li>
            </ul>
        </nav>
    </div>
  )
}
