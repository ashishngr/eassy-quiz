import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, TextField, MenuItem, Grid, Button, Paper, List, ListItem, ListItemText, } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../common/apis';



const difficulty = ["Eassy", "Medium", "Hard"];
const scopes = ['Public', 'Private', 'IsShared'];
const statuses = ['Published', 'Draft', 'Deleted'];


const UpdateQuiz = () => { 

  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    category: '',
    description: '',
    difficulty: '',
    scope: '',
    sharedEmail: '',
    status: '',
    timeOut: '',
    questions: []
  });

  useEffect( ()=>{
    const fetchQuizData = async () => {
      try {
        const response = await API.getSingleQuiz(id);
        console.log(response.data)
        const data = response.data.data; 
        console.log(data.title)
        setQuizData({
          title: data.title,
          category: data.category,
          description: data.description,
          difficulty: data.difficulty,
          scope: data.scope,
          sharedEmail: data.sharedEmails.join(', '), // Assuming sharedEmails is an array
          status: data.status,
          timeOut: data.timeOut,
          questions: data.questions || [] // Ensure questions is an array
        });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  },[id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const handleAddQuestion = () => {
    navigate(`/admin/dashboard/quiz/${id}/add-question`);
  };
  const handleBack = () =>{
    navigate('/admin/dashboard/quiz')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f0f0',
        pt: 4,
        pb: 4,
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
        <Button onClick={handleBack}><span><KeyboardBackspaceIcon /></span>Back</Button>
       <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Typography variant="h4" component="h1">
            Edit Quiz
          </Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={quizData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                name="category"
                value={quizData.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={quizData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>    
              <TextField
                select
                fullWidth
                label="Difficulty"
                variant="outlined"
                name="difficulty"
                value={quizData.difficulty}
                onChange={handleChange}
              >
                {difficulty.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Scope"
                variant="outlined"
                name="scope"
                value={quizData.scope}
                onChange={handleChange}
              >
                {scopes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Shared Email"
                variant="outlined"
                name="sharedEmail"
                value={quizData.sharedEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                variant="outlined"
                name="status"
                value={quizData.status}
                onChange={handleChange}
              >
                {statuses.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Time Out"
                variant="outlined"
                type="number"
                name="timeOut"
                value={quizData.timeOut}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
        <Box mt={4}>
          {quizData.questions.length > 0 ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                sx={{ mb: 2 }}
              >
                Add Question
              </Button>
              <List>
                {quizData.questions.map((question, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={question.text} />
                    </ListItem>
                    {index < quizData.questions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </>
          ) : (
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                Add Question
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default UpdateQuiz