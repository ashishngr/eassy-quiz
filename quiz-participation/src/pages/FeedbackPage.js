import React, { useState } from 'react'
import { Box, Card, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button } from "@mui/material";
import axios from "axios"; 
import { useParams } from "react-router-dom";


const FeedbackPage = () => { 

const [rating, setRating] = useState(""); 

const {participationId} = useParams();
console.log("participationId", participationId)


const handleRatingChange = (event) => {
    setRating(event.target.value);
};
const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle the form submission logic here, e.g., send the feedback to the server
    console.log("Rating:", rating); 
    const response = await axios.post(`http://localhost:8080/api/v1/quiz-feedback/${participationId}`, {feedback : rating}); 
};

return (
<Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    }}
  >
    <Card
      sx={{
        width: "400px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Feedback
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        We value your feedback! Please let us know how you liked the quiz.
      </Typography>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          value={rating}
          onChange={handleRatingChange}
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel value="Good" control={<Radio />} label="Good" />
          <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Average" control={<Radio />} label="Average" />
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  </Box>
)
}

export default FeedbackPage