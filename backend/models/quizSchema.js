const { text } = require("body-parser");
const mongoose = require("mongoose"); 
const {Schema} = mongoose; 

const OptionSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 225
    },
    isCorrect: {
        type: Boolean, 
        required: true, 
        default: false
    }
});
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, 
        trim: true, 
        maxlength: 850, 
    }, 
    options: [OptionSchema]
}); 
const SharedEmailSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true, 
        validate: {
            validator : (email) => /\S+@\S+\.\S+/.test(email),
            message: "Invalid email"
        }
    }
}); 
const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 128
    }, 
    description: {
        type: String, 
        true: true
    }, 
    questions: {
        type: [QuestionSchema], 
        required: true, 
        validate: [(questions) => questions.length <=10], 
        message: "Quiz can not have more than 10 questions"
    },
    creatorUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', // Assuming a separate User model
        required: true,
    },
    creatorUserEmail: {
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true, 
        validate: {
            validator : (email) => /\S+@\S+\.\S+/.test(email),
            message: "Invalid email"
        }
    } ,
    creatorUserName: {
        type: String,
        required: true,
        trim: true,
    },
    
    formattedCreatedAt: { // Virtual field for formatted date
        type: String,
        get() {
          const date = new Date(this.createdAt);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
    },
    sharedEmails: [SharedEmailSchema], // List of email addresses
    status: {
        type: String,
        required: true,
        enum: ['PUBLISHED', 'DRAFT'], // Allowed status values
    },
},
{
    collection: "Quiz", 
    timestamps: {
        createdAt: "created_at", 
        updatedAt: "updated_at", 
    }, 
}
); 
// Indexing for performance
QuizSchema.index({ title: 'text' }); // Enable text search on title
QuizSchema.index({ creatorUserId: 1 }); // Index for creator lookup

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = {
    Quiz
}