import { createNewPost } from "../../features/post/postService"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const initialState = { title: '', snippet: '', body: '' }

export default function Create() {

  const [fromData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...fromData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNewPost(fromData))
    setFormData(initialState)
    navigate('/blogs')
  }

  return (
    <div className="create-blog content">
      <h2 className="text-2xl font-bold">Add a new blog</h2>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="title">Blog title:</label>
        <input type="text" id="title" value={fromData.title} name="title" onChange={handleChange} required />
        <label htmlFor="snippet">Blog snippet:</label>
        <input type="text" id="snippet" value={fromData.snippet} name="snippet" onChange={handleChange} required />
        <label htmlFor="body">Blog body:</label>
        <textarea id="body" name="body" value={fromData.body} onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
