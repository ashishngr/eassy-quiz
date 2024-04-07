import { Route, Routes } from "react-router-dom";

import  DashboardLayout  from "../dashboard_Layout/DashboardLayout";
import  DashboardLandingPage  from "../pages/DashboardLandingPage";

function AdminRoutesWrapper  () {
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route 
                path="home" 
                element={<DashboardLandingPage/>}
                />
            </Route>
        </Routes>
    )
   
}

export default AdminRoutesWrapper; 