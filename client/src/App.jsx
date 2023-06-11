//pages 
import Home from "./pages/home/Home.jsx";
import Create from "./pages/blogs/create.jsx";
import Blogs from "./pages/blogs/blogs.jsx";
import Blog from "./pages/blogs/blog/blog.jsx";
import User from "./pages/users/user.jsx";
import ProfileUser from "./pages/users/profileUser.jsx";
import Signup from "./pages/users/signup.jsx";
import NoMatch from "./components/error/nomatch.jsx";
import ErrorPage from "./components/error/error-page.jsx";

import { login } from './features/auth/authSlice.js';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom'


export default function App() {

  const [path, setPath] = useState(<Signup />)
  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // const isAuthorized = token && requiredRoles.includes(token.role);
    if (userInfo) {
      dispatch(login(userInfo));
      setPath(<App />)
    }

  }, [dispatch])

  return (
    <main>
      <Routes>

        <Route path="/" errorElement={<ErrorPage />} element={path}>
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

      </Routes>
    </main>
  )
}