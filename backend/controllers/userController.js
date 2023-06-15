const User = require('../models/user')
const bcrypt = require('bcrypt')


const get_all_users = async (req, res) => {
    try {
        const allUser = await User.find().sort({ createdAt: -1 }) // find all blogs and sort by created date reverse order
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

        res.status(200).json({ message: 'User Details', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const user_update_id = async (req, res) => {
    const id = req.params.id

    const { username, email, password, isAdmin } = req.body

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    const existUser = await User.findById(id)

    const updateUser = {
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin
    }

    const comparePass = await bcrypt.compare(password, existUser.password)

    if (!existUser) return res.status(400).json({ message: 'User not found' });
    if (!password || !comparePass) return res.status(400).json({ message: 'please for update user need your password' })

    try {
        const user = await User.findByIdAndUpdate(id, updateUser, { new: true })
        if (!user) return res.status(400).json({ message: 'User not updated, broken' });
        res.status(200).json({ code: 200, message: 'User update successfully', user });

    } catch (err) { console.log(err); }
}


const user_delete_id = async (req, res) => {
    const deleteId = req.params.id
    const { isAdmin } = req.user
    const deleteUser = await User.findByIdAndDelete(deleteId)

    if (!deleteUser) return res.status(400).json({ message: 'User not found' });

    const admin = isAdmin === 'admin' ? true : false
    if (!admin) return res.status(400).json({ message: 'You need Permission Admin for delete user' })

    try {
        if (admin) res.status(200).json({ message: 'User deleted successfully', deleteUser })
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