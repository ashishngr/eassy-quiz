import React, {useState, useEffect} from 'react'
import { Box, Typography, Paper } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 
import Button from '@mui/material/Button';
import {  useNavigate } from "react-router-dom";

const SummaryPage = () => { 
  const navigate = useNavigate();
  const handleEndQuiz = () =>{
    const id = localStorage.getItem("visitorUserId"); 
    navigate(`/quiz/feedback/${id}`)
  }
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
        Final Score: 3
      </Typography>

      <Typography variant="body1" gutterBottom>
        Right Answers: 3
      </Typography>

      <Typography variant="body1" gutterBottom>
        Wrong Answers: 1
      </Typography>

      <Typography variant="body1" gutterBottom>
        Skipped Questions: 1
      </Typography>
      <Button variant="contained" size="large" color="error" onClick={handleEndQuiz}>
        End Quiz
      </Button>
    </Paper>
  </Box>
  )
}

export default SummaryPage