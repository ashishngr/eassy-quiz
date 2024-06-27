const mongoose = require('mongoose');
const {Quiz} = require('../models/quizSchema'); 
require('dotenv').config(); 

// Connect to your MongoDB database
// const uri = "mongodb+srv://eassyQuiz:admin@cluster0.r0httbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 "; 
// mongoose.set("strictQuery", false)

mongoose.connect("mongodb+srv://eassyQuiz:admin@cluster0.r0httbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB to run script'))
  .catch(err => console.error('Error connecting to MongoDB in script:', err));

async function addFieldsToExistingQuizzes() {
  console.log("-", Quiz)
  try {
    // Find all quizzes that do not have the new fields
    const quizzes = await Quiz.find({ 
      $or: [
        { participants: { $exists: false } },
        { savedBy: { $exists: false } }
      ] 
    });

    for (let quiz of quizzes) {
      if (!quiz.participants) {
        quiz.participants = [];
      }
      if (!quiz.savedBy) {
        quiz.savedBy = [];
      }
      await quiz.save();
    }

    console.log('Migration completed: New fields added to existing quizzes.');
  } catch (err) {
    console.error('Error during migration:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

addFieldsToExistingQuizzes();
