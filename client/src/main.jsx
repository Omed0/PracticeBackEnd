import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'

import About from "./pages/about/about.jsx";
import Create from "./pages/blogs/create.jsx";
import Blogs from "./pages/blogs/blogs.jsx";
import Blog from "./pages/blogs/blog/blog.jsx";
import User from "./pages/users/user.jsx";
import ProfileUser from "./pages/users/profileUser.jsx";
import Signup from "./pages/users/signup.jsx";
import NoMatch from "./components/nomatch.jsx";



import ErrorPage from "./components/error-page.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "blogs",
    element: <Blogs />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "create",
        element: <Create />,
      },
      {
        path: ":id",
        element: <Blog />,
      },
    ],
  },
  {
    path: "users",
    element: <User />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":id",
        element: <ProfileUser />,
      },
    ],
  },
  {
    path: "auth",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NoMatch />,
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)



  // const BrowserRouter = createBrowserRouter({
  //   routeError: ({ error }) => {
  //     return (
  //       <ErrorPage
  //         error={error}
  //         title="Page Not Found"
  //         description="Sorry, the page you were trying to view does not exist."
  //       />
  //     );
  //   },
  //   routeSuspense: () => {
  //     return (
  //       <ErrorPage
  //         title="Loading..."
  //         description="Please wait while we load the page."
  //       />
  //     );
  //   },
  // },
  //   {
  //     useHash: true,
  //     basename: "/",
  //     window,
  //   }
  // );