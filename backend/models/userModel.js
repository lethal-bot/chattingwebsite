require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: undefined
    },
    pic: {
        type: String,
        required: true,
        default: "https://i.sstatic.net/l60Hf.png"
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamp: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_ENSCRYPTION);
    user.tokens = user.tokens.concat({ token })

    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('unable to Login');
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User