const express = require('express'); 
const {Quiz} = require("../models/quizSchema"); 
const {AdminUser} = require("../models/adminUserSchema")
var mongoose = require("mongoose"); 

var ObjectId = mongoose.ObjectId; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 

const QuizController = module.exports; 

QuizController.createQuiz = async (req, res) => {
    const 
        {
            title, 
            description, 
            category, 
            difficulty, 
            creatorUserId, 
            totalTime, 
            isPublic, 
            sharedEmail, 
            questions, 
            status
        } = req.body;
        console.log("req body", req.body); 

        if( !title || !difficulty || !creatorUserId || !totalTime || !isPublic || !status){
            return ErrorUtils.APIErrorResponse(res, ERRORS.MISSING_REQUIRED_QUIZ_FIELDS);
        }
        if(totalTime && totalTime <=0){
            return ErrorUtils.APIErrorResponse(res, ERRORS.TOTAL_TIME); 
        }
        if( !questions || !Array.isArray(questions) || questions.length < 3 ){
            return ErrorUtils.APIErrorResponse(res, ERRORS.LESS_NO_OF_QUESTIONS); 
        }else{
            for(const question of questions){
                if( !question.text || !question.options || !Array.isArray(question.options) || question.options.length < 2 ){
                    console.log("++", question.options.length)
                    return ErrorUtils.APIErrorResponse(res, ERRORS.WRONG_QUESTION);
                    break;
                }
                if(question.correctOptionIndex < 0 || question.correctOptionIndex >= question.options.length){
                    console.log("+++", correctOptionIndex)
                    console.log("4+", question.options.length)
                    return ErrorUtils.APIErrorResponse(res, ERRORS.CORRECT_OPTION_UNAVAILABLE);
                    break; 
                }
                if( !question.marks < 0 ){
                    return ErrorUtils.APIErrorResponse(req, ERRORS.INCORRECT_MARKS); 
                    break; 
                }
            }
        }
    try {      
        const user = await AdminUser.findById(creatorUserId); 
        console.log("user", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        // TODO: Validate questions length
        if(questions.length >10){
            return ErrorUtils.APIErrorResponse(res, ERRORS.QUESTIONS_LIMIT_EXCEED)
        }; 
        let userId = user.id;
        let userName = user.first_name;
        let userEmail = user.email; 
        const  newQuiz = new Quiz({
            title, 
            description, 
            category,
            difficulty, 
            creatorUserId: userId, 
            creatorUserName: userName, 
            creatorUserEmail: userEmail,
            isPublic,
            sharedEmail,
            totalTime,
            status, 
            questions
        })
        await newQuiz.save(); 
        
        var payload = {
            quiz: {
                data: newQuiz, 
                message: "Quiz create sucessfully"
            }
        }
        console.log("quiz::=>", newQuiz); 
        res.status(200).json({
            payload
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }    
};

QuizController.updateQuiz = async (req, res) => {
    try {
        const { 
        title, 
        description, 
        category, 
        difficulty, 
        isPublic, 
        sharedEmail, 
        questions,
        status
     } = req.body;
        const { id } = req.params;
        // Fetch the quiz document 
        const quiz = await Quiz.findById(id).populate({ path: 'questions', populate: { path: '._id' } });

        if (!quiz) {
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND)
        }; 
        // Update allowed fields
        if (title) quiz.title = title;
        if (description) quiz.description = description;
        if(category) quiz.category = category; 
        if(difficulty) quiz.difficulty = difficulty; 
        if(isPublic) quiz.isPublic = isPublic; 
        if(sharedEmail) quiz.sharedEmail = sharedEmail; 
        if(status) quiz.status = status; 
    //===========================================================================
        //TODO: Function to update individual question
        for (const questionUpdate of questions || []) {

        const questionToModify = questionUpdate._id
          ? quiz.questions.find(q => q._id.toString() === questionUpdate._id)
          : quiz.questions[questionUpdate.index];
            
        if (questionToModify) {
          // 4. Update specific question properties
          questionToModify.text = questionUpdate.text ? questionUpdate.text : questionToModify.text;
          questionToModify.options = questionUpdate.options || questionToModify.options;
          questionToModify.correctOptionIndex = questionUpdate.correctOptionIndex !== undefined ? questionUpdate.correctOptionIndex : questionToModify.correctOptionIndex;
          questionToModify.marks = questionUpdate.marks !== undefined ? questionUpdate.marks : questionToModify.marks;
  
          console.log(`Updated question: ${questionToModify.text}`);
        } else {
          console.warn(`Question update with ID/index ${questionUpdate._id || questionUpdate.index} not found in quiz`);
        }
      }
    //====================================================
    // updateQuestions(quiz, questions || []) ; 
    // Save the updated quiz with validation
        await quiz.save( { validateBeforeSave: true } );
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
