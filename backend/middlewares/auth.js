const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_ENSCRYPTION);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error();
        }
        // console.log(req);
        if (!user.isVerified) return req.status(401).send({ "message": "not validated" })
        req.token = token
        req.user = user
        next();
    } catch (e) {
        res.status(404).send({ error: 'Please authenticate' })
    }
}



module.exports = auth;