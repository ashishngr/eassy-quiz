import React from 'react'
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 

const DeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Delete Quiz
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this quiz? This action cannot be undone.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Quiz
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Not now
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteModal