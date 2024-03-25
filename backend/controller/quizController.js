const express = require('express'); 
const {Quiz} = require("../models/quizSchema"); 
const {AdminUser} = require("../models/adminUserSchema")
var mongoose = require("mongoose"); 

var ObjectId = mongoose.ObjectId; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 
const PasswordUtils = require("../utils/passwordUtils");  

const QuizController = module.exports; 

QuizController.createQuiz = async (req, res) => {
  
    try {
        const 
        {
            title, 
            description, 
            questions, 
            sharedEmails, 
            status, 
            email
        } = req.body;
        
        if( !title || !questions  ||  !status || !email || !description){
            return ErrorUtils.APIErrorResponse(res, ERRORS.MISSING_REQUIRED_QUIZ_FIELDS);
        }
        const user = await AdminUser.findOne({email}); 
        console.log("user email", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        // TODO: Validate questions length
        if(questions.length >10){
            return ErrorUtils.APIErrorResponse(res, ERRORS.QUESTIONS_LIMIT_EXCEED)
        }; 
        if(sharedEmails && sharedEmails.length > 0){
            for(const emails of sharedEmails){
                if(!EmailUtils.isValidEmail(email)){
                    return ErrorUtils.APIErrorResponse(res, ERRORS.SHARED_EMAIL_WRONG);
                }
            }    
        };
        let userId = user.id;
        console.log("user id", userId); 
        let userName = user.first_name;
        console.log("creator user name user name", userName)
        const  newQuiz = new Quiz({
            title, 
            description, 
            questions,
            creatorUserId: userId, 
            creatorUserName: userName, 
            creatorUserEmail: email,
            sharedEmails, 
            status
        })
        await newQuiz.save(); 
        var payload = {
            quiz: {
                status: newQuiz.status, 
                message: "Quiz create sucessfully"
            }
        }
        res.status(200).json({
            payload
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }    
};

QuizController.updateQuiz = async (req, res) => {
    const { title, questions, description, sharedEmails } = req.body;

    try {
        const { id } = req.params;
        console.log("Quiz ID:", id);

        // Fetch the quiz document
        const quiz = await Quiz.findOne({ _id: id });

        if (!quiz) {
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
        }

        // Log retrieved quiz data for debugging (including question IDs)
        console.log("Retrieved quiz:", quiz);

        // Update allowed fields
        if (title) quiz.title = title;
        if (description) quiz.description = description;

        // Update questions (extensive debugging)
        if (questions && questions.length > 0) {
            console.log("Number of questions to update:", questions.length);
            for (const updatedQuestion of questions) {
                console.log("---- Updated Question ----");
                console.log("Updated question ID (sent):", updatedQuestion._id);

                // Ensure correct data type for _id (if necessary)
                const updatedQuestionId = typeof updatedQuestion._id === 'string'
                    ? mongoose.Types.ObjectId(updatedQuestion._id)
                    : updatedQuestion._id;

                const matchingQuestion = quiz.questions.find(
                    (q) => q._id.equals(updatedQuestionId)
                );
                console.log("Matching question found:", !!matchingQuestion);

                if (matchingQuestion) {
                    console.log("Matching question ID:", matchingQuestion._id);
                    // Update specific question text or options
                    console.log("Update question text:", updatedQuestion.text);
                    if (updatedQuestion.text) matchingQuestion.text = updatedQuestion.text;

                    if (updatedQuestion.options) {
                        console.log("Number of options to update:", updatedQuestion.options.length);
                        // Update options efficiently using a loop
                        for (const option of updatedQuestion.options) {
                            console.log("---- Updated Option ----");
                            console.log("Updated option ID:", option._id);
                            const optionIndex = matchingQuestion.options.findIndex(
                                (o) => o._id.toString() === option._id
                            );
                            console.log("Matching option index:", optionIndex);
                            if (optionIndex !== -1) {
                                if (option.text) matchingQuestion.options[optionIndex].text = option.text;
                                if (option.isCorrect !== undefined) {
                                    matchingQuestion.options[optionIndex].isCorrect = option.isCorrect;
                                }
                            } else {
                                console.warn("Option with ID", option._id, "not found in matching question");
                            }
                        }
                    }
                } else {
                    console.warn("Updated question with ID", updatedQuestion._id, "not found in quiz");
                }
            }
        }

        // Update shared emails
        quiz.sharedEmails = sharedEmails;

        // Save the updated quiz
        await quiz.save();

        const payload = {
            message: "Quiz updated successfully",
            data: quiz,
        };
        res.status(200).json(payload);
    } catch (error) {
        console.log(error);
        return ErrorUtils.APIErrorResponse(res);
    }
};

QuizController.getAllQuiz = async(req, res) =>  {
    try {
        const { userId } = req.params; 
        const {skip = 0, limit = 10} = req.body; 
        const user = await AdminUser.findById( userId ); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }

        const pipeline = [
            { $match : {creatorUserId : userId}},  //Filter by user ID
            {$sort: {createdAt : -1}}, //Short by creation date
            {$skip: skip}, 
            {limit: limit}
        ]
            
        const quizs = await Quiz.find({ creatorUserId : id })

        let payload = {
            message: "Successfully returned all the quizes", 
            data: quizs
        }
        res.status(200).json({
            payload
        })
    } catch (error) {
        console.log(error);
        return ErrorUtils.APIErrorResponse(res);
    }
}

QuizController.singleQuiz = async(req, res) => {
    try {
        const { id } = req.params; 
        const quiz = await Quiz.findById(id); 
        if(!quiz){
            return EmailUtils.APIErrorResponse(err, ERRORS.NO_QUIZ_FOUND);
        }
        const payload = {
            message: "Quiz find successfully",
            data: quiz
        }
        res.status(200).json(payload);
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
QuizController.deleteQuiz = async(req, res) =>{
    try {
        const { id } = req.params; 
        const quiz = await Quiz.findByIdAndDelete( id ); 
        if(!quiz){
            return EmailUtils.APIErrorResponse(err, ERRORS.NO_QUIZ_FOUND);
        }
        return res.status(200).json({
            message: "Quiz delete successfully"
        });

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
