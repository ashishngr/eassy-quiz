import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem, Button} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 

import { QuizBasicDetails } from '../components/QuizBasicDetails'; 


const QuizDetailPage = () => {
    const [anchorEl, setAnchorEl] = useState(null); 
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
  return (
    <Box  sx={{ width: '100%', maxWidth: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Menu>
      </div>
    </div>
    {/* Quiz Basic Details */} 
    <div className='flex  justify-center'>
        <QuizBasicDetails 
        // quizId = {quizId}
        />
    </div>
    </Box>
  )
}

export default QuizDetailPage