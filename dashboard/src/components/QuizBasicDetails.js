import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import copy from "copy-to-clipboard"; // Ensure this package is installed
import AnalyticsInformationCard from "./AnalyticsInformationCard";
import QuizFeedBackGraph from "./QuizFeedBackGraph";
import QuizCompletionGraph from "./QuizCompletionGraph";

import { useParams } from "react-router-dom";

import API from "../common/apis";

export const QuizBasicDetails = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    creatorEmail: "",
    creatorName: "",
    category: "",
    description: "",
    difficulty: "",
    scope: "",
    sharedEmail: "",
    status: "",
    timeOut: "",
    createdAt: "",
    questions: [],
  });
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [attendeeCount, setAttendeeCount] = useState(0); 
  const [attendeesRating, setAttendeeRating] = useState([]); 
  const [quizCompletionData, setQuizCompletionData] = useState([]); 

  const quizId = useParams().id;



  const fetchQuizData = async () => {
    try {
      const response = await API.getSingleQuiz(quizId);
      const data = response.data.data;
      setQuizData({
        title: data.title,
        creatorName: data.creatorUserName,
        creatorEmail: data.creatorUserEmail,
        category: data.category,
        description: data.description,
        difficulty: data.difficulty,
        scope: data.scope,
        sharedEmail: data.sharedEmails.join(", "),
        status: data.status,
        timeOut: data.timeOut,
        questions: data.questions || [],
        createdAt: data.created_at,
      });
    } catch (error) {}
  };
  const fetchQuizAttendeeCount = async () =>{
    const response = await API.getQuizAttendeeCount(quizId);
    if(response.status === 200){
      setAttendeeCount(response.data)
    }
  }
  const fetchAttendeesRating = async() => {
    try {
      const response = await API.getAttendeesQuizRating(quizId)
      if(response.status === 200){
        setAttendeeRating(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchQuizCompletionRation = async() =>{
    try {
      const response = await API.getQuizCompletionRatio(quizId); 
    if(response.status === 200){
      setQuizCompletionData(response.data)
    }
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(() => {
    fetchQuizData();
    fetchQuizAttendeeCount(); 
    fetchAttendeesRating();
    fetchQuizCompletionRation();
    
  }, []);
  const handleGenerateLink = async () => {
    setLoading(true);
    setLink("");
    try {
      // Simulate API call with a hardcoded link for debugging
      const response = await API.getPrivateQuizLink(quizId);
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
    <Paper
      style={{
        width: "80%",
        padding: "40px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        <strong>Quiz Title:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.title}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Creator Name:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.creatorName}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Creator Email:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.creatorEmail}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Status:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.status}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Scope:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.scope}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Difficulty Level:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.difficulty}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Description:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.description}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Shared With:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.sharedEmail}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Created At:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.createdAt}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Time Out:</strong>{" "}
        <span style={{ marginLeft: "8px" }}>{quizData.timeOut} Seconds</span>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateLink}
        disabled={loading}
      >
        Generate Link
        {loading && <CircularProgress size={24} />}
      </Button>
      {link && (
        <div className="flex items-start mt-4 p-4">
          <Typography variant="body1" className="mr-2">
            <strong>Quiz Link:</strong>
          </Typography>
          <Typography
            variant="body2"
            className="break-words mb-2 max-w-3xl bg-gray-100 shadow-md rounded-md mt-4 p-4"
          >
            {link}
          </Typography>
          <Button
            onClick={handleCopyClick}
            color="primary"
            startIcon={<FileCopyIcon />}
          >
            Copy
          </Button>
        </div>
      )}
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
          {/* Quiz Analytics */}
          <div className="mt-8">
            <Divider />
            <Typography variant="h4">
                Quiz Analytics
            </Typography>
          </div>
          <div className='flex flex-row justify-center m-3 '>
                <AnalyticsInformationCard heading={"Attendee Count"} data={attendeeCount}/> 
          </div>
          <div style={{ display: 'flex', flexDirection: 'row',  padding:'10' }}>
              <QuizFeedBackGraph ratingData={attendeesRating}/>
              <QuizCompletionGraph data={quizCompletionData}/>
          </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Paper>
  );
};
