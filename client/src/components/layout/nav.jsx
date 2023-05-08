import { NavLink } from 'react-router-dom'


export default function nav() {
    return (
        <nav>
            <div className="site-title">
                <NavLink to="/"><h1>Blog Omed</h1></NavLink>
                <p>Omed Site</p>
            </div>
            <ul>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/blogs">Blogs</NavLink></li>
                <li><NavLink to="/blogs/create">New Blog</NavLink></li>
                <li><NavLink to="/users">users</NavLink></li>
                <li><NavLink style={{ color: 'crimson' }} to="/auth">SignUP</NavLink></li>
            </ul>
        </nav>
    )
}
