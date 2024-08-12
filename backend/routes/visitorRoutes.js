var express = require('express'); 
var router = express.Router(); 

const QuizController = require("../controller/quizController");
const tokenValidatingHelper = require("../helper/quizLinkHelper");  
const VisitorUserController = require("../controller/visitorUserController");

let validateToken = tokenValidatingHelper.validateToken;  


router.get("/validate-token",  QuizController.validateQuizToken );  
router.post("/save-visitor-user-details", VisitorUserController.saveVisitorUserDetails); 
router.get("/quiz-information/:quizId", VisitorUserController.getQuizInformation)
router.post("/quiz-participation", VisitorUserController.quizParticipation)

module.exports = router; 

