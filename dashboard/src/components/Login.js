import React, {useState} from 'react' ; 
import {useNavigate} from 'react-router-dom';

import API from "../common/apis"
import validateEmailData from '../utils/validateEmailData';

const StorageUtils = require('../utils/storage_utils')


const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');  

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
            // Display validation errors to the user (e.g., using a state variable)
            // setShowError(true); // Set error state for displaying a toast
            return "Error in form data"; // Prevent API call if form is invalid
        }
        try {
            const response = await API.loginAdmin(formData)
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
            }
        } catch (error) {
            console.log(error)
        }
    }
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
               Login 
            </button>
            <div className="text-center mt-4">
                <span className="text-sm text-gray-500">Don't have an account? </span>
                <a href="/login" className="text-sm text-blue-500 hover:underline">Signup here</a>
            </div>
        </form>
    </div>
  )
}

export default Login