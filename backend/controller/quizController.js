const express = require('express'); 
const {Quiz} = require("../models/quizSchema"); 
const {AdminUser} = require("../models/adminUserSchema")
var mongoose = require("mongoose"); 
var ObjectId = mongoose.Types.ObjectId; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 
const { Admin } = require('mongodb');
const { use } = require('../routes/quizRoutes'); 

const SecureLinkGenerator = require("../helper/secureLinkHelper"); 

const QuizController = module.exports; 

QuizController.createQuizMetaData = async (req, res) => {
    const 
        {
            title, 
            description, 
            category, 
            difficulty, 
            scope, 
            sharedEmails, 
            isDraft, 
            timeOut
        } = req.body;

        console.log("req body", title, difficulty, timeOut, scope); 

        if( !title || !difficulty || !timeOut || !scope){
            return ErrorUtils.APIErrorResponse(res, ERRORS.MISSING_REQUIRED_QUIZ_FIELDS);
        }
        if(timeOut && timeOut <=0){
            return ErrorUtils.APIErrorResponse(res, ERRORS.TOTAL_TIME); 
        }
    try {   
        const creatorUserId = req.user.id;   
        const user = await AdminUser.findById({_id : creatorUserId}); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        console.log("-->", creatorUserId)

        let userId = user.id;
        let userName = user.first_name;
        let userEmail = user.email; 
        const  newQuizData = new Quiz({
            title, 
            description, 
            category,
            difficulty, 
            creatorUserId: userId, 
            creatorUserName: userName, 
            creatorUserEmail: userEmail,
            scope,
            sharedEmails,
            timeOut, 
            participants: []
        })
        if (isDraft) {
            newQuizData.status = 'Draft';
        }
        await newQuizData.save(); 
        var payload = {
                data: newQuizData, 
                message: "Quiz meta data added sucessfully"
        }
        res.status(200).json({
            payload
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }    
};
// TODO: Controller to add questions 
QuizController.addQuestionsToQuiz = async(req, res) => {
    
    const {quizId} = req.params; 
    const {questions} = req.body;  
    if( !questions || !Array.isArray(questions) || questions.length < 3 ){
        return ErrorUtils.APIErrorResponse(res, ERRORS.LESS_NO_OF_QUESTIONS); 
    }
    else
    {
        let validQuestions = true;
        for (const question of questions) {
            if (!question.text || !question.options || !Array.isArray(question.options) || question.options.length !== 4) {
                validQuestions = false;
                break;
            }
        }
        if (!validQuestions) {
            return ErrorUtils.APIErrorResponse(res, ERRORS.WRONG_QUESTION);
        }
    }
    try {
        const quiz = await Quiz.findById(quizId); 
        if (!quiz) {
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND); 
        }
        if(quiz.status !=='Draft'){
            return ErrorUtils.APIErrorResponse(res, ERRORS.QUIZ_STATUS_IN_NOT_DRAFT)
        } 
        quiz.questions.push(...questions); 
        //Update the quiz status to Published
        quiz.status = 'Published';
        await quiz.save(); 
        res.status(201).json({
            message: "Questions added to quiz"
        })
    } catch (error) {
        console.log(error)
    }

}

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
//TODO: controller to fetch all the queries created by a specific user
    
    try {
        const creatorId = req.user.id; 
        const creatorUser = await AdminUser.find({_id: creatorId}); 
        if(!creatorUser){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
        var {limit, page} = req.query; 
        if(!limit || !page){
            return ErrorUtils.APIErrorResponse(res, ERRORS.PAGINATION_ERROR); 
        }; 
        page = page || 1; 
        limit = limit || 5; 
        let skip = (page - 1) * limit; 
        
        let query = {creatorUserId : new ObjectId(creatorId)}; 

        const quizList = await Quiz.aggregate([
            {
                $match : query
            }, 
            {
                $sort : { created_at: -1 }
            },
            {
                $skip: skip
            }, 
            {
                $limit: parseInt(limit)
            }
        ]); 
        const totalCount = await Quiz.countDocuments(query); 
        const payload = {
            data: quizList, 
            totalQuiz: totalCount, 
            currentPage: page 
        }
        return res.status(200).json(payload)

    } catch (error) {
        console.log(error);
        return ErrorUtils.APIErrorResponse(res);
    }
}

QuizController.singleQuiz = async(req, res) => {
    try {
        const creatorId = req.user.id; 
        const { id } = req.params; 

        const creatorUser = await AdminUser.find({_id: creatorId}); 
        if(!creatorUser){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
        const quiz = await Quiz.findById(id); 
        if(!quiz){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
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
        const creatorId = req.user.id; 
        const creatorUser = await AdminUser.find({_id: creatorId}); 
        if(!creatorUser){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
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

//TODO: API to add quizzes into library 
QuizController.addQuizzesToLibrary = async(req, res) => {
    const creatorId = req.user.id; 
    console.log("user id: ", creatorId); 
    const quizId = req.body.quizId;
    const creatorUser = await AdminUser.find({_id: creatorId}); 
    if(!creatorUser){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        const quiz = await Quiz.findById(quizId); 
        if(!quiz){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
        }; 
        // Check if quiz is created by same user 
        if(quiz.creatorUserId.toString() !== creatorId){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NOT_AUTHORIZED_TO_SAVE_QUIZ);
        }
        //Check if quiz already saved by user 
        if (quiz.savedBy.includes(creatorId)) {
            return ErrorUtils.APIErrorResponse(res, ERRORS.QUIZ_ALREADY_SAVED);
        }; 
        // Add user ID to the savedBy array
        quiz.savedBy.push(creatorId);
        await quiz.save();

        res.status(200).json({ message: 'Quiz saved successfully' });

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO: API to get quiizes saved in your library 
QuizController.getSaveQuizes = async(req, res) =>{
    const userId = req.user.id; 
    console.log("user id", userId); 
    const user = await AdminUser.findById({_id: userId});
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
    const quizzes = await Quiz.find({ savedBy: { $in: [new mongoose.Types.ObjectId(userId)] } }).exec();
    if (!quizzes ||  quizzes.length === 0) {
      return res.status(200).json({
        message : "You do not have any saved quiz"
      })
    } 
    const response = quizzes.map(quiz => ({
        title: quiz.title, 
        creatorUserName: quiz.creatorUserName,
    }))
    res.status(200).json({
        data : response
    });

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO : API to get most popular public quizzes  
QuizController.getPublicQuizzes = async(req, res) =>{
    const userId = req.user.id; 
    const user = await AdminUser.findById({_id: userId});
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        const PublicQuizzes = await Quiz.find({ scope: 'Public' }); 
        if(!PublicQuizzes){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_PUBLIC_QUIZZ); 
        }
        // Shuffle the quizzes 
        const shuffledQuizzes = PublicQuizzes.sort(() => 0.5 - Math.random()); 
        const topTenQuizzes = shuffledQuizzes.slice(0, 10); 
        const response = topTenQuizzes.map(quiz => ({
            title: quiz.title,
            description: quiz.description,
            creatorUserName: quiz.creatorUserName,
            numberOfParticipants: quiz.participants.length
        })); 
        res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO : API to get latest 10 quizzes of yourself 
QuizController.latestTenQuizes = async(req, res) =>{
    const userId = req.user.id; 
    const user  = await AdminUser.findById({_id:userId})
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        const quizzes = await Quiz.find({creatorUserId : userId}).sort({ created_at: -1 })
        if(!quizzes || quizzes.length == 0){
            return res.status(200).json({
                message : "You do not have any saved quiz"
            }); 
        } 
        const topTenQuiz = quizzes.slice(0, 10); 
        const data = topTenQuiz.map(quiz => ({
            title : quiz.title, 
            description : quiz.description, 
            creatorUserName: quiz.creatorUserName,
            scope : quiz.scope, 
            created_at: quiz.created_at, 
            participants: quiz.participants.length, 
        }))
        return res.status(200).json({
            data: data
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO : API to get quiz stats for the home page   
QuizController.quizStats = async(req, res) => {
    const userId = req.user.id; 
    try {
        // 1. Number of total quizzes created by the user
        const totalQuizzesCreated = await Quiz.countDocuments({ creatorUserId: userId });

        // 2. Number of quizzes the user participated in
        const quizzesParticipated = await Quiz.countDocuments({ participants: userId });

        // 3. Number of unique users who participated in quizzes created by the user
        const aggregationPipeline = [
            // Match quizzes created by the user
            { $match: { creatorUserId: new mongoose.Types.ObjectId(userId) } },
            // Unwind participants array to have each participant in a separate document
            { $unwind: '$participants' },
            // Group by participant to count unique participants
            { $group: { _id: '$participants' } },
            // Count distinct participants
            { $count: 'numUniqueParticipants' }
        ];

        const result = await Quiz.aggregate(aggregationPipeline);

        let numUniqueParticipants = 0;
        if (result.length > 0) {
            numUniqueParticipants = result[0].numUniqueParticipants;
        }

        res.status(200).json({
            totalQuizzesCreated,
            quizzesParticipated,
            numUniqueParticipants,
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
QuizController.generateQuizLink = async(req, res) => {
    const userId = req.user.id; 
    const { quizId } = req.params;
    const user = await AdminUser.findById(userId);
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
        }
        const { link, token } = SecureLinkGenerator.generateSecureLink(quizId);
        quiz.linkToken = token;
        await quiz.save();
        res.status(200).json({link})
    } catch (error) {
        console.log(error);
        return ErrorUtils.APIErrorResponse(res); 
    }
}

