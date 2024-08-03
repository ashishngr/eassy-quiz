const jwt = require('jsonwebtoken'); 
const {ERRORS} = require('../constants'); 

const QuizLinkHelper = module.exports; 

QuizLinkHelper.generateToken = (quizId) => {
    const payload = {
        quizId,
        createdAt: new Date().toISOString(),
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}
QuizLinkHelper.validateToken = ( req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.quizId = decoded.quizId;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}