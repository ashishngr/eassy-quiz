import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Button} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayQuiz from "./PlayQuiz"; 

const ThreeDotDropdown = ({quizId}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlayClick = () => {
    // Handle play action
    console.log("Quiz ID in handlePlayClick:", quizId);
    handleClose();
  };

  const handleViewClick = () => {
    // Handle view action
    handleClose();
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
        <MenuItem onClick={handlePlayClick}>
            <PlayQuiz quizId={quizId}/>
        </MenuItem>
        <MenuItem onClick={handleViewClick}>
          <Button variant="contained" color="primary">
            View
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ThreeDotDropdown;
