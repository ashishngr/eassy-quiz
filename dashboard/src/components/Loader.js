import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'; 

const Loader = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
        width: '100vw',  // Full width of the viewport
      }}>
    <CircularProgress />
    </Box>
  )
}

export default Loader