import React, { useState } from 'react'
import { Box, Card, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button } from "@mui/material";

const FeedbackPage = () => { 
const [feedback, setFeedback] = useState("");
const [rating, setRating] = useState(""); 

const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
};

const handleRatingChange = (event) => {
    setRating(event.target.value);
};
const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here, e.g., send the feedback to the server
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
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
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
          sx={{ marginBottom: "20px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  </Box>
)
}

export default FeedbackPage