import React from 'react'; 
import QuizLogo from "../assets/question.png"
import { MdHomeMax } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";




const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto bg-blue-50 text-gray-700 transition duration-300 ease-in-out border-gray-700">
      <div className="flex flex-col items-center py-4 px-6">
        <img className="w-20 h-20 mb-2" src={QuizLogo} alt="Your Platform Logo" /> 
        <h1 className="text-lg font-medium text-center"> {/* Username with styling */}
          Ashish Nagar
        </h1>
      </div>
      <ul className="mt-6 space-y-2">
        <li className="py-2 px-4 hover:bg-blue-100 flex items-center">
          {<MdHomeMax className='mr-2'/>}
            <a href="/" className="flex items-center justify-center gap-2 text-md font-bold" >
              Home
            </a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-100 flex items-center">
          {<MdOutlineQuiz className='mr-2'/>}
          <a href="/" className="flex items-center justify-center gap-2 text-md font-bold">
             Quiz
          </a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-100 flex items-center">
        {<TbBrandGoogleAnalytics className='mr-2'/>}
          <a href="/" className="flex items-center justify-center gap-2 text-md font-bold">
           Analytic
          </a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-100 flex items-center">
        {<CgProfile className='mr-2'/> }
          <a href="/" className="flex items-center justify-center gap-2 text-md font-bold">
          Profile
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SideBar