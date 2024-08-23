const jwt = require('jsonwebtoken'); 
const {ERRORS} = require('../constants'); 

const QuizLinkHelper = module.exports; 

QuizLinkHelper.generateToken = (quizId, creatorUserId) => {
    const payload = {
        quizId,
        creatorUserId, 
        createdAt: new Date().toISOString(),
      };
      const token = jwt.sign(payload,  process.env.SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}
QuizLinkHelper.validateToken = ( req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
      // Verify the token
        const decoded = jwt.verify(token, secretKey);
        const quizId = decoded.quizId; // Assuming the token contains quizId
        return res.status(200).json({ valid: true, message: 'Token is valid', quizId });
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}