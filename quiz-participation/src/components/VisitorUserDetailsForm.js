import React, { useState, useEffect } from 'react'; 
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import { useParams } from 'react-router-dom';

import {jwtDecode} from 'jwt-decode';

import axios from 'axios';


const VisitorUserDetailsForm = () => { 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dob: '',
        occupation: ''
    }); 
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [id, setId] = useState(null);
    const navigate = useNavigate(); 
    const location = useLocation();
    const { quizId } = useParams();
    console.log("QuizId:", quizId); 

    const quizCreatorId = localStorage.getItem("creatorUserId"); 
    console.log("quiz creator Id", quizCreatorId)

    useEffect(() => {
      // Corrected log statement
      setId(quizId);
    }, []); 
  
    console.log("QuizId after setting state:", id);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      }; 
      useEffect(()=>{
    },[])
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Proceed to next step 
        const response = await axios.post("http://localhost:8080/api/v1/save-visitor-user-details", {
          name : formData.name, 
          email : formData.email, 
          phoneNumber : formData.phoneNumber, 
          dob : formData.dob, 
          occupation : formData.occupation, 
          quizId : quizId, 
          quizCreatorId : quizCreatorId
           
        })
        console.log("Response of visitor user basic details", response.data) 
        
        if(response.status == 201){
         
          // Decode the token to extract visitorUserId
          const { token } = response.data;
          const decodedToken = jwtDecode(token);
          const visitorUserId = decodedToken.visitorUserId; 
          console.log("v.user.id", visitorUserId)
          // Save the token and visitorUserId to local storage
          localStorage.setItem('visitorToken', token);
          localStorage.setItem('visitorUserId', visitorUserId);
          navigate(`/quiz/play/quiz/${quizId}`); 
        }
      };
      
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Visitor User Details
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  </Container>
  )
}

export default VisitorUserDetailsForm