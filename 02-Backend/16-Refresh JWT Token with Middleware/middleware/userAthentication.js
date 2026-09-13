const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const userAuth = async (req,res, next) => {
    try {
        const {token} = req.cookies
                if (!token) {
                    throw new Error('Invalid Token');
                }
                const payload = jwt.verify(token, 'Hello');
                const {_id} = payload;
                if (!_id) {
                    throw new Error('Invalid ID: ')
                }
                const targetUser = await User.findById(_id);
                if(!targetUser){
                    throw new Error('User does not Exist')
                }
                req.targetUser = targetUser;
                next();
    } catch (error) {
        res.se('Error' + error.message)
    }
}

module.exports = userAuth;

