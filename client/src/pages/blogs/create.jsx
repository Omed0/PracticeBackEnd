import { useDispatch } from "react-redux"
import { createPost } from "../../features/post/postService"
import { redirect } from "react-router-dom"
import { useState } from "react"


const initialState = { title: '', snippet: '', body: '' }

export default function Create() {

  const [fromData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...fromData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(fromData))
    setFormData(initialState)
    redirect('/blogs')
  }

  return (
    <div className="create-blog content">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit} action="/blogs" method="POST">
        <label htmlFor="title">Blog title:</label>
        <input type="text" id="title" name="title" onChange={handleChange} required />
        <label htmlFor="snippet">Blog snippet:</label>
        <input type="text" id="snippet" name="snippet" onChange={handleChange} required />
        <label htmlFor="body">Blog body:</label>
        <textarea id="body" name="body" onChange={handleChange} required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
