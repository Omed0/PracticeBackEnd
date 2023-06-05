import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import trashcan from '../../../assets/trashcan.svg'

export default function blog() {
  const dispatch = useDispatch();

  const trash = async () => {
    console.log("blog id : " + blogs._id)
    deletePost(blogs._id);
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch(specificPost(data._id));
      setBlogs(data);
    };

    fetchBlogs();
    trash();
  }, [dispatch, trash]);

  return (
    <div>
      <section className="details content">
        {/* <h2>{blog.title}</h2> */}
        {/* <small>{blog.author}</small> */}
        <div className="content">
          {/* <p>{blog.body}</p> */}
        </div>
        <Link className="delete" onClick={trash}>
          <img src={trashcan} alt='delete blog' />
        </Link>
      </section>

    </div>
  )
}