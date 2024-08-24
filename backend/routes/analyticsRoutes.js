var express = require('express'); 
var router = express.Router(); 

const AnalyticsController = require("../controller/analyticsController"); 
const AdminAuthHelper = require("../helper/adminAuthHelper");  

let validateToken = AdminAuthHelper.validateToken; 

router.get("/quiz-feedback",validateToken, AnalyticsController.getFeedbackDetails); 
router.get("/quiz-completion", validateToken, AnalyticsController.getQuizCompletionData); 
router.get("/quiz-participant", validateToken, AnalyticsController.getParticipationData); 
router.get("/quiz-scope", validateToken, AnalyticsController.getQuizScopeData)
router.get("/quiz-count", validateToken, AnalyticsController.QuizData)
module.exports = router; 
