var express = require('express'); 
var router = express.Router(); 

const QuizController = require("../controller/quizController");
const AdminAuthHelper = require("../helper/adminAuthHelper"); 


let validateToken = AdminAuthHelper.validateToken; 

router.get("/quiz", validateToken, QuizController.getAllQuiz); 
router.post("/quiz",validateToken,   QuizController.createQuizMetaData); 
router.patch("/quiz/:quizId/questions", validateToken, QuizController.addQuestionsToQuiz)
router.put("/quiz/:id", validateToken, QuizController.updateQuiz);
router.get("/quiz/:id", validateToken, QuizController.singleQuiz); 
router.delete("/quiz/:id", validateToken, QuizController.deleteQuiz); 
router.post("/save", validateToken, QuizController.addQuizzesToLibrary);  
router.get("/saved", validateToken, QuizController.getSaveQuizes);
router.get("/public", validateToken, QuizController.getPublicQuizzes); 
router.get("/latesQuiz", validateToken, QuizController.latestTenQuizes); 
router.get("/stats", validateToken, QuizController.quizStats);
router.get("/quiz/:quizId/generate-link", validateToken, QuizController.generateQuizLink);

module.exports = router; 
