import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'

//test
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

setupLogRocketReact(LogRocket);
LogRocket.init('2sxbui/test');
LogRocket.identify('2sxbui', {
  name: 'dexa_fen',
  email: 'dexafen413@aramask.com',
});

//pages 

import Home from "./pages/home/Home.jsx";
import Create from "./pages/blogs/create.jsx";
import Blogs from "./pages/blogs/blogs.jsx";
import Blog from "./pages/blogs/blog/blog.jsx";
import User from "./pages/users/user.jsx";
import EditUser from "./pages/users/editUser.jsx";
import Signup from "./pages/users/signup.jsx";
import NoMatch from "./components/error/nomatch.jsx";
import ErrorPage from "./components/error/error-page.jsx";
import ListCard from "./pages/ListCard/card.jsx";

import PrivateRoute from './components/HOC/PrivateRoute.jsx';
import { Provider } from 'react-redux'
import { store } from './app/store.js';
import {
  RouterProvider, Route,
  createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom'

const Role = {
  'user': 'user',
  'admin': 'admin',
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<App />}>
      <Route index={true} element={<Home />} />

      <Route path="blogs" >
        <Route index={true} element={<Blogs />} />
        <Route element={<PrivateRoute allowedRole={[Role.admin, Role.user]} />} >
          <Route path="create" element={<Create />} />
          <Route path=":id" element={<Blog />} />
        </Route>
      </Route>

      <Route path="users" >
        <Route index={true} element={<User />} />
        <Route element={<PrivateRoute allowedRole={[Role.admin, Role.user]} />} >
          <Route path=":id/edit" element={<EditUser />} />
        </Route>
      </Route>
      <Route path="/card" element={<ListCard />} />

      <Route path="/auth" element={<Signup />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)