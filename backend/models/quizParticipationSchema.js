const mongoose = require("mongoose"); 
const { VisitorUser } = require("./visitorUserSchema");

const quizParticipationSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questions: [
        {
          text: { type: String, required: true },
          correctOption: { type: String, required: true },
          userSubmittedOption: { type: String, required: true },
          points: { type: Number, required: true, min: 0, max: 1 }
        }     
    ],
    isComplete: {
        type: Boolean,
        required: true,
    },
    finalScore : {
        type: Number, 
        required: true
    }, 
    rightQuestions: {
        type: Number, 
        required: true, 
    }, 
    wrongQuestions: {
        type: Number, 
        require: true
    }, 
    skipedQuestions: {
        type : Number, 
        required: true
    },
    feedback: {
        type: String,
        required: false,
    }
},
{
    collection: "QuizParticipation", 
    timestamps: {
        createdAt: "created_at", 
        updatedAt: "updated_at", 
    }, 
}
)
const QuizParticipation = mongoose.model('QuizParticipation', quizParticipationSchema);

module.exports = {
    QuizParticipation
}