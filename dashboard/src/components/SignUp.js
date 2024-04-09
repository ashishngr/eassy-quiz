import React, {useState, useEffect} from 'react'
// import  API  from "../common/apis";
import {useNavigate} from 'react-router-dom';
import validateFormData from '../utils/validateFormData';

// const API  = require("../common/apis"); 
import API from "../common/apis"


const SignUp = () => {
    const [first_Name, setFirst_Name] = useState(''); 
    const [last_Name, setLast_Name] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showSuccess, setShowSuccess] = useState(false); // State for success toast
    const [showError, setShowError] = useState(false); // State for error toast

    const navigate = useNavigate(); 


    const handleChange = (event) => {
        const {value , name} = event.target; 
        switch (name) {
            case 'first_Name': 
            setFirst_Name(value); 
            break; 
            case 'last_Name': 
            setLast_Name(value);
            break; 
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
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        console.log('Form submitted', {
            first_Name, 
            last_Name, 
            email, 
            password
        })
        const formData = {
            first_name : first_Name, 
            last_name : last_Name, 
            email : email, 
            password : password, 
        }
        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            // Display validation errors to the user (e.g., using a state variable)
            setShowError(true); // Set error state for displaying a toast
            return; // Prevent API call if form is invalid
        }
        try {
            // Send signup request
            const response = await API.signUpAdmin(formData);
        
            if (response.status === 200) {
              // Signup successful
              console.log('Signup successful!');
        
              // Clear form fields
              setFirst_Name('');
              setLast_Name('');
              setEmail('');
              setPassword('');
              navigate('/admin/dashboard/home') 
        
              // Optional: Show success message to user (using toast)
            //   setShowSuccess(true); // Set success state for displaying a toast
        
              // Optional: Redirect to login page after successful signup
              // navigate('/login'); // Use useNavigate hook after a delay or conditionally
            } else {
              // Handle signup error
              console.error('Signup failed:', response.data.message);
        
              // Optional: Show error message to user based on response status or data
            //   setShowError(true); // Set error state for displaying a toast with specific error message
            }
          } catch (error) {
            // Handle unexpected errors
            console.error('Unexpected error:', error);
        
            // Optional: Show generic error message to user (using toast)
            setShowError(true); // Set error state for displaying a toast with generic error message
          }
    }
  return (
   <div className='flex min-h-screen items-center justify-center'>
        <form className='w-full max-w-md px-8 py-6 bg-white rounded shadow-md border border-gray-300' onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Register for Free Account</h2>
            <div className='mb-4'>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    id="first_Name"
                    name="first_Name"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your first Name" 
                    value={first_Name}
                    onChange={handleChange}
                    required

                />
            </div>
            <div className='mb-4'>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your last name" 
                    value={last_Name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='mb-4'>
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
            <div className='mb-4'>
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="text"
                    id="email"
                    name="password"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password" 
                    value={password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
            type="submit"
            className="mb-4 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
               Create an account
            </button>
            <div className="text-center mt-4">
                <span className="text-sm text-gray-500">Already have an account? </span>
                <a href="/login" className="text-sm text-blue-500 hover:underline">Login here</a>
            </div>
        </form>
   </div>
  )
}

export default SignUp