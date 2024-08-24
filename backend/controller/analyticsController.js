const express = require('express'); 
const mongoose = require('mongoose');
const moment = require('moment');
const {Quiz} = require("../models/quizSchema"); 
const {AdminUser} = require("../models/adminUserSchema")
const {VisitorUser} = require("../models/visitorUserSchema"); 
const {QuizParticipation} = require("../models/quizParticipationSchema") 
var ObjectId = mongoose.Types.ObjectId; 

const AnalyticsController = module.exports; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const { use } = require('../routes/analyticsRoutes');


AnalyticsController.getFeedbackDetails = async(req, res) =>{
    try {
        const { timestamp } = req.query;
        console.log("timeStamp: ", timestamp)
        console.log("type of timestamp: ", typeof(timestamp));

        
        let today = new Date(); 
        let yesterday = new Date(today); 
        let oneWeek = new Date(today); 
        let oneMonth = new Date(today); 
        let sixMonth = new Date(today); 
        let oneYear = new Date(today); 
        let actualYesterday = new Date(today); 

        
        yesterday.setDate(yesterday.getDate() - 1); 
        oneWeek.setDate(today.getDate() - 6); 
        oneMonth.setDate(today.getDate() - 30); 
        sixMonth.setDate(today.getDate() - 180); 
        oneYear.setDate(today.getDate() - 365); 
        actualYesterday.setDate(actualYesterday.getDate() - 2);  

        today.toDateString(); 
        yesterday.toDateString(); 
        oneWeek.toDateString(); 
        oneMonth.toDateString(); 
        sixMonth.toDateString(); 
        oneYear.toDateString(); 
        actualYesterday.toDateString(); 


        const userId = req.user.id; 
        console.log("creator user id : ", userId)
        const user = await AdminUser.findById({_id : userId}); 
        console.log("Creator User", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        let query = {creatorUserId : user._id}; 

        if(timestamp && timestamp === 'today'){
            let newQuery = {
                created_at : {
                    $gte : yesterday
                }
            }
            query = {...query, ...newQuery}
        }

        if(timestamp && timestamp === 'yesterday'){
            let newQuery = {
                created_at : {
                    created_at : {
                        $gte : actualYesterday , $lt : yesterday
                    }
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneWeek'){
            let newQuery = {
                created_at : {
                    $gte : oneWeek
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneMonth'){
            let newQuery = {
                created_at : {
                    $gte : oneMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'sixMonth'){
            let newQuery = {
                created_at : {
                    $gte : sixMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneYear'){
            let newQuery = {
                created_at : {
                    $gte : oneYear
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'allTime'){
            query = {...query, }
        }
        console.log("query", query)

        const list = await QuizParticipation.aggregate([
           { $match : query}, 
           {
            $group : {
                _id: "$feedback",
                count: { $sum: 1 }
            }
           }, 
           {
            $project: {
                rating: "$_id",
                count: 1,
                _id: 0
            }
            }
        ]); 
        
        return res.status(200).json(list)   
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}; 
AnalyticsController.getQuizCompletionData = async(req, res) =>{
    try {
    const { timestamp } = req.query;
    console.log("timeStamp: ", timestamp)
    console.log("type of timestamp: ", typeof(timestamp));
    let today = new Date(); 
    let yesterday = new Date(today); 
    let oneWeek = new Date(today); 
    let oneMonth = new Date(today); 
    let sixMonth = new Date(today); 
    let oneYear = new Date(today); 
    let actualYesterday = new Date(today); 

    
    yesterday.setDate(yesterday.getDate() - 1); 
    oneWeek.setDate(today.getDate() - 6); 
    oneMonth.setDate(today.getDate() - 30); 
    sixMonth.setDate(today.getDate() - 180); 
    oneYear.setDate(today.getDate() - 365); 
    actualYesterday.setDate(actualYesterday.getDate() - 2);  

    today.toDateString(); 
    yesterday.toDateString(); 
    oneWeek.toDateString(); 
    oneMonth.toDateString(); 
    sixMonth.toDateString(); 
    oneYear.toDateString(); 
    actualYesterday.toDateString(); 


    const userId = req.user.id; 
    console.log("creator user id : ", userId)
    const user = await AdminUser.findById({_id : userId}); 
    console.log("Creator User", user)
    if(!user){
        return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }; 
    let query = {creatorUserId : user._id}; 

    if(timestamp && timestamp === 'today'){
        let newQuery = {
            created_at : {
                $gte : yesterday
            }
        }
        query = {...query, ...newQuery}
    }

    if(timestamp && timestamp === 'yesterday'){
        let newQuery = {
            created_at : {
                created_at : {
                    $gte : actualYesterday , $lt : yesterday
                }
            }
        }
        query = {...query, ...newQuery}
    }
    if(timestamp && timestamp === 'oneWeek'){
        let newQuery = {
            created_at : {
                $gte : oneWeek
            }
        }
        query = {...query, ...newQuery}
    }
    if(timestamp && timestamp === 'oneMonth'){
        let newQuery = {
            created_at : {
                $gte : oneMonth
            }
        }
        query = {...query, ...newQuery}
    }
    if(timestamp && timestamp === 'sixMonth'){
        let newQuery = {
            created_at : {
                $gte : sixMonth
            }
        }
        query = {...query, ...newQuery}
    }
    if(timestamp && timestamp === 'oneYear'){
        let newQuery = {
            created_at : {
                $gte : oneYear
            }
        }
        query = {...query, ...newQuery}
    }
    if(timestamp && timestamp === 'allTime'){
        query = {...query, }
    }
    console.log("query", query); 
    const list = await QuizParticipation.aggregate([
        { $match : query}, 
        {
         $group : {
             _id: "$isComplete",
             count: { $sum: 1 }
         }
        }, 
        {
         $project: {
             isComplete: "$_id",
             count: 1,
             _id: 0
         }
         }
     ]); 
     
     return res.status(200).json(list)  
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}; 
AnalyticsController.QuizData = async(req, res) =>{
    try {
        const { timestamp } = req.query;
        console.log("timeStamp: ", timestamp)
        console.log("type of timestamp: ", typeof(timestamp));

        
        let today = new Date(); 
        let yesterday = new Date(today); 
        let oneWeek = new Date(today); 
        let oneMonth = new Date(today); 
        let sixMonth = new Date(today); 
        let oneYear = new Date(today); 
        let actualYesterday = new Date(today); 

        
        yesterday.setDate(yesterday.getDate() - 1); 
        oneWeek.setDate(today.getDate() - 6); 
        oneMonth.setDate(today.getDate() - 30); 
        sixMonth.setDate(today.getDate() - 180); 
        oneYear.setDate(today.getDate() - 365); 
        actualYesterday.setDate(actualYesterday.getDate() - 2);  

        today.toDateString(); 
        yesterday.toDateString(); 
        oneWeek.toDateString(); 
        oneMonth.toDateString(); 
        sixMonth.toDateString(); 
        oneYear.toDateString(); 
        actualYesterday.toDateString(); 


        const userId = req.user.id; 
        console.log("creator user id : ", userId)
        const user = await AdminUser.findById({_id : userId}); 
        console.log("Creator User", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        let query = {creatorUserId : user._id}; 
        if(timestamp && timestamp === 'today'){
            let newQuery = {
                created_at : {
                    $gte : yesterday
                }
            }
            query = {...query, ...newQuery}
        }

        if(timestamp && timestamp === 'yesterday'){
            let newQuery = {
                created_at : {
                    created_at : {
                        $gte : actualYesterday , $lt : yesterday
                    }
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneWeek'){
            let newQuery = {
                created_at : {
                    $gte : oneWeek
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneMonth'){
            let newQuery = {
                created_at : {
                    $gte : oneMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'sixMonth'){
            let newQuery = {
                created_at : {
                    $gte : sixMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneYear'){
            let newQuery = {
                created_at : {
                    $gte : oneYear
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'allTime'){
            query = {...query, }
        }
        console.log("query", query)

        const quizCount = await Quiz.countDocuments(query);
        return res.status(200).json(quizCount)   
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
AnalyticsController.getQuizScopeData = async(req, res) =>{
    try {
        const { timestamp } = req.query;
        console.log("timeStamp: ", timestamp)
        console.log("type of timestamp: ", typeof(timestamp));

        
        let today = new Date(); 
        let yesterday = new Date(today); 
        let oneWeek = new Date(today); 
        let oneMonth = new Date(today); 
        let sixMonth = new Date(today); 
        let oneYear = new Date(today); 
        let actualYesterday = new Date(today); 

        
        yesterday.setDate(yesterday.getDate() - 1); 
        oneWeek.setDate(today.getDate() - 6); 
        oneMonth.setDate(today.getDate() - 30); 
        sixMonth.setDate(today.getDate() - 180); 
        oneYear.setDate(today.getDate() - 365); 
        actualYesterday.setDate(actualYesterday.getDate() - 2);  

        today.toDateString(); 
        yesterday.toDateString(); 
        oneWeek.toDateString(); 
        oneMonth.toDateString(); 
        sixMonth.toDateString(); 
        oneYear.toDateString(); 
        actualYesterday.toDateString(); 


        const userId = req.user.id; 
        console.log("creator user id : ", userId)
        const user = await AdminUser.findById({_id : userId}); 
        console.log("Creator User", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        let query = {creatorUserId : user._id}; 
        if(timestamp && timestamp === 'today'){
            let newQuery = {
                created_at : {
                    $gte : yesterday
                }
            }
            query = {...query, ...newQuery}
        }

        if(timestamp && timestamp === 'yesterday'){
            let newQuery = {
                created_at : {
                    created_at : {
                        $gte : actualYesterday , $lt : yesterday
                    }
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneWeek'){
            let newQuery = {
                created_at : {
                    $gte : oneWeek
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneMonth'){
            let newQuery = {
                created_at : {
                    $gte : oneMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'sixMonth'){
            let newQuery = {
                created_at : {
                    $gte : sixMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneYear'){
            let newQuery = {
                created_at : {
                    $gte : oneYear
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'allTime'){
            query = {...query, }
        }
        console.log("query", query); 
        const quizScopes = await Quiz.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$scope",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    scope: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);
        console.log(quizScopes); 
        return res.status(200).json(quizScopes);

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res); 
    }
}
AnalyticsController.getParticipationData = async(req, res) => {
    try {
        const { timestamp } = req.query;
        console.log("timeStamp: ", timestamp)
        console.log("type of timestamp: ", typeof(timestamp));

        
        let today = new Date(); 
        let yesterday = new Date(today); 
        let oneWeek = new Date(today); 
        let oneMonth = new Date(today); 
        let sixMonth = new Date(today); 
        let oneYear = new Date(today); 
        let actualYesterday = new Date(today); 

        
        yesterday.setDate(yesterday.getDate() - 1); 
        oneWeek.setDate(today.getDate() - 6); 
        oneMonth.setDate(today.getDate() - 30); 
        sixMonth.setDate(today.getDate() - 180); 
        oneYear.setDate(today.getDate() - 365); 
        actualYesterday.setDate(actualYesterday.getDate() - 2);  

        today.toDateString(); 
        yesterday.toDateString(); 
        oneWeek.toDateString(); 
        oneMonth.toDateString(); 
        sixMonth.toDateString(); 
        oneYear.toDateString(); 
        actualYesterday.toDateString(); 


        const userId = req.user.id; 
        console.log("creator user id : ", userId)
        const user = await AdminUser.findById({_id : userId}); 
        console.log("Creator User", user)
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        let query = {quizCreatorId : user._id}; 

        if(timestamp && timestamp === 'today'){
            let newQuery = {
                createdAt : {
                    $gte : yesterday
                }
            }
            query = {...query, ...newQuery}
        }

        if(timestamp && timestamp === 'yesterday'){
            let newQuery = {
                
                createdAt : {
                        $gte : actualYesterday , $lt : yesterday
                    }
                
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneWeek'){
            let newQuery = {
                createdAt : {
                    $gte : oneWeek
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneMonth'){
            let newQuery = {
                createdAt : {
                    $gte : oneMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'sixMonth'){
            let newQuery = {
                createdAt : {
                    $gte : sixMonth
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'oneYear'){
            let newQuery = {
                createdAt : {
                    $gte : oneYear
                }
            }
            query = {...query, ...newQuery}
        }
        if(timestamp && timestamp === 'allTime'){
            query = {...query, }
        }
        console.log("query", query)
        let participantCount =  await VisitorUser.countDocuments(query)
        console.log(participantCount); 
        res.status(200).json(participantCount); 

    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res); 
    }
}