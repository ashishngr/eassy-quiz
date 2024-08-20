import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizIntroForm from "./QuizIntroForm";
import QuestionForm from "./QuestionForm";
import StorageUtils from "../utils/storage_utils";
import { useNavigate } from 'react-router-dom';


import API from "../common/apis";

const steps = ["Quiz Details", "Question and Annswer"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""] },
  ]);
  const [quizId, setQuizId] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    timeOut: "",
    sharedEmails: "",
    isDraft: "isDraft",
    scope: "",
  });

  const navigate = useNavigate();


  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field.startsWith("option")) {
      const optionIndex = parseInt(field.replace("option", ""), 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""] }]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleQuizIntroInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      try {
        console.log("Quiz Intro form data", formData);
        const response = await API.createQuixMetaData(formData);
        console.log("response : ", response.data.payload.data._id);
        if (response.status === 200) {
          const Id = response.data.payload.data._id;
          console.log("---->", response.data.payload.data._id);
          setQuizId(Id);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          // Handle unexpected status codes
          console.error("Failed to create quiz metadata:", response);
          alert("Failed to create quiz metadata. Please try again.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const isSaveDisabled = questions.length < 3;

  const handleSaveQuiz = async () => {
    const payload = {
      questions: questions,
    };
    console.log("Questions--------------", questions);
    console.log("--Quiz--Id", quizId);
    const questionsData = payload.questions;
    const response = await API.addQuestions(payload, quizId);
    console.log("Response after creating quiz", response)
    if(response.status === 201){
      navigate("/admin/dashboard/quiz")
    }

    // Combine intro data and questions data and save the quiz
    // Log the quiz data to console
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <div className="flex flex-row-reverse gap-4 items-center p-10 justify-content-flex-end">
              <Button
                variant="contained"
                size="medium"
                disabled={isSaveDisabled}
                onClick={handleSaveQuiz}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
            </div>
            {questions.map((question, index) => (
              <QuestionForm
                key={index}
                index={index}
                question={question}
                questions={questions}
                onChange={handleInputChange}
                onDelete={handleDeleteQuestion}
                onSave={handleSaveQuiz} // Pass the save function to each QuestionForm
              />
            ))}
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <QuizIntroForm
              formData={formData}
              handleQuizIntroInputChange={handleQuizIntroInputChange}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Typography>
        </React.Fragment>
      )}
    </Box>
  );
}
