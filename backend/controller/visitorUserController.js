const express = require('express'); 
const {Quiz} = require("../models/quizSchema"); 
const {VisitorUser} = require("../models/visitorUserSchema")
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 


const ErrorUtils = require("../utils/errorUtils"); 
 
const VisitorUserController = module.exports; 

VisitorUserController.saveVisitorUserDetails = async(req, res) =>{
    const { name, email, phoneNumber, dob, occupation, quizId } = req.body;
    if (!name || !email || !phoneNumber || !dob || !occupation || !quizId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const visitorUser = new VisitorUser({
            name,
            email,
            phoneNumber,
            dob,
            occupation,
            quizId
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