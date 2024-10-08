const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const {Quiz} = require("../models/quizSchema"); 
const {AdminUser} = require("../models/adminUserSchema")
var mongoose = require("mongoose"); 
var ObjectId = mongoose.Types.ObjectId; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 
const generateSecureToken = require("../helper/generateSecureToken") 

const QuizLinkHelper = require("../helper/quizLinkHelper"); 

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
        var {limit, page, quizId, creatorUserEmail, scope, status, sortBy} = req.query; 
        if(!limit || !page){
            return ErrorUtils.APIErrorResponse(res, ERRORS.PAGINATION_ERROR); 
        }; 
        page = page || 1; 
        limit = limit || 5; 
        let skip = (page - 1) * limit; 
        
        let query = {creatorUserId : new ObjectId(creatorId)}; 
        // Add filter conditions
        if (quizId) {
            query._id = new ObjectId(quizId);
        }
        if (creatorUserEmail) {
            query.creatorUserEmail = creatorUserEmail;
        }
        if (scope) {
            query.scope = scope;
        }
        if (status) {
            query.status = status;
        }
        // Sorting logic
        const sort = {created_at: -1};

        if (sortBy === 'latest') {
            sort.created_at = -1; // Sort by latest
        } else if (sortBy === 'oldest') {
            sort.created_at = 1;  // Sort by oldest
        }

        const quizList = await Quiz.aggregate([
            {
                $match : query
            }, 
            {
                $sort : sort
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
        console.log("We are here")
        const { id } = req.params; 
        const creatorId = req.user.id; 
        const creatorUser = await AdminUser.find({_id: creatorId}); 
        if(!creatorUser){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
        const quiz = await Quiz.findById(id);; 
        if(!quiz){
            return EmailUtils.APIErrorResponse(err, ERRORS.NO_QUIZ_FOUND);
        }
        quiz.status = "Deleted"; 
        await quiz.save();
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
            return res.status(200).json({
                message : "Quiz Is Already saved"
            })
        }; 
        // Add user ID to the savedBy array
        quiz.savedBy.push(creatorId);
        await quiz.save();

        res.status(200).json({ message: 'Quiz Saved Successfully' });

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO: API to get quiizes saved in your library 
QuizController.getSaveQuizes = async(req, res) =>{
    const userId = req.user.id; 
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
    var {limit, page} = req.query; 
    if(!limit || !page){
        return ErrorUtils.APIErrorResponse(res, ERRORS.PAGINATION_ERROR); 
    }
    page = page || 1; 
    limit = limit || 5; 
    let skip = (page - 1) * limit; 
    let query = {
        creatorUserId : new ObjectId(userId), 
        savedBy: { $in: [new mongoose.Types.ObjectId(userId)] } 
    }; 
    console.log(query); 
    const savedQuizzes = await Quiz.aggregate([
        {
            $match : query
        }, 
        {
            $sort : {created_at : -1}
        }, 
        {
            $skip : skip
        },
        {
            $limit : parseInt(limit)
        }
    ]); 
    if(!savedQuizzes){
        return  "No Save Quiz Found"
    }
    const totalCount = await Quiz.countDocuments(query); 
    
    const response = savedQuizzes.map(quiz => ({
        id : quiz._id,
        title: quiz.title, 
        creatorUserName: quiz.creatorUserName,
    }))
    let responseData = {
        data : response, 
        totalCount : totalCount, 
        currentPage : page
    }
    res.status(200).json({
        data : responseData, 
        message: "Returning all the saved quizzes to your library"
    });

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
//TODO : API to get most popular public quizzes  
QuizController.getPublicQuizzes = async(req, res) =>{
    const userId = req.user.id; 
    console.log("UserId in get public quizzes: ", userId)
    const user = await AdminUser.findById(userId);
    console.log("User n get public quizzes:", user)
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        var {limit, page} = req.query; 
        if(!limit || !page){
            return ErrorUtils.APIErrorResponse(res, ERRORS.PAGINATION_ERROR); 
        }
        page = page || 1; 
        limit = limit || 5; 
        let skip = (page - 1) * limit; 
        let query = {
            creatorUserId : new ObjectId(userId), 
            scope: 'Public'
        }; 
        const publicQuiz = await Quiz.aggregate([
            {
                $match : query
            }, 
            {
                $sort : {created_at : -1}
            }, 
            {
                $skip : skip
            },
            {
                $limit : parseInt(limit)
            }
        ]); 


        if(!publicQuiz){
            return "No Public Quiz Found"
        }
        // Shuffle the quizzes 
        const shuffledQuizzes = publicQuiz.sort(() => 0.5 - Math.random()); 
       
        const response = shuffledQuizzes.map(quiz => ({
            id: quiz._id,
            title: quiz.title,
            description: quiz.description,
            creatorUserName: quiz.creatorUserName,
            numberOfParticipants: quiz.participants.length
        })); 
        const totalCount = await Quiz.countDocuments(query); 

        const payload = {
            data: response, 
            totalQuiz: totalCount, 
            currentPage: page 
        }
        res.status(200).json({
            data: payload
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

        // 2. Number of Public Quizzes
        const publicQuizzes = await Quiz.countDocuments({ scope: 'Public' });
        // 2. Number of Private Quizzes
        const PrivateQuizzes = await Quiz.countDocuments({ scope: 'Private' });
        // 2. Number of Shared Quizzes
        const sharedQuizzes = await Quiz.countDocuments({ scope: 'IsShared' });

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
            publicQuizzes,
            PrivateQuizzes,
            sharedQuizzes, 
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
QuizController.generatePublicQuizLink = async(req, res) => {
    const userId = req.user.id; 
    const user = await AdminUser.findById({_id: userId});
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId); 
        if (quiz && quiz.scope === 'Public') {
            const token = jwt.sign({ quizId }, process.env.SECRET_KEY, { expiresIn: '2h' });
            res.json({ link: `${process.env.FRONTEND_URL}/play?token=${token}` });
        }   
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
QuizController.generateSharedQuizLink = async(req, res) => {
    const userId = req.user.id; 
    const user = await AdminUser.findById({_id: userId});
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    try {
       const { quizId } = req.params;  
       const userEmail = user.creatorUserEmail; 
       const quiz = await Quiz.findById(quizId); 
       if(!quiz){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
        };  
        if(quiz.sharedEmails.includes(userEmail)){
            //Generate secure token link 
            const token = generateSecureToken(quizId); 
            // Send response with the link
            res.status(200).json({ link: `https://example.com/quiz/play?token=${token}` });
        }else{
            return ErrorUtils.APIErrorResponse(res, ERRORS.ACCESS_DENIED)
        }
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
QuizController.generatePrivateQuizLink = async(req, res) =>{
    const userId = req.user.id; 

    const user = await AdminUser.findById({_id: userId});
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }
    const userEmail = user.email; 
    console.log("creator Email", userEmail)
    try {
         const { quizId } = req.params;  
         const quiz = await Quiz.findById(quizId);
         if(!quiz){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND);
         };
         // Check if the quiz is private and if the creator's email matches the logged-in user's email
        if ( quiz.creatorUserEmail === userEmail) {
            // Generate a secure token
            // const token = generateSecureToken(quizId); // Implement this function 
            const token  = QuizLinkHelper.generateToken(quizId, user._id); 
            // Send the token in the response
            res.status(200).json({ link: `http://localhost:3001/quiz/landing-page?token=${token}` });
        } else {
            return ErrorUtils.APIErrorResponse(res, ERRORS.ACCESS_DENIED)
        }  
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
};

QuizController.validateQuizToken = async(req, res) =>{
    const { token } = req.query;  

    console.log("token to validate", token) 

    if (!token) {
        return res.status(400).json({ valid: false, message: 'Token is required' });
    } 

  try {
    // Verify the token
    const decoded = jwt.verify(token,  process.env.SECRET_KEY);
    const quizId = decoded.quizId; // Assuming the token contains quizId

    return res.status(200).json({ valid: true, message: 'Token is valid', quizId, token });
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
}

