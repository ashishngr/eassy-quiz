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
     console.log("-----", req.body); 
     
        const { id } = req.params;
        console.log("Quiz ID:", id);
        // Fetch the quiz document 

        console.log("questions ", questions)


        const quiz = await Quiz.findById(id, 
            id
        );

        if (!quiz) {
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND)
        }; 

        // Log retrieved quiz data for debugging (including question IDs)
        console.log("Retrieved quiz:", quiz);


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
        const updateQuestions = (quiz, questionUpdates) => {
            console.log("quiz======>", quiz.questions); 
            console.log("questionUpdates", questionUpdates)
            if (!quiz.questions) { // Handle missing questions array
                console.warn("Quiz has no questions to update");
                return; // Optionally return an error or throw an exception
            }
            for (const questionUpdate of questionUpdates || []) { // Handle empty questions array
              const questionIndex = questionUpdate._id ?
                quiz.questions.findIndex(q => q._id.toString() === questionUpdate._id) :
                questionUpdate.index;
      
              if (questionIndex !== -1) {
                // Apply updates using Mongoose operators (e.g., $set, $unset)
                if (questionUpdate._id) { // Update specific question by ID
                  quiz.questions.id(questionUpdate._id).$set = questionUpdate;
                } else { // Update question by index (if no ID provided)
                  quiz.questions.$set[questionIndex] = questionUpdate;
                }
              } else {
                // Throw an error or return a specific response for missing question
                throw new Error(`Question update with ID/index ${questionUpdate._id || questionUpdate.index} not found in quiz`);
              }
            }
          };

//====================================================
        updateQuestions(quiz, questions); 
         // Save the updated quiz with validation
        await quiz.save({ validateBeforeSave: true });
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
