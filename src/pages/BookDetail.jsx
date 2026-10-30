import React from 'react'
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';


export default function BookDetail() {

     const { bookId } = useParams();

     const { data : book, loading, error } = useFetch(`http://localhost:3000/books/${bookId}`);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;

  return (
    <>
        {book && (
            <h1>{book.title}</h1>
        )}
    </>
  )
}
