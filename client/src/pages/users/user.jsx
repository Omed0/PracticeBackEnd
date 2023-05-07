// import { Link } from 'react-router-dom'

import { Link, Outlet } from "react-router-dom";


export default function user(user) {
    return (
        <div className="blogs content">
            <h2>All Users</h2>
            {
                user ?
                    <>
                        <Link className="single" to={`/auth/${user._id}`}>
                            <h3 className="title">{user.email}</h3>
                        </Link>
                        <p className="snippet">{user.username}</p>
                    </>
                    :
                    <>
                        <p>There are no User to display...</p>
                    </>
            }

            <Outlet />
        </div >
    )
}
