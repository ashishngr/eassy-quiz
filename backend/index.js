const express = require('express'); 
const mongoose = require("mongoose"); 
const dotenv = require("dotenv").config()



const app = express(); 
const PORT = process.env.PORT || 8080 ; 

const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors");  

//Initialise MONOGODB connection 
console.log("Setup mongodb connection "); 
const uri = process.env.DATABASE
mongoose.set("strictQuery", false)

mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// TODO: Import all routes
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes"); 
const profileRoutes = require("./routes/profileRoutes");
const visitorRoutes = require("./routes/visitorRoutes")

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser()); 

// Routes
app.use("/api/v1", authRoutes); 
app.use("/api/v1", quizRoutes); 
app.use("/api/v1", profileRoutes); 
app.use("/api/v1", visitorRoutes); 



app.listen(PORT,()=> console.log("Server is running on port : " + PORT))
