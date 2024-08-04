import React, {useState, useEffect} from 'react'
import { Paper, Typography, IconButton, Menu, MenuItem, Box, TextField, Grid, Button,  List, ListItem, ListItemText, CircularProgress, Snackbar} from '@mui/material'; 
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'copy-to-clipboard';  // Ensure this package is installed


import { useParams } from 'react-router-dom';


import API from '../common/apis' 

export const QuizBasicDetails = () => { 
  const [quizData, setQuizData] = useState({
    title: '',
    creatorEmail: '',
    creatorName: '',
    category: '',
    description: '',
    difficulty: '',
    scope: '',
    sharedEmail: '',
    status: '',
    timeOut: '',
    createdAt: '',
    questions: []
  });
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const  quizId  = useParams().id;
  
  console.log("Quiz ID:", quizId);
  
  const fetchQuizData = async() => {
    try {
      const response = await API.getSingleQuiz(quizId);
      console.log(response.data)
      const data = response.data.data; 
      console.log(data.title); 
      setQuizData({
          title: data.title,
          creatorName: data.creatorUserName,
          creatorEmail : data.creatorUserEmail,
          category: data.category,
          description: data.description,
          difficulty: data.difficulty,
          scope: data.scope,
          sharedEmail: data.sharedEmails.join(', '), 
          status: data.status,
          timeOut: data.timeOut,
          questions: data.questions || [], 
          createdAt : data.created_at,
      })
    } catch (error) {
      
    }
  }; 
  useEffect(()=>{
    fetchQuizData(); 
    console.log("Quiz Data", quizData)
  },[]); 
  const handleGenerateLink = async () => {
    setLoading(true);
    setLink("");
    try {
      // Simulate API call with a hardcoded link for debugging
      const response = await API.getPrivateQuizLink(quizId);
      console.log("Simulated API response:", response);

      if (response.status === 200) {
        setLink(response.data.link);
        setSnackbarMessage("Link generated successfully.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed to generate link. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error generating link:", error);
      setSnackbarMessage("Error generating link. Please try again.");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };
  const handleCopyClick = () => {
    if (link) {
      copy(link);
      setSnackbarMessage("Link copied to clipboard!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("No link available to copy.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };



  return (
    <Paper style={{ width: '80%', padding: '40px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Quiz Title:</strong> <span style={{ marginLeft: '8px' }}>{quizData.title}</span> 
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Creator Name:</strong> <span style={{ marginLeft: '8px' }}>{quizData.creatorName}</span> 
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Creator Email:</strong> <span style={{ marginLeft: '8px' }}>{quizData.creatorEmail}</span> 
        </Typography> 
        <Typography variant="subtitle1" gutterBottom>
          <strong>Status:</strong> <span style={{ marginLeft: '8px' }}>{quizData.status}</span> 
        </Typography> 
        <Typography variant="subtitle1" gutterBottom>
          <strong>Scope:</strong> <span style={{ marginLeft: '8px' }}>{quizData.scope}</span> 
        </Typography> 
        <Typography variant="subtitle1" gutterBottom>
          <strong>Difficulty Level:</strong> <span style={{ marginLeft: '8px' }}>{quizData.difficulty}</span> 
        </Typography>   
        <Typography variant="subtitle1" gutterBottom>
          <strong>Description:</strong> <span style={{ marginLeft: '8px' }}>{quizData.description}</span> 
        </Typography> 
        <Typography variant="subtitle1" gutterBottom>
          <strong>Shared With:</strong> <span style={{ marginLeft: '8px' }}>{quizData.sharedEmail}</span> 
        </Typography> 
        <Typography variant="subtitle1" gutterBottom>
          <strong>Created At:</strong> <span style={{ marginLeft: '8px' }}>{quizData.createdAt}</span> 
        </Typography>  
        <Typography variant="subtitle1" gutterBottom>
          <strong>Time Out:</strong> <span style={{ marginLeft: '8px' }}>{quizData.timeOut} Seconds</span> 
        </Typography> 
        <Divider />
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
              Questions
          </Typography>
              <List>

                {quizData.questions.map((question, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={question.text} />
                    </ListItem>
                    {index < quizData.questions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button variant="contained" color="primary" onClick={handleGenerateLink} disabled={loading}>
        Generate Link
        {loading && <CircularProgress size={24} />}
      </Button>
      {link && (
        <div className="flex items-start mt-4 p-4"> 
        <Typography variant="body1" className="mr-2">
            <strong>Quiz Link:</strong> 
          </Typography>
       
          
          <Typography variant="body2" className="break-words mb-2 max-w-3xl bg-gray-100 shadow-md rounded-md mt-4 p-4">
            {link}
          </Typography>
          <Button onClick={handleCopyClick} color="primary" startIcon={<FileCopyIcon />}>
            Copy
          </Button>
        
          
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
        </Box>
    </Paper>
  )
}
