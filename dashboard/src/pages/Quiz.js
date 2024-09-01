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
import CircularProgress from '@mui/material/CircularProgress'; 
import { Box,  FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';


import ThreeDotDropdown from '../components/ThreeDotDropdown';

import API from '../common/apis';

const columns = [
    { id: 'title', label: 'Title', minWidth: 200 },
    { id: '_id', label: 'Quiz Id', minWidth: 200 },
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
      id: 'edit',
      label: 'Edit',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
    },
];
const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Filter states
    const [sortBy, setSortBy] = useState('');
    const [quizId, setQuizId] = useState('');
    const [category, setCategory] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [scope, setScope] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();  

    

    const fetchQuizzes = (currentPage, rowsPerPage) => { 
      const queryParams = {
        page: currentPage,
        limit: rowsPerPage,
      }
      if (sortBy) queryParams.sortBy = sortBy;
      if (quizId) queryParams.quizId = quizId;
      if (userEmail) queryParams.userEmail = userEmail;
      if (scope) queryParams.scope = scope;
      if (status) queryParams.status = status; 

      console.log("Query Params", queryParams)
      
      setLoading(true);
      API.getAllQuizes(queryParams)
          .then((response) => {
            console.log("response", response)
            let myNewData = response.data.data || []; 
            console.log("MyNewData", myNewData)
            setQuizzes(myNewData || []);
            setTotalQuizzes(response.data.totalQuiz || 0);
            setLoading(false);
          })              
          .catch((error) => {
              console.error("Error fetching quizzes:", error);
              setLoading(false);
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
const handleAddQuestions = (e, quizId) => {
  e.preventDefault();
  console.log("Quiz id", quizId)
  navigate(`/admin/dashboard/quiz/${quizId}/add-question`);
};

const renderCellContent = (columnId, value, quizId) => {
  if (columnId === 'questions') {
      return value && value.length > 0 ? "Yes" : 
      (
        <Button variant="contained" color="primary" onClick={(e) => handleAddQuestions(e, quizId)}>
            Add
        </Button>
    )
  }else if (columnId === 'status') {
    switch (value) {
      case 'Published':
        return <Chip label="Published" color="success" />;
      case 'Draft':
        return <Chip label="Draft" style={{ backgroundColor: 'yellow' }} />;
      case 'Deleted':
        return <Chip label="Deleted" color="error" />;
      default:
        return value;
    }
  }else if (columnId === 'scope') {
    switch (value) {
        case 'Public':
            return <Chip label="Public" color="primary" />;
        case 'Private':
            return <Chip label="Private" color="default" />;
        case 'IsShared':
            return <Chip label="Shared" color="secondary" />;
        default:
            return value;
    }
  }
  return value;
};

  return (
    <div classNameName='flex flex-col p-10 '>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel size="small"  sx={{ minWidth: 150 }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 150 }}
        />
         <TextField
          label="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 150 }}
        /> 
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel size="small"  sx={{ minWidth: 150 }}>Scope</InputLabel>
          <Select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            label="Scope"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="IsShared">Shared</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel size="small"  sx={{ minWidth: 150 }}>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Deleted">Deleted</MenuItem>
          </Select>
        </FormControl>        
        <Button
          variant="contained"
          onClick={() => fetchQuizzes(page + 1, rowsPerPage)}
        >
          Apply Filters
        </Button>
      </Box>
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
                console.log("single quiz id->", quiz._id)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={quiz._id}>
                    {columns.map((column) => {
                      const value = quiz[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'edit' ? (
                            <Button variant="contained" onClick={() => navigate(`/admin/dashboard/quiz/${quiz._id}`)}>Edit</Button>
                            ) : column.id === 'action' ? (
                              <ThreeDotDropdown quizId={quiz._id}/>
                            ) : (
                              renderCellContent(column.id, value, quiz._id)
                            )
                          }
                          
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} 
              {loading ? (
                    // Show loader when data is being fetched
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : quizzes.length === 0 ? (
                    // Show "No Data Found" when there is no data
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No Data Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    quizzes.map((quiz) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={quiz._id}>
                        {columns.map((column) => {
                          const value = quiz[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'edit' ? (
                                <Button variant="contained" onClick={() => navigate(`/admin/dashboard/quiz/${quiz._id}`)}>Edit</Button>
                              ) : column.id === 'action' ? (
                                <ThreeDotDropdown quizId={quiz._id}/>
                              ) : (
                                renderCellContent(column.id, value, quiz._id)
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
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
        </div>

    </div>
  )
}

export default Quiz