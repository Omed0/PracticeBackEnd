import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { specificPost, deletePost } from "../../../features/post/postService";
import { currentPostRest } from "../../../features/post/postsSlice";
import { motion } from 'framer-motion'
import CustomToast from "../../../hooks/customToast";


export default function blog() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { currentPost, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const trash = () => {
    console.log("blog id : " + currentPost._id + "deleted")
    dispatch(deletePost(id));
    Navigate("/blogs");

  }

  useEffect(() => {
    dispatch(specificPost(id));

    return () => {
      dispatch(currentPostRest());
    }

  }, [dispatch]);

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
        error ? <>
          <h2 className="text-xl">Error: {error}</h2>
          <CustomToast message={error} />
        </>
          :
          (
            !currentPost ?
              <div>Loading...</div>
              :
              <motion.section
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, type: "tween", delay: .1 }}
                variants={list}
                key={currentPost._id}
                className={`details p-6 bg-zinc-700 text-white`}
              >
                <motion.h2
                  transition={{ duration: .6, type: "tween", delay: .2 }}
                  variants={item}
                  className="title"
                >
                  {currentPost.title}
                </motion.h2>
                <small className="font-mono text-base text-zinc-400">{currentPost.author}</small>
                <motion.div
                  initial={{ opacity: 0, y: '-40px' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .6, delay: .6 }}
                  className="mt-4 mb-8"
                >
                  <p className="mb-6 text-white">{currentPost.body}</p>
                  <small className="border-2 p-2 border-red-500 shadow-md">{currentPost.snippet}</small>
                  <div className="absolute top-14 right-10 bg-red-500 hover:opacity-80 duration-150" onClick={() => setIsOpen(prev => !prev)}>
                    <HiOutlineDotsVertical size={26} color="white" />
                    <section className={`${isOpen ? 'visible flex flex-col gap-2' : 'hidden'} absolute top-8 -left-8 px-2 py-3 bg-zinc-500`}>
                      <button className="text-white hover:scale-110 duration-300 " onClick={trash}>Delete</button>
                      <Link className="text-white hover:scale-110 duration-300 " to={`/blogs/${currentPost._id}/edit`}>Edit</Link>
                    </section>
                  </div>

                </motion.div>

              </motion.section>

          )
      }
    </div >
  )
}