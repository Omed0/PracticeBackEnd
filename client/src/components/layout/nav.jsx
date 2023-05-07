import { Link } from 'react-router-dom'


export default function nav() {
    return (
        <nav>
            <div className="site-title">
                <Link to="/"><h1>Blog Omed</h1></Link>
                <p>Omed Site</p>
            </div>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/blogs/create">New Blog</Link></li>
                <li><Link to="/users">users</Link></li>
                <li><Link style={{ color: 'crimson' }} to="/auth">SignUP</Link></li>
            </ul>
        </nav>
    )
}
