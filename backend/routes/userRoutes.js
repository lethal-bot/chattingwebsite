const express = require('express');
const User = require('../models/userModel')
const router = new express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await new User(req.body);
        await user.save();
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/otp', async (req, res) => {
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(404).send(e);
        const otp = generateOtp();
        user.otp = otp.toString()
        await user.save();
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/verify', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) res.status(404).send(e);
        if (user.otp === req.body.otp) {
            user.isVerified = true;
            user.otp = undefined;
            const token = await user.generateAuthToken()
            await user.save();
            res.status(200).send({ token });
        } else res.status(500).send({ "message": "invalid otp" })
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (!user.isVerified) return res.status(401).send({ message: "not verified" });
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;