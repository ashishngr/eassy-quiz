const { text } = require("body-parser");
const mongoose = require("mongoose"); 
const {Schema} = mongoose; 

// const OptionSchema = new mongoose.Schema({
//     text: {
//         type: String, 
//         required: true, 
//         trim: true, 
//         maxlength: 225
//     },
//     isCorrect: {
//         type: Boolean, 
//         required: true, 
//         default: false
//     }
// });
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: true, 
        trim: true
    }, 
    options: {
        type: [String], 
        required: true, 
    }, 
    correctOptionIndex: {
        type: Number, 
        required: true, 
    }, 
    marks: {
        type: Number, 
        required: true
    }
}); 
// const SharedEmailSchema = new mongoose.Schema({
//     email: {
//         type: String, 
//         required: true, 
//         trim: true, 
//         lowercase: true, 
//         validate: {
//             validator : (email) => /\S+@\S+\.\S+/.test(email),
//             message: "Invalid email"
//         }
//     }
// }); 
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
    category: {
        type: String, 
        optional: true
    }, 
    difficulty:{
        type: String, 
        required: true, 
        enum: ["Eassy", "Medium", "Hard"]
    },
     creatorUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser', // Assuming a separate User model
        required: true,
        index: true
    },
    creatorUserName: {
        type: String,
        required: true,
        trim: true,
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
    },
    isPublic: {
        "type": "Boolean",
        "default": false,
        "index": true  // Add index for efficient public/private filtering
    },
    sharedEmail: {
        type: [String], 
        optional: true, 
    },
   status: {
        type: String,
        required: true,
        enum: ['PUBLISHED', 'DRAFT'], // Allowed status values
    },
    totalTime: {
        type: Number, 
        required: true, 
    },
    questions: {
        type: [QuestionSchema], 
        required: true
    }, 
    formattedCreatedAt: { // Virtual field for formatted date
        type: String,
        get() {
          const date = new Date(this.createdAt);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        },
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


const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = {
    Quiz
}