import React, {useState, useEffect} from 'react'
import { Box, Typography, Paper } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import Button from '@mui/material/Button';
import {  useNavigate } from "react-router-dom";

import axios from "axios"; 

const participationId = localStorage.getItem("participationId"); 
console.log("Id on summary page", participationId)
const SummaryPage = () => { 

  const [summaryData, setSummaryData] = useState()

  const navigate = useNavigate();

  const handleEndQuiz = () =>{
    localStorage.clear();
    navigate(`/quiz/feedback/${participationId}`)
  }
  const fetchQuizSummary = async() =>{
    console.log("quiz participation id", participationId)
    const response = await axios.get(`http://localhost:8080/api/v1/quiz/summary/${participationId}`); 
    setSummaryData(response?.data)
  }; 
  useEffect(()=>{
    fetchQuizSummary()
  },[])
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    }}
  >
    <Paper
      elevation={3}
      sx={{
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Summary <span><EmojiEventsIcon /></span>
      </Typography>

      <Typography variant="h6" gutterBottom>
        Hurray! You completed the quiz.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        Final Score: {summaryData?.finalScore}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Right Answers: {summaryData?.rightQuestions}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Wrong Answers: {summaryData?.wrongQuestions}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Skipped Questions: {summaryData?.skipedQuestions - 1} 
      </Typography>
      <Button variant="contained" size="large" color="error" onClick={()=> handleEndQuiz(summaryData?.quizParticipationId)}>
        End Quiz
      </Button>
    </Paper>
  </Box>
  )
}

export default SummaryPage