import React, {useState} from 'react'; 

const QuizIntroForm = ({ formData , handleQuizIntroInputChange}) => {
  return (
    <form className='max-w-md mx-auto' >
        <div className='relative z-0 w-full mb-5 group'>
          <input 
          type="text" 
          name="title" 
          id="title" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" " r
          equired 
          value={formData?.title}
          onChange={handleQuizIntroInputChange}
          />
          <label for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quiz title</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input 
            type="text" 
            id="description" 
            name='description' 
            value={formData?.description}
            onChange={handleQuizIntroInputChange}
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
            placeholder=" " 
            required />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-5 group'>
                <input 
                type="text"  
                name="category" 
                id="category" 
                value={formData?.category}
                onChange={handleQuizIntroInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
                <input 
                type="email"  
                name="shared_email" 
                id="shared_email" 
                value={formData?.shared_email}
                onChange={handleQuizIntroInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="shared_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shared emails</label>
            </div>
            
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full mb-5 group'>
                    <label for='difficulty' className='block mb-2 text-sm font-medium text-gray-900'>Difficulty</label>
                    <select id='difficulty' name="difficulty" value={formData?.difficulty} onChange={handleQuizIntroInputChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        <option value="">Select Difficulty</option>
                        <option value="Eassy">Eassy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                  <label for='scope' className='block mb-2 text-sm font-medium text-gray-900'>Scope</label>
                  <select id='scope' name="scope" value={formData?.scope} onChange={handleQuizIntroInputChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'> 
                      <option value="">Select Scope</option>
                      <option  value="Public">Public</option>
                      <option  value="Private">Privete</option>
                      <option  value="Shared">Shared with others</option>
                  </select>
                </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input type="number"  name="total_time" id="total_time" value={formData?.total_time} onChange={handleQuizIntroInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="total_time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total Time</label>
          </div>
        </div>
    </form>
  )
}

export default QuizIntroForm; 