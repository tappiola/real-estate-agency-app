const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

module.exports = function parseAuthorization(req, res, next){
    const authHeader = req.headers.authorization;

    if(typeof authHeader === 'undefined'){
        req.isAuthenticated = false;
        return next();
    }

    try {
        const authToken = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(authToken, SECRET);

        req.isAuthenticated = true;
        req.userId = decodedToken.userId;
    }
    catch(e){
        req.isAuthenticated = false;
        console.log({e});
    }

    next();
};