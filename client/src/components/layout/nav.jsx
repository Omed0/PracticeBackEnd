import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";


export default function nav() {

    const { selectedPost } = useSelector(state => state.posts);

    return (
        <nav>
            <div className="site-title">
                <NavLink to="/"><h1>{selectedPost.author ? `Blog ${selectedPost.author}` : 'Blog Posting'}</h1></NavLink>
                <p>Omed Site</p>
            </div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/blogs">Blogs</NavLink></li>
                <li><NavLink to="/blogs/create">New Blog</NavLink></li>
                <li><NavLink to="/users">users</NavLink></li>
                <li><NavLink style={{ background: 'crimson', padding: 8, color: 'white', borderRadius: 3 }} to="/auth">SignUP</NavLink></li>
            </ul>
        </nav>
    )
}
