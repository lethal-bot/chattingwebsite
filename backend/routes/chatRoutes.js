const express = require('express');
const Chat = require('../models/chatModel')
const auth = require('../middlewares/auth')
const router = new express.Router();

router.post('/', auth, async (req, res) => {

})

module.exports = router;