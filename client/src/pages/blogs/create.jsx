

export default function Create() {
  return (
    <div className="create-blog content">
      <form action="/blogs" method="POST">
        <label for="title">Blog title:</label>
        <input type="text" id="title" name="title" required />
        <label for="snippet">Blog snippet:</label>
        <input type="text" id="snippet" name="snippet" required />
        <label for="body">Blog body:</label>
        <textarea id="body" name="body" required></textarea>
        <button>Submit</button>
      </form>
    </div>
  )
}
