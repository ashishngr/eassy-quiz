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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const PublicQuizTable = () => {
  const [quizData, setQuizData] = useState([]);

  const getPublicQuizzes = async () => {
    await API.publicQuiz()
      .then((response) => {
        let data = response?.data.data || [];
        setQuizData(data);
        console.log("Public quiz", data)
      })
      .catch((error) => {
        console.log("Error in fetching public quizzes", error);
      });
  };
  useEffect(() => {
    getPublicQuizzes();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Public Quiz
      </Typography>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
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
                    <ThreeDotDropdown quizId={quiz.id}/>
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
  );
};

export default PublicQuizTable;
