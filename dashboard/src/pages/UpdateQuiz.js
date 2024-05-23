import React from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const UpdateQuiz = () => {
  return (
    <div className='flex flex-col'>
      <form>
      <div>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        </div>
        <Divider />
        <div>
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        </div>
      </form>
    </div>
  )
}

export default UpdateQuiz