import { useState } from "react";
import { Link } from "react-router-dom";


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function signup() {
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);

    //     if (isSignup) {
    //       dispatch(signup(formData))
    //     } else {
    //       dispatch(signin(formData))
    //     }
    //   };

    return (
        <div className="register">
            <div>
                <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            </div>
            <form className="form_create_user" action="/auth" method="POST">
                {
                    isSignup && (
                        <>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username*"
                            />
                        </>
                    )
                }
                <label htmlFor="email">email</label>
                <input type="text" name="email" id="email" placeholder="email*" />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password*"
                />
                {
                    isSignup && (
                        <select name="isAdmin" id="isAdmin">
                            <option name="admin" id="admin" value="admin">admin</option>
                            <option name="user" id="user" value="user">user</option>
                        </select>
                    )
                }
                <a style={{ padding: '6px 0', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} clas onClick={switchMode}>
                    {isSignup ? 'you have an account' : 'you dont have an account'}
                </a>
                <button type="submit" className="btn_create_user">{isSignup ? 'Submit' : 'Login'}</button>
            </form>
        </div>
    )
}
