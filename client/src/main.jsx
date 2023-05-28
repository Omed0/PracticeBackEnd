import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'

import Home from "./pages/home/Home.jsx";
import Create from "./pages/blogs/create.jsx";
import Blogs from "./pages/blogs/blogs.jsx";
import Blog from "./pages/blogs/blog/blog.jsx";
import User from "./pages/users/user.jsx";
import ProfileUser from "./pages/users/profileUser.jsx";
import Signup from "./pages/users/signup.jsx";
import NoMatch from "./components/error/nomatch.jsx";
import ErrorPage from "./components/error/error-page.jsx";


import { store } from './app/store.js';
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<App />}>

      <Route index={true} element={<Home />} />

      <Route path="blogs" >
        <Route index={true} element={<Blogs />} />
        <Route path="create" element={<Create />} />
        <Route path=":id" element={<Blog />} />
      </Route>

      <Route path="users" >
        <Route index={true} element={<User />} />
        <Route path=":id" element={<ProfileUser />} />
      </Route>

      <Route path="/auth" element={<Signup />} />
      <Route path="*" element={<NoMatch />} />

    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)