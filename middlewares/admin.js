const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (decoded.username) {
        next();
    } else {
        res.status(403).json({
            msg: "You are not Authenticated"
        });
    }
}

module.exports = authenticateAdmin;