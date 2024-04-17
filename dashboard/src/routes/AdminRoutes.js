import { Route, Routes } from "react-router-dom";

import  DashboardLayout  from "../dashboard_Layout/DashboardLayout";
import  DashboardLandingPage  from "../pages/DashboardLandingPage";
import QuizPage from "../pages/QuizPage";

import RequireAuth from "../common/RequireAuth";

function AdminRoutesWrapper  () {
    return(
        <Routes>
            <Route path="/dashboard/" element={
                <RequireAuth>
                    <DashboardLayout/>
                </RequireAuth>}>
                <Route 
                    path="home" 
                    element={
                    <RequireAuth>
                        <DashboardLandingPage/>
                    </RequireAuth>
                }
                />
                <Route 
                    path="quiz"
                    element={
                        <RequireAuth>
                            <QuizPage />
                        </RequireAuth>
                    }
                />
            </Route>
        </Routes>
    )
   
}

export default AdminRoutesWrapper; 