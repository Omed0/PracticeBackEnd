import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUserById } from '../../features/user/userService';
import { getCurrentUser, getUserFail } from '../../features/user/userSlice';


export default function profileUser() {
    const { currentUser, isError } = useSelector((state) => state.user)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
        } if (!id) {
            dispatch(getUserFail('User not found'))
        }

        return () => {
            dispatch(getCurrentUser())
        }
    }, [dispatch, id])

    const handleChange = (event) => {
        let { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUserById(id, user))
        navigate('/users', { replace: true })
    }

    return (
        <div className="register">
            <div>
                <h2>UPDATE USER</h2>
            </div>
            <p style={{ color: "red" }} > {isError}</p>
            <form onSubmit={handleSubmit} className="form_create_user" method="POST">

                <label htmlFor="username">username</label>
                <input
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username*"
                />

                <label htmlFor="email">email</label>
                <input
                    value={user.email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email*"
                />

                <label htmlFor="password">Password</label>
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password*"
                />
                <button type="submit" className="btn_create_user">Update</button>
            </form>
        </div >
    )
}
