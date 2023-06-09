import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, specificPost } from "../../../features/post/postService";
import { getPostReset } from "../../../features/post/postsSlice";



export default function blog() {
  const { id } = useParams();
  const { selectedPost, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const trash = () => {
    console.log("blog id : " + selectedPost._id + "deleted")
    deletePost(id) // you can delete post when you have credintials
    Navigate("/blogs");
  }

  useEffect(() => {
    dispatch(specificPost(id));

    return () => {
      if (id) {
        dispatch(getPostReset({ id }));
      }
    }

  }, [dispatch, id]);

  return (
    <div>
      {
        error ? <div>Error: {error.message}</div>
          :
          (
            selectedPost ?
              <section key={selectedPost._id} className="p-4 bg-slate-500">
                <h2>{selectedPost.title}</h2>
                <small>{selectedPost.author}</small>
                <div className="">
                  <p>{selectedPost.body}</p>
                  <small>{selectedPost.snippet}</small>
                </div>
                <Link className="delete" onClick={trash}>
                  <img src={'/trashcan.svg'} alt='delete blog' />
                </Link>
              </section>
              :
              <div>no post by this id</div>

          )
      }
    </div >
  )
}