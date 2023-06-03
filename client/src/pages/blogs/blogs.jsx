import { useState, useEffect } from "react";

import { Link, Outlet } from "react-router-dom";
import { fetchPostsAction, getAllBlogs } from "../../features/post/postSlice";
import { useDispatch } from "react-redux";


export default function blogs() {

  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  const fetchBlogs = async () => {
    const { data } = await dispatch(fetchPostsAction());
    setBlogs(data);
  };

  useEffect(() => {

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="blogs content">
      <h2>All Blogs</h2>

      {getAllBlogs && getAllBlogs.length > 0 ?
        getAllBlogs.map((blog) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id}>
            <div className="blog-preview">
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </div>
            <small>{blog.snippet}</small>
          </Link>
        ))
        : <h2>No Blogs Posted</h2>
      }
      <Outlet />
    </div>
  )
}
