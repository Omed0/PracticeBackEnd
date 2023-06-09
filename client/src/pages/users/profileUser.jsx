import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function profileUser() {
    const [user, setUser] = useState([{
        _id: 1,
        username: 'omed',
        isAdmin: true,
        password: 'iboy'
    }]);

    const trash = () => {
        console.log("user id : " + user._id + "deleted")
        setUser([])
    }

    return (
        <div>
            {
                user && user.length > 0 ?
                    user.map((user) => {
                        return (
                            <div key={user._id} className="details content" >
                                <h2 className="user_name">{user.username}</h2>
                                <h3 className="user_name">{user.isAdmin}</h3>
                                <div className="content">
                                    <p><b>password : </b>{user.password}</p>
                                </div>
                                <Link className="delete" onClick={trash}>
                                    <img src={'/trashcan.svg'} alt="delete user" />
                                </Link>
                            </div>
                        )
                    })
                    :
                    <>
                        <p className='details'>Opps, create user</p>
                        <h2 className='content details'>there is no users</h2>
                    </>
            }
        </div >
    )
}
