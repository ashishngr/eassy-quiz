import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

import API from '../common/apis';

const SavedQuizzesTable = ({ quizzes }) => { 
  const [quiz, setQuiz] = useState([]); 

  const getSavedQuizzes = async() =>{
    await API.getSavedQuizzes()
    .then(response => {
      let data = response?.data.data || [] ; 
      console.log("data save", data)
    })
  }
  useEffect(()=>{
    getSavedQuizzes()
  },[])
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom >
       My Library
      </Typography>   
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table sx={{ minWidth: 450 }} aria-label="saved quizzes table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.creator}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" >View</Button>
                <Button variant="outlined" color="secondary" >Play</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

  );
};

export default SavedQuizzesTable;
