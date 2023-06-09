import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, specificPost } from "../../../features/post/postService";

import trashcan from '../../../assets/trashcan.svg'

export default function blog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPost, loading, error, success } = useSelector(state => state.posts);

  const trash = () => {
    console.log("blog id : " + selectedPost._id + "deleted")
    deletePost(id)
    Navigate("/blogs");
  }


  useEffect(() => {
    dispatch(specificPost(id));

  }, [dispatch, trash]);

  return (
    <div>
      {
        loading ? <div>Loading...</div>
          :
          error ? <div>Error: {error.message}</div>
            :
            (
              success && selectedPost && selectedPost.length > 0 && selectedPost.map((post, index) => {
                <section key={index} className="details content">
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