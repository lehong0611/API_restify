const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Get user by email
            const user = await User.findOne({email});

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user)
                } else {
                    //Pass din't match
                    reject('Authentication failed');
                }
            });
        } catch (err) {
            //Email not found
            reject('Authentication failed');
        }
    }); 
};