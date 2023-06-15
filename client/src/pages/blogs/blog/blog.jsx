import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { specificPost } from "../../../features/post/postService";
import { getPostReset, deletePost } from "../../../features/post/postsSlice";
import { motion } from 'framer-motion'


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

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: '-100px' },
  }

  return (
    <div>
      {
        error ? <div>Error: {error.message}</div>
          :
          (
            selectedPost ?
              <motion.section
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, type: "tween", delay: .1 }}
                variants={list}
                key={selectedPost._id}
                className={`details p-6 bg-zinc-700 text-white`}
              >
                <motion.h2
                  transition={{ duration: .6, type: "tween", delay: .2 }}
                  variants={item}
                  className="title"
                >
                  {selectedPost.title}
                </motion.h2>
                <small className="font-mono text-base text-zinc-400">{selectedPost.author}</small>
                <motion.div
                  initial={{ opacity: 0, y: '-40px' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .6, delay: .6 }}
                  className="mt-4 mb-8"
                >
                  <p className="mb-6 text-white">{selectedPost.body}</p>
                  <small className="border-2 p-2 border-red-500 shadow-md">{selectedPost.snippet}</small>
                  <Link className="delete" onClick={trash}>
                    <img src={'/trashcan.svg'} alt='delete blog' />
                  </Link>
                </motion.div>


              </motion.section>
              :
              <div>no post by this id</div>
          )
      }
    </div >
  )
}