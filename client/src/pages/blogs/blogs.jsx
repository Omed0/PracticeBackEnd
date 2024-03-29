import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/post/postService";
import { motion } from "framer-motion"
import CustomToast from "../../hooks/customToast";

export default function blogs() {

  const dispatch = useDispatch();
  const { posts, lastUpdated, error } = useSelector(state => state.posts);

  useEffect(() => {

    console.log("lastUpdated : " + lastUpdated);
    if (!lastUpdated) {
      dispatch(fetchPosts());
    }
    return () => {
      console.log("cleanUp : " + lastUpdated);
    }

  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-60px" }}
      whileInView={{ opacity: 1 }}
      animate={{ opacity: 1, y: "0" }}
      transition={{ duration: .9, type: "tween", ease: "easeInOut", delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold">All Blogs</h2>
      <section className="flex flex-wrap gap-5">
        {
          error ? <>
            <CustomToast message={error} />
          </>
            :

            (!posts && posts.length < 1) ? <div>Loading...</div>

              :
              (posts && posts.length > 0 && posts.map((post, index) => (
                <Link to={`/blogs/${post._id}`} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    className="min-w-[20rem] p-4 bg-zinc-700 shadow-lg"
                  >
                    <div className="mb-2">
                      <h2 className="text-xl title text-white">{post.title}</h2>
                      <p className="text-sm text-white">Written by {post.author}</p>
                    </div>
                    <small className="p-1 bg-red-400 text-white">{post.snippet}</small>
                  </motion.div>
                </Link>
              )))
        }
      </section>
    </motion.div>
  )
}
