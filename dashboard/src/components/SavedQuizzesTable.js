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
import TablePagination from '@mui/material/TablePagination';
import ThreeDotDropdown from "./ThreeDotDropdown";
import API from "../common/apis";

const SavedQuizzesTable = () => { 

  const [quizData, setQuizData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizzes, setTotalQuizzes] = useState(0); 

  const getSaveQuizzes = async(currentPage, rowsPerPage) => {
    await API.getSaveQuizes({ page: currentPage, limit: rowsPerPage })
    .then((response)=>{
      console.log("response:::: saved quizzes", response.data.data.data)
      let data = response?.data.data.data; 
      setQuizData(data); 
      setTotalQuizzes(response?.data.data.totalQuizzes)
    })
    .catch((error) => {
      console.log("Error in fetching saved quizzes", error);
    });
  }

  useEffect(() => {
    getSaveQuizzes( page + 1 , rowsPerPage);
  }, [page, rowsPerPage]); 

  const handlePageChange = (event, newPage) => {
    event.preventDefault();
    console.log("new page", newPage)
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        My Saved Quizzes
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
          {quizData.length > 0 ? (
              quizData.map((quiz, index) => (
                <TableRow key={index}>
                  <TableCell>{quiz.id}</TableCell>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.creatorUserName}</TableCell>
                  <TableCell>
                  < ThreeDotDropdown quizId={quiz.id}/>
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
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalQuizzes}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      </TableContainer>
    </div>
  );
};

export default SavedQuizzesTable;
