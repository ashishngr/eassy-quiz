import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuizIntroForm from './QuizIntroForm';
import QuestionForm from './QuestionForm';

const steps = ['Quiz Details', 'Question and Annswer'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set()); 
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', ''], correctOption: '' }]);
  const [quizIntroData, setQuizIntroData] = useState({});

  
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', ''), 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', ''], correctOption: '' }]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e, formData) => {
    e.preventDefault();
    let newSkipped = skipped;
    setQuizIntroData(formData);
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isSaveDisabled = questions.length < 3; 

  const handleSaveQuiz = () => {
    // Combine intro data and questions data and save the quiz
    const quizData = { ...quizIntroData,  questions: questions };
    console.log('Quiz Data:', quizData); // Log the quiz data to console
  };

  const handleSaveQuizIntro = (formData) => {
    setQuizIntroData(formData); // Save quiz intro data
  };

  const handleSaveQuestions = (questions) => {
    setQuestions(questions); // Save questions data
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps} >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          Last step 
        </Typography>
      </React.Fragment>
      ) : ( activeStep === 1 ? (
        <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <div className='flex flex-row-reverse gap-4 items-center p-10 justify-content-flex-end'>
              
            <Button variant="contained" size="medium" disabled={isSaveDisabled} onClick={() => handleSaveQuiz(quizIntroData, questions)}>
                Save
            </Button>
            <Button variant="contained" size="medium"  onClick={handleAddQuestion}>
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
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button 
            onClick={handleNext}
            disabled={activeStep === 1}
            >
              Next 
            </Button>
          </Box>
      </React.Fragment> ): (  
         <React.Fragment>
         <Typography sx={{ mt: 2, mb: 1}}>
          <QuizIntroForm onSave={handleSaveQuizIntro}/>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleNext} >
              Next
            </Button>
          </div>
         </Typography>
         {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button 
            onClick={handleNext} 
            disabled={activeStep === 1}
            >
              Next
            </Button>
          </Box> */}
       </React.Fragment>
      )
      )}
    </Box>
  );
}
