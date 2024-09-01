import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';


import ThreeDotDropdown from "./ThreeDotDropdown";
import API from "../common/apis";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PublicQuizTable = () => {
  const [quizData, setQuizData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizzes, setTotalQuizzes] = useState(0);

  const getPublicQuizzes = async (currentPage, rowsPerPage) => {
    await API.publicQuiz({ page: currentPage, limit: rowsPerPage })
      .then((response) => {
        console.log("response::::", response.data.data)
        let data = response?.data.data.data || [];
        setQuizData(data);
        setTotalQuizzes(response?.data.data.totalQuizzes || [])
      })
      .catch((error) => {
        console.log("Error in fetching public quizzes", error);
      });
  };
  useEffect(() => {
    getPublicQuizzes( page + 1 , rowsPerPage);
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
    <Paper>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Public Quiz
        </Typography>
        <Table sx={{ minWidth: 600 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Creator</StyledTableCell>
              <StyledTableCell align="right">Participants</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizData.length > 0 ? (
              quizData.map((quiz, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {quiz.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {quiz.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {quiz.creatorUserName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {quiz.numberOfParticipants}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ThreeDotDropdown quizId={quiz.id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No public quiz is available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalQuizzes}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default PublicQuizTable;
