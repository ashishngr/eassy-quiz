import React from 'react'; 
import QuizLogo from "../assets/question.png"
import { MdHomeMax } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";




const SideBar = () => {
  return (
    <div className="w-60 h-full overflow-y-auto bg-white  text-lg font-sans subpixel-antialiased transition duration-300 ease-in-out flex flex-col items-center border-solid border-r-4 border-light-blue-500">
      <div className="flex flex-col items-center py-4 px-6">
        <img className="w-20 h-20 mb-2" src={QuizLogo} alt="Your Platform Logo" /> 
        <h1 className="text-lg font-medium text-center"> {/* Username with styling */}
          Ashish Nagar
        </h1>
      </div>
      <ul className="mt-3 space-y-2 ">
        <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-800 hover:text-white hover:rounded-lg">
          {<MdHomeMax className='mr-2'/>}
            <a href="/" className="flex items-center justify-center gap-2 text-sm" >
              Home
            </a>
        </li>
        <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-800 hover:text-white hover:rounded-lg">
          {<MdOutlineQuiz className='mr-2'/>}
          <a href="/admin/dashboard/quiz" className="flex items-center justify-center gap-2 text-sm ">
             Quiz
          </a>
        </li>
        <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-800 hover:text-white hover:rounded-lg ">
        {<TbBrandGoogleAnalytics className='mr-2'/>}
          <a href="/" className="flex items-center justify-center gap-2 text-sm ">
           Analytic
          </a>
        </li>
        <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-800 hover:text-white hover:rounded-lg">
        {<CgProfile className='mr-2'/> }
          <a href="/" className="flex items-center justify-center gap-2 text-sm ">
          Profile
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SideBar