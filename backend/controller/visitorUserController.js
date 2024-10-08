const express = require('express'); 
const mongoose = require("mongoose"); 

const {Quiz} = require("../models/quizSchema"); 
const {VisitorUser} = require("../models/visitorUserSchema"); 
const {QuizParticipation} = require("../models/quizParticipationSchema")
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
 
const VisitorUserController = module.exports; 

VisitorUserController.saveVisitorUserDetails = async(req, res) =>{
    const { name, email, phoneNumber, dob, occupation, quizId, quizCreatorId } = req.body;
    if (!name || !email || !phoneNumber || !dob || !occupation || !quizId || !quizCreatorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const visitorUser = new VisitorUser({
            name,
            email,
            phoneNumber,
            dob,
            occupation,
            quizId, 
            quizCreatorId
        });
        await visitorUser.save();
        const token = jwt.sign({ visitorUserId: visitorUser._id, quizId }, SECRET_KEY, {
            expiresIn: '1h' // Token expiration time
        });
        res.status(201).json({ message: 'Visitor details saved', token });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
VisitorUserController.getQuizInformation = async(req, res) => {
    try {
        const {quizId} = req.params; 
        const quiz = await Quiz.findById(quizId).select('creatorUserId timeOut questions')
        if(!quiz){
            return  ErrorUtils.APIErrorResponse(res, ERRORS.NO_QUIZ_FOUND)
        }
        res.status(200).json({
            data : {
                creatorUserId: quiz.creatorUserId,
                questions: quiz.questions,
                timeout: quiz.timeOut
            }
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
VisitorUserController.quizParticipation = async(req, res) =>{
   

    const {quizId, participantId, questions, isComplete, finalScore, rightQuestions, wrongQuestions, skipedQuestions,  creatorUserId} = req.body;  
    // Validate input
    if (!quizId || !participantId || !finalScore ||!rightQuestions || !wrongQuestions || !skipedQuestions || !questions || isComplete === undefined || !creatorUserId) {
        return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    try {
        const newQuizParticipation = new QuizParticipation({
            quizId,
            participantId,
            questions,
            isComplete, 
            finalScore,
            rightQuestions, 
            wrongQuestions, 
            skipedQuestions, 
            creatorUserId
        });
        await newQuizParticipation.save();
        res.status(200).json({ message: 'Quiz Participation created successfully', 
            puizParticipationId : newQuizParticipation.id
        }); 
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
VisitorUserController.getQuizSummary = async(req, res) =>{
    const { participationId } = req.params;
    try {
         // Convert participationId to ObjectId
         const id = mongoose.Types.ObjectId.isValid(participationId) ? new mongoose.Types.ObjectId(participationId) : null;

         if (!id) {
             return res.status(400).json({ message: 'Invalid participation ID format' });
         }
        // Find the quiz participation by ID
        const quizParticipation = await QuizParticipation.findById(participationId); 
        console.log("Quiz Participation Data :::::::::", quizParticipation);

        
        if (!quizParticipation) {
            return res.status(404).json({ message: 'Quiz participation not found' });
        }
        

        // Send the response with the quizParticipationId and other details
        res.status(200).json({
            quizParticipationId: quizParticipation._id,
            quizId: quizParticipation.quizId,
            participantId: quizParticipation.participantId,
            isComplete: quizParticipation.isComplete,
            finalScore: quizParticipation.finalScore,
            rightQuestions: quizParticipation.rightQuestions,
            wrongQuestions: quizParticipation.wrongQuestions,
            skipedQuestions: quizParticipation.skipedQuestions,
            questions: quizParticipation.questions,
        });
    } catch (error) {
        console.log('Error fetching quiz participation:', error); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}
VisitorUserController.addfeedback = async(req, res) =>{
    const { participationId } = req.params;
    const { feedback } = req.body;
    if (!feedback) {
        return res.status(400).json({ message: 'Feedback is required' });
    }
    try {
        // Find the quiz participation by ID and ensure feedback hasn't already been submitted
        const quizParticipation = await QuizParticipation.findById(participationId);
        if (!quizParticipation) {
            return res.status(404).json({ message: 'Quiz participation not found' });
        }
        if (quizParticipation.feedback) {
            return res.status(400).json({ message: 'Feedback has already been submitted for this participation' });
        }
        // Update the participation with the feedback
        quizParticipation.feedback = feedback;
        await quizParticipation.save();
        return res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.log('Error fetching quiz participation:', error); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}