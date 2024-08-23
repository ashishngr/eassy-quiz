var express = require('express'); 
var router = express.Router(); 

const AnalyticsController = require("../controller/analyticsController"); 
const AdminAuthHelper = require("../helper/adminAuthHelper");  

let validateToken = AdminAuthHelper.validateToken; 

router.get("/quiz-feedback",validateToken, AnalyticsController.getFeedbackDetails)


module.exports = router; 
