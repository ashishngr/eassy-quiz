import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, Snackbar, Alert} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayQuiz from "./PlayQuiz"; 

import API from '../common/apis';


const ThreeDotDropdown = ({quizId}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePlayClick = () => {
    // Handle play action
    console.log("Quiz ID in handlePlayClick:", quizId);
    handleClose();
  };

  const handleSave = async() =>{
    try {
      const response = await API.saveQuizToLibrary({ quizId });
      console.log("message response" ,response);
      const message = response?.data.message
      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      setSnackbarMessage("Failed to save quiz.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    handleClose();
  }

  const handleViewClick = () => {
    // Handle view action
    handleClose();
    navigate(`/admin/dashboard/quiz/${quizId}/details`);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="three-dot-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="three-dot-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSave}>
        <Button variant="contained" color="primary">
            Save
          </Button>
        </MenuItem>
        <MenuItem onClick={handleViewClick}>
          <Button variant="contained" color="primary">
            View
          </Button>
        </MenuItem>
      </Menu>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ThreeDotDropdown;
