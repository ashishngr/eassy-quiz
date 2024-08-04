import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Button, Paper, SvgIcon } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import ErrorPage from './ErrorPage';

const LandingPage = () => { 

 const [isValidToken, setIsValidToken] = useState(true);
 const [quizId, setQuizId] = useState("");
  const location = useLocation();
  
  const navigate = useNavigate();   

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const validateToken = async () => {
      try {
        // Make a request to your backend to validate the token
        const response = await axios.get(`http://localhost:8080/api/v1/validate-token`, { params: { token } }); 
        console.log("Data", response.data.quizId)
        if (response.data.valid) {
          setIsValidToken(true);
          setQuizId(response.data.quizId); 
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValidToken(false);
      }
    };
    validateToken();
  }, [location.search]); 
  
  if (!isValidToken) {
    return <ErrorPage />;
  }
  const handleNext = (e) =>{
    e.preventDefault(); 
    navigate(`/quiz/visitor-user-details/${quizId}`); 

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Paper elevation={3} className="p-6 max-w-3xl w-full text-center bg-white shadow-lg">
        <Typography variant="h4" gutterBottom>
          Welcome to the Quiz Application <span>
          <SvgIcon
          component={QuizIcon}
          sx={{ fontSize: 60, mt: 2, color: 'primary.main' }}
        />
          </span>
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our quiz application! Here, you can test your knowledge and challenge yourself with various quizzes. Follow the instructions below to start the quiz and see how well you do. Have fun and good luck!
        </Typography> 
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          onClick={handleNext}
        >
          Next
        </Button>
       
        <div className="mt-6 text-left">
          <Typography variant="h6" gutterBottom>
            Instructions:
          </Typography>
          <ul className="list-disc list-inside">
            <li>Read each question carefully.</li>
            <li>Select the correct answer from the options provided.</li>
            <li>Click 'Submit' to see your results.</li>
            <li>Make sure to complete all questions before submitting.</li>
            <li>Enjoy the quiz and try to get a high score!</li>
          </ul>
        </div>
      </Paper>
    </div>
  )
}

export default LandingPage