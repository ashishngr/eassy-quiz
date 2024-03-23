var express = require('express'); 
var router = express.Router(); 

const AuthController = require("../controller/authController"); 
const AdminAuthHelper = require("../helper/adminAuthHelper"); 

let validateToken = AdminAuthHelper.validateToken; 

router.post("/signup", AuthController.signup); 
router.post("/signin", AuthController.signin); 
router.delete("/delete/:id", validateToken, AuthController.deleteUser); 
router.post("/updatePassword", validateToken, AuthController.updatePassword); 

// router.post("/login"); 
// router.post("/logout")

module.exports = router
