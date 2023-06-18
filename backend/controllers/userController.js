const User = require('../models/user')
// const bcrypt = require('bcrypt')


const get_all_users = async (req, res) => {
    try {
        const allUser = await User.find({ _id: { $ne: "648e34711378b21ae02695e6" } }).select('-password').sort({ createdAt: -1 })

        res.status(200).json({ message: 'all users returned', allUser })

    } catch (error) {
        console.log(error)
    }
}


const user_get_id = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User Details', userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const user_update_id = async (req, res) => {
    const id = req.params.id

    const { username, email, password, isAdmin } = req.body

    const existUser = await User.findById(id).select('-_id').where('_id').ne("648e34711378b21ae02695e6")
    if (!existUser) return res.status(400).json({ message: 'User not found' });

    const hashedPassword = await User.updatePassword(existUser.email, password)

    const updateUser = {
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin
    }

    // const comparePass = await bcrypt.compare(password, existUser.password)
    // if (!password || !comparePass) return res.status(400).json({ message: 'please for update user need your password' })

    try {
        const user = await User.findByIdAndUpdate(id, updateUser, { new: true })
        if (!user) return res.status(400).json({ message: 'User not updated, broken' });
        res.status(200).json({ code: 200, message: 'User update successfully', user });

    } catch (err) { console.log(err); }
}


const user_delete_id = async (req, res) => {
    const deleteId = req.params.id
    const { isAdmin } = req.user
    const deleteUser = await User.findByIdAndDelete(deleteId).select('-_id').where('_id').ne("648e34711378b21ae02695e6")

    if (!deleteUser) return res.status(400).json({ message: 'User not found' });

    const admin = isAdmin === 'admin' ? true : false
    if (!admin) return res.status(400).json({ message: 'You need Permission Admin for delete user' })

    try {
        if (admin) {
            deleteUser.remove()
            res.status(200).json({ message: 'User deleted successfully', deleteUserId: deleteUser._id })
        }
    } catch (error) {
        return res.status(400).json({ message: 'User not deleted, broken' })
    }
}



module.exports = {
    get_all_users,
    user_get_id,
    user_update_id,
    user_delete_id,
}