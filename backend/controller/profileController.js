const {AdminUser} = require("../models/adminUserSchema"); 
const jwt = require("jsonwebtoken"); 
const uuidv4 = require("uuid"); 
var mongoose = require("mongoose");  

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 
const PasswordUtils = require("../utils/passwordUtils");  

const AdminAuthHelper = require("../helper/adminAuthHelper");  

const ProfileController = module.exports; 

ProfileController.updatePassword = async(req, res) => {
    const id = req.user.id; 
    const {currentPassword, newPassword} = req.body; 
    try {
        if( !currentPassword || !newPassword){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST); 
        }
        const admin = await AdminUser.findById(id); 
        
        if(!admin){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }; 
        if(currentPassword === newPassword){
            return ErrorUtils.APIErrorResponse(res, ERRORS.BOTH_FASSWORD_MATCH)
        };
        if(!PasswordUtils.isValidPassword(newPassword)){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
        }
        let isMatchedPassword = await admin.authenticate(currentPassword);   
        if(!isMatchedPassword){
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_CREDENTIALS_INVALID); 
        }
        admin.password = newPassword; 
        await admin.save();

        res.status(200).json({
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}; 
ProfileController.udateBasicProfile = async(req, res) => {
    
    try {
        const {first_name, last_name, email} = req.body; 
        const userId = req.user.id; 
        const user  = await AdminUser.findById({_id: userId}); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, NO_USER_FOUND)
        };   
        if(first_name) user.first_name = first_name; 
        if(last_name) user.last_name = last_name; 
        if(email) user.email = email ; 

        await user.save(); 
        
        res.status(200).json({
            message: "User profile update successfully", 
            data: user
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }

}; 
ProfileController.getUserProfile = async(req, res) =>{
    const userId = req.user.id; 
    try {
        const user = await AdminUser.findById( userId, 'first_name last_name email'); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
        }; 
        return res.status(200).json({
            message: "User find succesfully", 
            data : user
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}