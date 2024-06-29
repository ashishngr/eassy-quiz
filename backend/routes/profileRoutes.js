var express = require('express'); 
var router = express.Router();  

const ProfileController = require("../controller/profileController"); 
const AdminAuthHelper = require("../helper/adminAuthHelper");  

let validateToken = AdminAuthHelper.validateToken; 

 
router.put("/updatePassword", validateToken, ProfileController.updatePassword); 
router.put("/updateProfile", validateToken, ProfileController.udateBasicProfile); 

module.exports = router; 

