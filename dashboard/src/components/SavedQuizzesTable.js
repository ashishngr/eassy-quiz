import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';


const SavedQuizzesTable = ({ quizzes }) => {
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom >
       My Library
      </Typography>   
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table sx={{ minWidth: 450 }} aria-label="saved quizzes table">
        <TableHead>
          <TableRow>
            <TableCell>Title of Quiz</TableCell>
            <TableCell>Creator of Quiz</TableCell>
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
