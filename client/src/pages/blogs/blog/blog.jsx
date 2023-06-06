import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { specificPost } from "../../../features/post/postService";
import { loading, error, success, selectedPost } from "../../../features/post/postsSlice";

import trashcan from '../../../assets/trashcan.svg'

export default function blog() {
  const dispatch = useDispatch();

  const trash = () => {
    // console.log("blog id : " + blogs._id)
    // deletePost(blogs._id);
  }


  useEffect(() => {
    dispatch(specificPost);

    trash();
  }, [dispatch, trash]);

  return (
    <div>
      {
        loading ? <div>Loading...</div>
          :
          error ? <div>Error: {error.message}</div>
            :
            (
              success && selectedPost && selectedPost.length > 0 && selectedPost.map((post) => {
                <section className="details content">
                  <h2>{post.title}</h2>
                  <small>{post.author}</small>
                  <div className="content">
                    <p>{post.body}</p>
                  </div>
                  <Link className="delete" onClick={trash}>
                    <img src={trashcan} alt='delete blog' />
                  </Link>
                </section>
              })
            )
      }
    </div>
  )
}