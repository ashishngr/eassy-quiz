import React from 'react'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HomePageQuizCard from '../components/HomePageQuizCard'; 
import PublicQuizTable from '../components/PublicQuizTable';
import SavedQuizzesTable from '../components/SavedQuizzesTable';

const Home = () => {
  const quizzes = [
    { id: 1, title: 'Math Quiz', creator: 'John Doe' },
    { id: 2, title: 'Science Quiz', creator: 'Jane Smith' },
    { id: 3, title: 'History Quiz', creator: 'Michael Johnson' },
    { id: 4, title: 'Geography Quiz', creator: 'Emily Davis' },
    { id: 5, title: 'Literature Quiz', creator: 'Robert Brown' },
  ];
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row'>
          <HomePageQuizCard 
        heading={"Total Quizes"}
        nember={10}
        /> 
        <HomePageQuizCard 
        heading={"Quizzes Participated"}
        nember={10}
        /> 
        <HomePageQuizCard 
        heading={"Users Participated"}
        nember={10}
        /> 
        </div>
        <div>
          <Button
        variant="contained"
        color="primary"
        sx={{
          minWidth: 275,
          minHeight: 150,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginLeft: 2,
          padding: 2,
          textTransform: 'none',
        }}
        startIcon={<AddIcon sx={{ fontSize: '3rem' }} />}
        onClick={() => {
          // Add your navigation or functionality for creating a quiz here
          alert('Navigate to Create Quiz page');
        }}
        >
        Create Quiz
        </Button>
        </div>
        
      </div>
      {/* Two tables  - Public qiz table [most popular] || - Saved quiz [] */}
      <div className='flex flex-row mt-12 space-x-8'> 
        <PublicQuizTable />
        <SavedQuizzesTable quizzes={quizzes}/>
      </div>
    </div>
  )
}

export default Home