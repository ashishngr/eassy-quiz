const mongoose = require("mongoose"); 
 
const VisitorUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  dob: Date,
  occupation: String,
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  quizCreatorId : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AdminUser'
  },
  createdAt: { type: Date, default: Date.now } 
})
const VisitorUser = mongoose.model('VisitorUser', VisitorUserSchema); 
module.exports = {
    VisitorUser
}