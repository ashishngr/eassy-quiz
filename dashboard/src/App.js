import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import AdminAuthRoutesWrapper from './routes/AdminAuthRoutes';
import AdminRoutesWrapper from './routes/AdminRoutes';
// const AdminRoutes = lazy(()=> import("./routes/AdminRoutes"))
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AdminAuthRoutesWrapper />}/> 
        <Route path='/admin/*' element={<AdminRoutesWrapper />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
