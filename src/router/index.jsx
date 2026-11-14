import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Home from "../pages/Home";
import Layout from "../pages/Layouts/Layout";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { AuthContext } from "../contexts/AuthContext";

export default function index() {

let { authReady, user } = useContext(AuthContext);

const isAuthenticated = Boolean(user);

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Best practice for the default child route matching the parent's path
        element: isAuthenticated ? <Home /> : <Navigate to="/login"/>,
      },
      {
        path: "books/:bookId", // Relative path without the leading slash inside children
        element: isAuthenticated ? <BookDetail /> : <Navigate to="/login"/>,
      },
      {
        path: "create", // Relative path
        element: isAuthenticated ? <BookForm /> : <Navigate to ="/login"/>,
      },
      {
        path: "edit/:bookId", // Relative path
        element: isAuthenticated ? <BookForm /> : <Navigate to ="/login"/>,
      },
      {
        path: "search", // Relative path
        element: isAuthenticated ? <Search /> : <Navigate to="/login"/>,
      },
      {
        path: "register", // Relative path
        element: !isAuthenticated ?  <Register /> : <Navigate to="/"/>,
      },
      {
        path: "login", // Relative path
        element: !isAuthenticated ? <Login /> : <Navigate to="/"/>,
      },
    ],
  },
]);

  return (
    authReady && <RouterProvider router={router} />
  )
}

