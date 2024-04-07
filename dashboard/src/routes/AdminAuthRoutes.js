import {Route, Routes} from 'react-router-dom'; 
import AdminLogin from "../pages/AdminLogin"; 
import AdminSignUp from "../pages/AdminSignUp"; 




function AdminAuthRoutesWrapper(){
    return(
        <Routes>
            <Route path='/login' element={<AdminLogin />}/>
            <Route path='/signup' element={<AdminSignUp />} />
        </Routes>
    )
}

export default AdminAuthRoutesWrapper;