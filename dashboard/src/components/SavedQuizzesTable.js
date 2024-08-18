import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";



const SavedQuizzesTable = ({ quizzes }) => {

// Check if quizzes is an array and if it has any quizzes
const hasQuizzes = Array.isArray(quizzes) && quizzes.length > 0;
  
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        My Library
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table sx={{ minWidth: 450 }} aria-label="saved quizzes table">
          <TableHead>
            <TableRow>
            <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Creator User Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {hasQuizzes ? (
              quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.id}</TableCell>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.creatorUserName}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary">
                      View
                    </Button>
                    <Button variant="outlined" color="secondary">
                      Play
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Display this row if there are no quizzes
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No saved quizzes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SavedQuizzesTable;
