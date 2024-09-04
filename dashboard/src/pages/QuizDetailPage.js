import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {  useNavigate } from 'react-router-dom';
import DeleteModal from "../components/DeleteModal";

import { QuizBasicDetails } from "../components/QuizBasicDetails";

const QuizDetailPage = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBack = () =>{
    navigate('/admin/dashboard/quiz')
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteQuiz = () => {
    // Call your delete quiz API here
    // After successful deletion, close the modal
    handleCloseModal();
  };


  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button onClick={handleBack}><span><KeyboardBackspaceIcon /></span>Back</Button>
        </div>
        <Typography variant="h6" gutterBottom>
          Quiz Details
        </Typography>
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
            <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </Menu>
            <DeleteModal 
            open={isModalOpen} 
            handleClose={handleCloseModal} 
            handleDelete={handleDeleteQuiz} 
          />
        </div>
      </div>
      {/* Quiz Basic Details */}
      <div className="flex  justify-center">
        <QuizBasicDetails />
      </div>
    </Box>
  );
};

export default QuizDetailPage;
