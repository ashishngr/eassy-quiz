import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import { IoCreate } from "react-icons/io5";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from 'react-router-dom';

import API from '../common/apis';

const columns = [
    { id: 'title', label: 'Title', minWidth: 200 },
    { id: 'creatorUserName', label: 'User Name', minWidth: 120 },
    {
      id: 'creatorUserEmail',
      label: 'User Email',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'questions',
      label: 'questions',
      minWidth: 80,
      align: 'right',
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'scope',
      label: 'Scope',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
    },
];
function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    

    

    

    const navigate = useNavigate();  

    // useEffect(()=>{
    //   API.getAllQuizes({
    //     page: 1, 
    //     limit: 10
    //   })
    //   .then((response)=>{
    //     console.log("response", response.data.data)

    //     const { quiz }  = response.data.data; 
    //     console.log("Quiz:", quiz)

    //     setQuizzes( quiz || []); 

    //   })
    //   .catch((error) => {
    //     console.error("Error fetching quizzes:", error);
    //   });
      
    // },[page, rowsPerPage]); 

    const fetchQuizzes = (currentPage, rowsPerPage) => {
      API.getAllQuizes({ page: currentPage, limit: rowsPerPage })
          .then((response) => {
            console.log("response", response)
            let myNewData = response.data.data || []; 
            console.log("MyNewData", myNewData)
            setQuizzes(myNewData || []);
            setTotalQuizzes(response.data.totalQuiz || 0);
          })              
          .catch((error) => {
              console.error("Error fetching quizzes:", error);
          });
  };

    
    useEffect(()=>{
      fetchQuizzes( page + 1 , rowsPerPage );
      console.log("total Quizzes par row :", quizzes) 
    },[page, rowsPerPage])

    const createQuiz = (event) =>{
        event.preventDefault(); 
        console.log("Go to create quiz page")
        navigate('/admin/dashboard/quiz/create')
    }

    const handlePageChange = (event, newPage) => {
      event.preventDefault();
      console.log("new page", newPage)
      setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

const renderCellContent = (columnId, value) => {
  if (columnId === 'questions') {
      return value && value.length > 0 ? "Yes" : "N/A";
  }
  return value;
};

  return (
    <div classNameName='flex flex-col p-10 '>
        {/* Create quiz button */}
        <div className='absolute top-18 right-10 flex items-center'>
            <Button variant="contained" size="large" onClick={(event)=>createQuiz(event)}>
                <span className='mr-2 '><IoCreate /></span> ADD QUIZ
            </Button>
        </div>
        {/* Table for quizzes */}
        <div className='p-12 mt-16'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            
            {quizzes.map((quiz) => {
                console.log("single quiz->", quiz)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={quiz._id}>
                    {columns.map((column) => {
                      const value = quiz[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <Button variant="contained" onClick={() => navigate(`/admin/dashboard/quiz/${quiz._id}`)}>Edit</Button>
                            ) : (
                              renderCellContent(column.id, value)
                            )
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
        </div>

    </div>
  )
}

export default Quiz