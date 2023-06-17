import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../features/user/userService';


export default function User() {
    const { users, isError } = useSelector((state) => state.user)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

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
                            className="bg-white shadow-lg shadow-zinc-400 rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="mb-4 relative">
                                <div className="text-gray-900 font-bold text-xl mb-2">{user.username}</div>
                                <p className="text-gray-700 text-base">{user.email}</p>
                                <small className="text-white p-2 bg-red-500 rounded-md text-base absolute top-4 right-8">{user.isAdmin}</small>
                            </div>
                            <div className="flex items-center justify-between">
                                <Link to={`/users/${user._id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit Profile
                                </Link>
                                <button onClick={trash} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete Profile
                                </button>
                            </div>
                        </motion.div>
                    ))
            }
        </div>
    )
}
