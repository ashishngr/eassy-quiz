import React,{useEffect, useState} from 'react'
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HomePageQuizCard from '../components/HomePageQuizCard'; 
import PublicQuizTable from '../components/PublicQuizTable';
import SavedQuizzesTable from '../components/SavedQuizzesTable'; 
import LatesQuizTable from '../components/LatesQuizTable'; 
import {useNavigate} from 'react-router-dom';

import API from '../common/apis';

const Home = () => {
  const [quizCreated, setQuizCreated ] = useState(0); 
  const [quizzesParticipated, setQuizzesParticipated] = useState(0); 
  const [numUniqueParticipants, setNumUniqueParticipants] = useState(0); 
  const [quizes, setQuizes] = useState([])

  const navigate = useNavigate();  



  const fetchQuizSatat = async() =>{
    const response = await API.quizStat();
    setQuizCreated(response?.data.totalQuizzesCreated); 
    setNumUniqueParticipants(response?.data.numUniqueParticipants); 
    setQuizzesParticipated(response?.data.quizzesParticipated)
  }

  const fetchSavedQuizes = async() =>{
    const response = await API.getSaveQuizes(); 
    let data = response?.data 
    setQuizes(data)
  }


  useEffect(()=>{
    fetchQuizSatat()
  },[]);  

  useEffect(()=>{
    fetchSavedQuizes()
  },[])
  const handleCreateQuiz = (event) =>{
    event.preventDefault();
    navigate('/admin/dashboard/quiz/create')
  }
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row'>
          <HomePageQuizCard 
        heading={"Total Quizes"}
        nember={quizCreated}
        /> 
        <HomePageQuizCard 
        heading={"Quizzes Participated"}
        nember={quizzesParticipated}
        /> 
        <HomePageQuizCard 
        heading={"Users Participated"}
        nember={numUniqueParticipants}
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
        onClick={(event)=>handleCreateQuiz(event)}
        >
        Create Quiz
        </Button>
        </div>
        
      </div>
      {/* Two tables  - Public qiz table [most popular] || - Saved quiz [] */}
      <div className='flex flex-row mt-12 space-x-8'> 
        <PublicQuizTable />
        <SavedQuizzesTable quizzes={quizes.data}/>
      </div>
      <div>
        <Typography variant="h5" component="h2" gutterBottom >
            Top 10 latest quiz
        </Typography>
        <LatesQuizTable />
      </div>
    </div>
  )
}

export default Home