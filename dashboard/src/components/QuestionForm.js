import React, {useState} from 'react'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';  
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

// import QuizQuestion from './QuizQuestion'

const QuestionForm = ({ index, question, onChange, onDelete, questions }) => {
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onChange(index, name, value);
    };
    const handleOptionChange = (optionIndex, value) => {
        onChange(index, `option${optionIndex}`, value);
    };
  return (
    <form >
      <div className='max-w-2xl mx-auto mb-2'>
        <Accordion>
            <AccordionSummary 
             expandIcon={<ArrowDownwardIcon />}
             aria-controls={`panel${index + 1}-content`}
             id={`panel${index + 1}-header`} 
            >   <div>
                    <Typography>Q{index + 1}: Add Question</Typography>
                    <Typography>A: Add Answer</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='flex flex-row justify-between p-2'>
                    <Typography variant="h6" gutterBottom>Edit</Typography>
                    <Button disabled={questions.length === 1}>
                        <DeleteIcon onClick={() => onDelete(index)} aria-label="delete" />
                    </Button>
                    
                </div>
                <div>
                    <label for="questionText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question Text</label>
                    <input type="text" id="questionText" name='questionText' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                    placeholder=" " 
                    required 
                    value={question.text}
                    onChange={handleInputChange}
                    />
                </div>
                {question.options.map((option, optionIndex)=>{
                    return(
                        <div key={optionIndex}>
                            <label htmlFor={`option-${optionIndex}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wrong (Option) {optionIndex + 1}</label>
                            <input 
                                type="text" 
                                id={`option-${optionIndex}`} 
                                name={`option-${optionIndex}`} 
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                                placeholder=" " 
                                required  
                                value={option}
                                onChange={(e) => onChange(index, `option${optionIndex}`, e.target.value)}
                                label={`Option ${optionIndex + 1}`}
                            />
                        </div>
                    ) 
                })}
                <div>
                    <label for="correctOption" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct Answer</label>
                    <input 
                    type="text" 
                    id="correctOption" 
                    name='correctOption' 
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                    placeholder=" " 
                    required
                    value={question.correctOption}
                    onChange={handleInputChange}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    </div>
    </form>
    
  )
}

export default QuestionForm