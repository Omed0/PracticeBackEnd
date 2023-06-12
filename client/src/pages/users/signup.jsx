import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { LoginUser, RegisterUser } from "../../features/auth/authService";


const initialState = { username: '', email: '', password: '', isAdmin: 'admin' }

export default function signup() {
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [invalidData, setInvalidData] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (isSignup && formData.password !== formData.confirmPassword) {
        //     setInvalidData('Passwords do not match*');
        //     return;
        // }
        // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/;
        // if (!passwordRegex.test(formData.password)) {
        //     setInvalidData('Invalid password format*');
        //     return;
        // }

        // const emailRegex = /\S+@\S+\.\S+/;
        // if (!emailRegex.test(formData.email)) {
        //     setInvalidData('Invalid email format*');
        //     return;
        // }

        try {
            if (isSignup) {
                dispatch(RegisterUser(formData))
            } else {
                dispatch(LoginUser(formData))
            }
            navigate(from, { replace: true })
            setFormData(initialState)
            setInvalidData('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register">
            <div>
                <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            </div>
            <p style={{ color: "red" }} > {invalidData}</p>
            <form onSubmit={handleSubmit} className="form_create_user" method="POST">
                {
                    isSignup && (
                        <>
                            <label htmlFor="username">name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username*"
                            />
                        </>
                    )
                }
                <label htmlFor="email">email</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email*" />

                <label htmlFor="password">Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password*"
                />
                {
                    isSignup && (
                        <select value={formData.isAdmin} onChange={handleChange} name="isAdmin" id="isAdmin">
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    )
                }
                <Link to='#' style={{ padding: '6px 0', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={switchMode}>
                    {isSignup ? 'you have an account' : 'you don\'t have an account'}
                </Link>
                <button type="submit" className="btn_create_user">{isSignup ? 'Submit' : 'Login'}</button>
            </form>
        </div >
    )
}
