const mongoose = require("mongoose"); 
 
const VisitorUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  dob: Date,
  occupation: String,
  quizId: mongoose.Schema.Types.ObjectId,
  quizCreatorId : mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now } 
})
const VisitorUser = mongoose.model('VisitorUser', VisitorUserSchema); 
module.exports = {
    VisitorUser
}