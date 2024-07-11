require('dotenv').config();
const express = require('express');
require('./database/db');
const app = express();
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");

app.use(express.json())
app.use(userRouter);
app.use(chatRouter);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`server started ${PORT}`) });