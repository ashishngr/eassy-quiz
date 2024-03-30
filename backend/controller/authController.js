const {AdminUser} = require("../models/adminUserSchema"); 
const jwt = require("jsonwebtoken"); 
const uuidv4 = require("uuid"); 
var mongoose = require("mongoose"); 

var ObjectId = mongoose.Types.ObjectId; 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const EmailUtils = require("../utils/emailUtils"); 
const PasswordUtils = require("../utils/passwordUtils"); 

const AdminAuthHelper = require("../helper/adminAuthHelper"); 

const AuthController = module.exports; 

AuthController.signup = async(req, res) => {
    try {
        const {first_name, last_name, email, password, role} = req.body; 
        let adminUser = await AdminUser.findOne({email}); 
        if(adminUser){
            return ErrorUtils.APIErrorResponse(res, ERRORS.ADMIN_USER_ALREADY_EXIST)
        }
        if(!EmailUtils.isValidEmail(email)){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
        }
        if(!PasswordUtils.isValidPassword(password)){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
        }

        adminUser = new AdminUser({
            first_name, 
            last_name, 
            email, 
            password, 
            role
        })
        await adminUser.save(); 
        const payload = {
            adminUser: {
                id: adminUser.id, 
                role: adminUser.role
            }
        };
         // TODO: Assign a JWT token 
         const accessToken = AdminAuthHelper.createJWTToken(payload); 
         return res.status(200).json({
             access_toke: accessToken, 
             message: "User Register Successfully"
         });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
AuthController.signin = async(req, res) => {
    try {
        const {email , password} = req.body; 
        if(!email || !password){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST); 
        }
        let admin = await AdminUser.findOne({email}); 
        if(!admin){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
        }
        let isMatchedPassword = await admin.authenticate(password);   
        if(!isMatchedPassword){
            console.log("password is not matched: ", isMatchedPassword); 
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_CREDENTIALS_INVALID); 
        }
        console.log("password match"); 
        const payload = {
            user: {
                id: admin.id, 
                role: "Admin User"
            }
        }
        const accessToken = AdminAuthHelper.createJWTToken(payload); 
        return res.status(200).json({
            access_token: accessToken, 
            message: "User credentials match successfully"
        }); 
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res); 
    }
   

}
AuthController.deleteUser = async(req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST)
        }
        const admin = await AdminUser.findByIdAndDelete(id); 
        if(!admin){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND)
        }
        return res.status(200).json({
            message : "User delete successfully"
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}
AuthController.updatePassword = async(req, res) => {
    const {id, currentPassword, newPassword} = req.body; 
    try {
        if(!id || !currentPassword || !newPassword){
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
}