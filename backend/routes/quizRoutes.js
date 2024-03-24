var express = require('express'); 
var router = express.Router(); 

const QuizController = require("../controller/quizController");
const AdminAuthHelper = require("../helper/adminAuthHelper"); 


let validateToken = AdminAuthHelper.validateToken; 

router.get("/quiz/:id", validateToken, QuizController.getAllQuiz); 
router.post("/quiz", validateToken, QuizController.createQuiz); 
router.put("/quiz/:id", validateToken, QuizController.updateQuiz);



module.exports = router
