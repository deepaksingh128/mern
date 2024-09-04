const express = require('express');
require('dotenv').config();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

app.use (express.json());
app.use ('/admin', adminRoutes);
app.use ('/user', userRoutes);

app.listen (PORT, () => {
    console.log (`Server is running on port ${PORT}`);
})
