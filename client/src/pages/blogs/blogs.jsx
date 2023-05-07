import { Link, Outlet } from "react-router-dom";


export default function blogs(blog) {
  return (
    <div className="blogs content">
      <h2>All Blogs</h2>

      {blog ?
        <>
          <Link className="single" to={`/blog/${blog._id}`}>
            <h3 className="title">{blog.title}</h3>
          </Link>
          <p className="snippet">{blog.snippet}</p>
        </>
        :
        <>
          <p>There are no blogs to display...</p>
        </>
      }
      <Outlet />
    </div>
  )
}
