import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const QuizQuestion = () => { 

  return (
    <div className='max-w-md mx-auto'>
        <Accordion>
            
            <AccordionSummary 
             expandIcon={<ArrowDownwardIcon />}
             aria-controls="panel1-content"
             id="panel1-header"
            >
                <Typography>Enter the Question and Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default QuizQuestion