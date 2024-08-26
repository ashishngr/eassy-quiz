import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';



import AdminAuthRoutesWrapper from './routes/AdminAuthRoutes';
import AdminRoutesWrapper from './routes/AdminRoutes';
// const AdminRoutes = lazy(()=> import("./routes/AdminRoutes"))
// function App() {
//   const [loading, setLoading] = useState(true);  

//   const location = useLocation(); 

//   useEffect(() => {
//     // Simulating a fetch call to mimic data loading
//     setLoading(true);
//     const fetchData = async () => {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setLoading(false);
//     };

//     fetchData();
//   }, [location.pathname]);
//   if (loading) {
//     return <Loader />; // Display loader until data is fetched
//   }
//   return (
//     <>
//       {loading && <Loader />} {/* Show loader when loading */}
//       {!loading && (
//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/*" element={<AdminAuthRoutesWrapper />} />
//             <Route path="/admin/*" element={<AdminRoutesWrapper />} />
//           </Routes>
//         </Suspense>
//       )}
//     </>
//   );
// }
function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
function MainApp() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, [location.pathname]);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/*" element={<AdminAuthRoutesWrapper />} />
            <Route path="/admin/*" element={<AdminRoutesWrapper />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}


export default App;
