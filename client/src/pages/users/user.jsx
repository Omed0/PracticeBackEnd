import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';


export default function User() {
    const [users, setUsers] = useState([{
        _id: 1,
        email: 'omed@gmail.com',
        username: 'omed',
        isAdmin: true,
        password: 'iboy'
    },]);

    return (
        <div className="blogs content">
            <h2>All Users</h2>
            {
                users.lenght ?

                    users.map((user) => {
                        return (
                            <div key={user._id}>
                                <Link className="single" to={`/auth/${user._id}`}>
                                    <h3 className="title">{user.email}</h3>
                                </Link>
                                <p className="snippet">{user.username}</p>
                            </div>
                        )
                    })

                    :
                    <>
                        <p>There are no User to display...</p>
                    </>
            }

            <Outlet />
        </div >
    )
}
