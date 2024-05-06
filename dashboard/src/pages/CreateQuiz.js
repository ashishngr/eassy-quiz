import React from 'react'; 
import HorizontalLinearStepper from '../components/HorizontalLinearStepper';
const CreateQuiz = () => {
  return (
    <div className='flex flex-col p-10'>
      <div className='flex flex-col text-xl font-medium font-sans w-100% items-center'>
          <span>CREATE QUIZ</span>
      </div>
      <div className='mt-10 '>
        <HorizontalLinearStepper />
      </div>
    </div>
  )
}

export default CreateQuiz