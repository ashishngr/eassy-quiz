const jwt = require('jsonwebtoken'); 
const generateSecureToken = (quizId) => {
    return jwt.sign({ quizId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};
module.exports = generateSecureToken;