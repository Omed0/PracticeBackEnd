const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;


// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback);
// }

// module.exports.getUserByUsername = function (username, callback) {
//     const query = { username: username }
//     User.findOne(query, callback);
// }

// module.exports.addUser = function (newUser, callback) {
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) throw (err);
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// }
