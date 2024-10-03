const jwt = require('jsonwebtoken');
const secretKey = 'test123'; // for testing purposes //

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // remove Bearer to extract the token only //
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.sendStatus(401); // No token return 401 //
        }
    
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403); // Invalid token return 403 //
            }
            req.user = user; // Valid token attach user to request //
            return next(); // Proceed to the next middleware or route handler //
        });
    } else {
        return res.sendStatus(404); // No Bearer token return 404 //
    }
};

module.exports = authenticateToken;
