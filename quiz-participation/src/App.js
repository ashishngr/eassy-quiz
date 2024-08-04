import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import VisitorRoutesWrapper from './routes/VisitorRoutesWrapper';


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/quiz/*' element={<VisitorRoutesWrapper />}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
