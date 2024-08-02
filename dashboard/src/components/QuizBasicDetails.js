import React, {useState, useEffect} from 'react'
import { Paper, Typography, IconButton, Menu, MenuItem } from '@mui/material'; 
import { useParams } from 'react-router-dom';

import API from '../common/apis' 

export const QuizBasicDetails = () => { 
  const [quizData, setQuizData] = useState(); 

  const  quizId  = useParams().id;
  
  console.log("Quiz ID:", quizId);
  
  const fetchQuizData = () => {
    API.getQuizDetails(quizId)
    .then((response)=> {
      console.log("response quiz basic details: ", response.data)
    })
  }; 
  useEffect(()=>{
    fetchQuizData(); 
    console.log("Quiz Data")
  },[])


  return (
    <Paper style={{ width: '80%', padding: '16px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom>
          <strong>Quiz Title:</strong> <span style={{ marginLeft: '8px' }}>Title</span> 
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Creator Name:</strong> <span style={{ marginLeft: '8px' }}>Title</span> 
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Creator Email:</strong> <span style={{ marginLeft: '8px' }}>Title</span> 
        </Typography>
    </Paper>
  )
}
