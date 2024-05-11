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

  const handleNext = () => {
    let newSkipped = skipped;
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
              
            <Button variant="contained" size="medium" disabled={isSaveDisabled}>
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
         <Typography sx={{ mt: 2, mb: 1 }}>
           <QuizIntroForm />
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
       </React.Fragment>
      )
      )}
      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : ( 
        <React.Fragment>
        
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )} */}
    </Box>
  );
}
