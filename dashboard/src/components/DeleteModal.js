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
          border: '2px  #000',
          boxShadow: 20,
          p: 2,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'Center', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h5" component="h2">
            Delete Quiz
          </Typography>
        </Box>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this quiz? This action cannot be undone.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
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