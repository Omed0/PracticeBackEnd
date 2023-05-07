import { Link } from 'react-router-dom';
import trashcan from '../../../assets/trashcan.svg'

export default function blog(blog) {

  const trash = () => {
    const endpoint = `/blog/${blog._id}`;
    fetch(endpoint, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err));
  }


  return (
    <div>
      <div className="details content">
        <h2>{blog.title}</h2>
        <div className="content">
          <p>{blog.body}</p>
        </div>
        <Link className="delete" onClick={trash}>
          <img src={trashcan} alt="" />
        </Link>
      </div>

    </div>
  )
}