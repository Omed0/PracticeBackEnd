import { useState } from "react";


const initialState = { name: '', email: '', password: '', isAdmin: 'admin' }

export default function signup() {
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        // setShowPassword(false)
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // if (isSignup) {
        //   dispatch(signup(formData))
        // } else {
        //   dispatch(signin(formData))
        // }
    };

    return (
        <div className="register">
            <div>
                <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="form_create_user" method="POST">
                {
                    isSignup && (
                        <>
                            <label htmlFor="name">name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="name*"
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
                            <option name="admin" value="admin">admin</option>
                            <option name="user" value="user">user</option>
                        </select>
                    )
                }
                <a style={{ padding: '6px 0', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={switchMode}>
                    {isSignup ? 'you have an account' : 'you dont have an account'}
                </a>
                <button type="submit" className="btn_create_user">{isSignup ? 'Submit' : 'Login'}</button>
            </form>
        </div>
    )
}
