import React from 'react'
import { Route, Routes } from "react-router-dom";

import LandingPage from '../pages/LandingPage'; 
import ErrorPage from '../pages/ErrorPage';
import VisitorUserDetailPage from '../pages/VisitorUserDetailPage';
import QuizPage from '../pages/QuizPage';
import SummaryPage from "../pages/SummaryPage"
import FeedbackPage from '../pages/FeedbackPage';

function VisitorRoutesWrapper(){
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path='/landing-page' element={<LandingPage />}/> 
            <Route path="/error" element={<ErrorPage />} />  {/* Error route */} 
            <Route path='/visitor-user-details/:quizId' element={<VisitorUserDetailPage />}/>
            <Route path='/play/quiz/:quizId' element={<QuizPage />} />
            <Route path='/summary/:id' element={<SummaryPage />}/>
            <Route path='/feedback/:participationId' element={<FeedbackPage />}/>

        </Routes>
    )
}
export default VisitorRoutesWrapper