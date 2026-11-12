import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Layout from "../pages/Layouts/Layout";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Best practice for the default child route matching the parent's path
        element: <Home />,
      },
      {
        path: "books/:bookId", // Relative path without the leading slash inside children
        element: <BookDetail />,
      },
      {
        path: "create", // Relative path
        element: <BookForm />,
      },
      {
        path: "edit/:bookId", // Relative path
        element: <BookForm />,
      },
      {
        path: "search", // Relative path
        element: <Search />,
      },
    ],
  },
]);

export default router;
