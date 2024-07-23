const express = require('express');
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const auth = require('../middlewares/auth')
const router = new express.Router();


//this will create chat if not present otherwise it will give the exsisting chat
router.post('/accessChat', auth, async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send({ "error": "userId not sent" });
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            )
            res.status(200).send(FullChat)
        } catch (error) {
            throw new Error(error.message);
        }
    }
})


router.get('/fetchChats', auth, async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate('users', "-password").populate('groupAdmin', "-password").populate('latestMessage').sort({ updatedAt: -1 }).then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            })
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400).send(error.message);

    }
})

router.post('/createGroupChat', auth, async (req, res) => {
    if (!req.body.users || !res.body.name) {
        return res.status(400).send({ message: "no user or name found" });
    }

    let users = JSON.parse(req.body.users);
    if (users.length < 2) {
        res.status(400).send("More than two users are needed to form a group")
    }

    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
            "users",
            "-password"
        ).populate("groupAdmin", "-password")

        res.status(200).send(fullGroupChat);

    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.put('/renameGroup', auth, async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName
        },
        {
            new: true
        }).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404).send({ "error": "chat not found" });
    } else {
        res.send(updatedChat);
    }
})


router.put('/addToGroup', auth, async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(chatId,
        { $push: { users: userId } },
        { new: true }

    ).populate("users", "-password").populate("groupAdmin", "-password");
    if (!added) {
        res.status(404).send({ "error": "chat not found" });
    } else {
        res.send(added);
    }
})

router.put('/removeFromGroup', auth, async (req, res) => {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(chatId,
        { $pull: { users: userId } },
        { new: true }

    ).populate("users", "-password").populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404).send({ "error": "chat not found" });
    } else {
        res.status(200).send(removed);
    }
})

module.exports = router;