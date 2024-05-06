import { Route, Routes } from "react-router-dom";

import  DashboardLayout  from "../dashboard_Layout/DashboardLayout";
import  Home  from "../pages/Home";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import Quiz from "../pages/Quiz";
import UpdateQuiz from "../pages/UpdateQuiz";
import CreateQuiz from "../pages/CreateQuiz";

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
                        <Home/>
                    </RequireAuth>
                }
                />
                <Route 
                    path="quiz"
                    element={
                        <RequireAuth>
                            <Quiz />
                        </RequireAuth>
                    }
                />
                <Route 
                    path="quiz/create"
                    element={
                        <RequireAuth>
                            <CreateQuiz />
                        </RequireAuth>
                    }
                />
                <Route 
                    path="quiz/update"
                    element={
                        <RequireAuth>
                            <UpdateQuiz/>
                        </RequireAuth>
                    }
                />
                <Route 
                    path="analytics"
                    element={
                        <RequireAuth>
                            <Analytics />
                        </RequireAuth>
                    }
                />
                <Route 
                    path="profile"
                    element={
                        <RequireAuth>
                            <Profile/>
                        </RequireAuth>
                    }
                />
            </Route>

        </Routes>
    )
   
}

export default AdminRoutesWrapper; 