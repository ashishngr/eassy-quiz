import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import API from '../common/apis'; 

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }; 
} 



const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Eclair', 262, 16.0, 24, 6.0),
];


const LatesQuizTable = () => {

  const [quizzes, setQuizzes] = useState([]); 


  useEffect(()=>{
    getQuizData()
  },[])
  
  const getQuizData = async() =>{
    await API.topTenQuiz().
    then(response =>{
      setQuizzes(response?.data.data); 
    })
    .catch((error)=> {
      console.log("Error in fetching latest 10 quizzes", error)
    })
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead sx={{ backgroundColor: '#1e88e5' }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Creator</TableCell>
            <TableCell align="right">Scope</TableCell>
            <TableCell align="right">Creted At</TableCell>
            <TableCell align="right">Participants</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz, index) => (
            <TableRow key={quiz.index}>
              <TableCell component="th" scope="row">
                {quiz.title}
              </TableCell>
              <TableCell align="right">{quiz.description}</TableCell>
              <TableCell align="right">{quiz.creatorUserName}</TableCell>

              <TableCell align="right">{quiz.scope}</TableCell>
              <TableCell align="right">{quiz.created_at}</TableCell>
              <TableCell align="right">{quiz.participants}</TableCell>
              <TableCell align="right">
              <Button variant="outlined" color="primary" >View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LatesQuizTable