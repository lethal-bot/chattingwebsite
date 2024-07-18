const express = require('express');
const User = require('../models/userModel')
const auth = require('../middlewares/auth')
const mailer = require('../sendmail');
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

router.get('/otp/:email', async (req, res) => {
    const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (!user) res.status(404).send("enter a registered email");
        const otp = generateOtp();
        user.otp = otp.toString()
        await user.save();
        const msg = `<h3>${otp}</h3>`
        await mailer.sendMail(email, 'Mail Verification', msg)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/verify', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) res.status(404).send("user not found");
        if (user.otp === req.body.otp) {
            user.isVerified = true;
            user.otp = undefined;
            const token = await user.generateAuthToken()
            await user.save();
            res.status(200).send({ token });
        } else res.status(401).send({ error: "invalid otp" })
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


//not checked via postman

// router.get('/validUsername/:username', async (req, res) => {
//     try {
//         const username = req.params.username;
//         console.log(username);
//         const user = await User.findOne({ username: username })
//         console.log(user);
//         if (user) res.status(409).send({ "message": "already exists" });
//         else res.status(200).send();
//     } catch (error) {
//         res.status(500).send();
//     }
// })

router.patch('/user/update', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const availableupdates = ["name", "password"];
    const canUpdate = updates.every((update) => availableupdates.includes(update));
    if (!canUpdate) {
        res.status(501).send("property not availble for update");
    } else {
        try {
            updates.forEach((key) => {
                req.user[key] = req.body[key];
            })
            await req.user.save();
            res.send(req.user).status(201);
        } catch (e) {
            res.status(501).send(e);
        }
    }

})

router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user)
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;