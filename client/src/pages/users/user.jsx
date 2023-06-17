import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUserById } from '../../features/user/userService';
import { motion } from 'framer-motion';
import { FaHandPointRight } from 'react-icons/fa';



export default function User() {
    const { users, lastUpdated, isError } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const { _id } = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    useEffect(() => {
        console.log("lastUpdated : " + lastUpdated);
        if (!lastUpdated) {
            dispatch(fetchAllUsers())
        }
        return () => {
            console.log("cleanUp : " + lastUpdated);
        }
    }, [dispatch])


    const trash = (id) => {
        console.log("user id : " + id + "deleted")

        dispatch(deleteUserById(id))
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                isError ? <div>Something went wrong ...</div>

                    : users.map((user, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            key={index}
                            className={`relative rounded p-6 mb-4 flex flex-col my-2 ${_id === user._id ? "bg-zinc-600 shadow-md shadow-slate-100" : "bg-white shadow-lg shadow-zinc-400"}`}>
                            <div className="mb-4 relative">
                                <div className="flex mb-3">
                                    {
                                        _id === user._id ? <FaHandPointRight className="text-zinc-300 mr-3" size={23} /> : null
                                    }
                                    <p className={`${_id === user._id ? "text-white" : "text-black"} text-gray-900 text-xl font-bold`}>{user.username}</p>
                                </div>
                                <p className={`text-gray-700 text-base ${_id === user._id ? "text-white" : "text-black"}`}>{user.email}</p>
                                <small className="text-white p-2 px-4 bg-zinc-500 rounded-md text-lg absolute top-0 right-0">{user.isAdmin}</small>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link to={`/users/${user._id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit Profile
                                </Link>
                                <button onClick={() => trash(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete Profile
                                </button>
                            </div>
                        </motion.div>
                    ))
            }
        </div>
    )
}
