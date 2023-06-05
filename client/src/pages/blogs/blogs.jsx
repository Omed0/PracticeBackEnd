import { useEffect } from "react";

import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../features/post/postService";
import { posts, loading, error, success } from "../../features/post/postsSlice";


export default function blogs() {

  const dispatch = useDispatch();
  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="blogs content">
      <h2>All Blogs</h2>
      {
        loading ? (<div>Loading...</div>)
          :
          error ? (<div>Error: {error.message}</div>)
            :
            (success && posts && posts.length > 0 && posts.map((post, index) => (
              <Link to={`/blogs/${post._id}`} key={index}>
                <div className="blog-preview">
                  <h2>{post.title}</h2>
                  <p>Written by {post.author}</p>
                </div>
                <small>{post.snippet}</small>
              </Link>
            )))
      }
      <Outlet />
    </div >
  )
}
