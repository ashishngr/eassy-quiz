var express = require('express'); 
var router = express.Router();  

const upload = require("../helper/fileUploadHelper");

const ProfileController = require("../controller/profileController"); 
const AdminAuthHelper = require("../helper/adminAuthHelper");  

let validateToken = AdminAuthHelper.validateToken; 

 
router.put("/updatePassword", validateToken, ProfileController.updatePassword); 
router.put("/updateProfile", validateToken, ProfileController.udateBasicProfile); 
router.get("/profileInfo", validateToken, ProfileController.getUserProfile); 
router.post("/uploadProfile", upload.single('profilePic'), ProfileController.uploadProfilePicture); 

module.exports = router; 

