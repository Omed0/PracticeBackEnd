import { useState, useEffect } from "react";

import { Link, Outlet } from "react-router-dom";
import { fetchPostsAction } from "../../features/post/postSlice";

export default function blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await fetchPostsAction();
      setBlogs(data);
    };

    fetchBlogs();
  }, [blogs, setBlogs]);

  return (
    <div className="blogs content">
      <h2>All Blogs</h2>

      {blogs && blogs.length > 0 ?
        blogs.map((blog) => (
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
