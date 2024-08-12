const mongoose = require("mongoose"); 
const { VisitorUser } = require("./visitorUserSchema");

const quizParticipationSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    VisitorUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitorUser',
        required: true
    },
    questions: [
        {
          questionText: { type: String, required: true },
          correctOption: { type: String, required: true },
          userSubmittedOption: { type: String, required: true },
          pointsAwarded: { type: Number, required: true, min: 0, max: 1 }
        }
    ],
    participationTime: {
        type: Date,
        default: Date.now,
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
})
const QuizParticipation = mongoose.model('QuizParticipation', quizParticipationSchema);

module.exports = {
    QuizParticipation
}