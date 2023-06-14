import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../features/auth/authSlice";


export default function nav() {

    const { userCredintial } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(Logout())
    }

    return (
        <nav>
            <div className="site-title">
                <NavLink to="/"><h1>{userCredintial.username ? `Blog ${userCredintial.username}` : 'Blog Posting'}</h1></NavLink>
                <p>{userCredintial.username ? `${userCredintial.username} Site` : 'Guest'}</p>
            </div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/blogs">Blogs</NavLink></li>
                {
                    userCredintial.token &&
                    <>
                        <li><NavLink to="/blogs/create">New Blog</NavLink></li>
                        <li><NavLink to="/users">users</NavLink></li>
                    </>
                }
                <li onClick={handleLogout}>
                    <NavLink
                        to={userCredintial.token ? "/" : "/auth"}
                        style={{ background: userCredintial.token ? 'crimson' : 'blue', padding: 8, color: 'white', borderRadius: 3 }}
                    >
                        {userCredintial.token ? 'Logout' : 'Login'}
                    </NavLink>
                </li>
            </ul>
        </nav >
    )
}
