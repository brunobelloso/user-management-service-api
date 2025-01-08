const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach the user payload to the request
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticateJWT;
