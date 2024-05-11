import React, {useState, useEffect} from 'react' ; 
import {useNavigate} from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";

import API from "../common/apis"
import validateEmailData from '../utils/validateEmailData';

const StorageUtils = require('../utils/storage_utils')


const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');  
    const [showError, setShowError] = useState(false); // State for error toast
    const [responseMessage, setResponseMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false); 

    const navigate = useNavigate(); 

    const handleChange = (event) => {
        const {value , name} = event.target; 
        switch(name){
            case 'email':
            setEmail(value);
            break;
            case 'password':
            setPassword(value);
            break;
            default: 
            break;  
        }
    }
    const handleSubmit = async(event) =>{
        event.preventDefault(); 

        const formData = {
            email : email, 
            password : password, 
        }
        const validationErrors = validateEmailData(formData); 
        if (validationErrors.length > 0) {
            return "Error in form data"; // Prevent API call if form is invalid
        }
        try {
            const response = await API.loginAdmin(formData); 
            
            let token = response.data.access_token
            if(response.status === 200){
                console.log("--", response)
                StorageUtils.setAPIToken(token)
                setEmail('');
                setPassword('');

                navigate('/admin/dashboard/home') 
            }else {
                // Handle signup error
                console.error('Sigin failed:', response.data.message);
                setResponseMessage(response.data.message); 
                setShowError(true)
            }
        } catch (error) {
            console.log(error)
            setResponseMessage('An unexpected error occurred. Please try again.'); 
            setShowError(true)
        }
    }
    useEffect(()=>{
        if(showError){
            const timeoutId = setTimeout(()=> setShowError(false), 5000) 
            return () => clearTimeout(timeoutId); 
        }
    }, [showError]);  
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div className='flex min-h-screen items-center justify-center'>
        <form className='w-full max-w-md px-8 py-6 bg-white rounded shadow-md border border-gray-300' onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <div 
              className='mb-4'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email" 
                    value={email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='mb-4 '>
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div class="relative flex items-center">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10"  placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    required
                    />
                    <button
                    type="button"
                    onClick={toggleShowPassword}
                    class="absolute inset-y-0 right-0 cursor-pointer px-3"  >
                    {showPassword ? <IoMdEye className="w-5 h-5 text-gray-500 hover:text-gray-700" /> : <FaRegEyeSlash className="w-5 h-5 text-gray-500 hover:text-gray-700" />}
                    </button>
                </div>
            </div>
            <button
            type="submit"
            className="mb-4 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
               Login 
            </button>
            <div className="text-center mt-4">
                <span className="text-sm text-gray-500">Don't have an account? </span>
                <a href="/signup" className="text-sm text-blue-500 hover:underline">Signup here</a>
            </div>
        </form>
        {showError && (
            <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md fixed top-0 right-0 mt-4 mr-4 z-50">
            <div className="flex items-center justify-center w-12 bg-red-500">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
            </div>
        
            <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                    <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">
                        {responseMessage}
                    </p>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Login