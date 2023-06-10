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
              <section key={selectedPost._id} className="details p-6 bg-zinc-700 text-white">
                <h2 className="title">{selectedPost.title}</h2>
                <small className="font-mono text-base text-zinc-400">{selectedPost.author}</small>
                <div className="mt-4 mb-8">
                  <p className="mb-6 text-white">{selectedPost.body}</p>
                  <small className="border-2 p-2 border-red-500 shadow-md">{selectedPost.snippet}</small>
                  <Link className="delete" onClick={trash}>
                    <img src={'/trashcan.svg'} alt='delete blog' />
                  </Link>
                </div>
              </section>
              :
              <div>no post by this id</div>

          )
      }
    </div >
  )
}