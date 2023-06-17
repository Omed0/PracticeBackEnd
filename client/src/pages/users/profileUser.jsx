import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../features/user/userService';
import { deleteUserById } from '../../features/user/userService';
import { motion } from 'framer-motion'


export default function profileUser() {
    const { currentUser, isError } = useSelector((state) => state.user)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
        }
    }, [dispatch, id])

    const trash = () => {
        console.log("user id : " + currentUser._id + "deleted")
        dispatch(deleteUserById(currentUser._id))
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                isError ? <div>Something went wrong ...</div>
                    :
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white shadow-lg shadow-zinc-400 rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                        <div className="mb-4 relative">
                            <div className="text-gray-900 font-bold text-xl mb-2">{currentUser.username}</div>
                            <p className="text-gray-700 text-base">{currentUser.email}</p>
                            <small className="text-white p-2 bg-red-500 rounded-md text-base absolute top-4 right-8">{currentUser.isAdmin}</small>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link to={`/users/${currentUser._id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit Profile
                            </Link>
                            <button onClick={trash} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete Profile
                            </button>
                        </div>
                    </motion.div>
            }
        </div>
    )
}
