import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { specificPostAction, deletePostAction } from "../../../features/post/postSlice";
import trashcan from '../../../assets/trashcan.svg'

export default function blog() {
  const [blogs, setBlogs] = useState([]);

  const trash = async () => {
    console.log("blog id : " + blog._id)
    await deletePostAction(blog._id);
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await specificPostAction();
      setBlogs(data);
    };

    fetchBlogs();
    trash();
  }, [blogs, setBlogs]);

  return (
    <div>
      <section className="details content">
        <h2>{blog.title}</h2>
        <small>{blog.author}</small>
        <div className="content">
          <p>{blog.body}</p>
        </div>
        <Link className="delete" onClick={trash}>
          <img src={trashcan} alt='delete blog' />
        </Link>
      </section>

    </div>
  )
}