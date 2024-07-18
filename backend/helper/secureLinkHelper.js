const crypto = require('crypto');

const SecureLinkGenerator = module.exports ;  
SecureLinkGenerator.generateSecureLink = async(quizId) => {
    const token = crypto.randomBytes(20).toString('hex'); 
    return { link: `http://localhost:3001/quiz/${quizId}?token=${token}`, token };
}