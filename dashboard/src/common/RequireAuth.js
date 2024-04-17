import React, {useState, useEffect} from 'react';
import {useLocation, Navigate,} from 'react-router-dom'

export default function RequireAuth({children}){
    const location = useLocation(); 
    const [token, setToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(()=>{
        const storedToken = localStorage.getItem("access_token");
        setToken(storedToken);
        setIsLoading(false);
    },[])
    if (isLoading) {
       
        // Display loading indicator while checking token
        return <div>Loading...</div>;
    }
    if(!token){
        console.log("No token")
        return <Navigate to="/login" state={{ from: location }} replace />;
    }else{
        console.log("token:", token)
    }

    return(
        <div>
            {children}
        </div>
    )
}