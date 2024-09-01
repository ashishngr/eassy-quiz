import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import HomePageQuizCard from "../components/HomePageQuizCard";
import PublicQuizTable from "../components/PublicQuizTable";
import SavedQuizzesTable from "../components/SavedQuizzesTable";
import LatesQuizTable from "../components/LatesQuizTable";
import { useNavigate } from "react-router-dom";

import API from "../common/apis";

const Home = () => {
  const [quizCreated, setQuizCreated] = useState(0);
  const [publicQuiz, setPublicQuiz] = useState(0); 
  const [privateQuiz, setPrivateQuiz] = useState(0); 
  const [sharedQuiz, setSharedQuiz] = useState(0); 




  const navigate = useNavigate();

  const fetchQuizSatat = async () => {
    const response = await API.quizStat();
    console.log("Quiz Response", response)
    setQuizCreated(response?.data.totalQuizzesCreated);
    setPrivateQuiz(response?.data.PrivateQuizzes); 
    setPublicQuiz(response?.data.publicQuizzes); 
    setSharedQuiz(response?.data.sharedQuizzes); 
  };


  useEffect(() => {
    fetchQuizSatat();
  }, []);
  const handleCreateQuiz = (event) => {
    event.preventDefault();
    navigate("/admin/dashboard/quiz/create");
  };
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row flex-wrap">
          <HomePageQuizCard heading={"Total Quizes"} nember={quizCreated} />
          <HomePageQuizCard
            heading={"Public Quiz"}
            nember={publicQuiz}
          />
          <HomePageQuizCard
            heading={"Private Quiz"}
            nember={privateQuiz}
          />
          <HomePageQuizCard
            heading={"Shared Quiz"}
            nember={sharedQuiz}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 275,
              minHeight: 150,
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginLeft: 2,
              padding: 2,
              textTransform: "none",
            }}
            startIcon={<AddIcon sx={{ fontSize: "3rem" }} />}
            onClick={(event) => handleCreateQuiz(event)}
          >
            Create Quiz
          </Button>
        </div>
      </div>
      {/* Two tables  - Public qiz table [most popular] || - Saved quiz [] */}
      <div className="flex flex-row mt-12 space-x-8">
        <PublicQuizTable />
        <SavedQuizzesTable />
      </div>
      <div>
        <Typography variant="h5" component="h2" gutterBottom>
          Top 10 latest quiz
        </Typography>
        <LatesQuizTable />
      </div>
    </div>
  );
};

export default Home;
