const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (decoded.username) {
        req.username = decoded.username;
        next();
    } else {
        res.json({
            msg: "You are not authenticated"
        });
    }
}

module.exports = authenticateUser;