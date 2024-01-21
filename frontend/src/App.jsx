import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Form from './pages/form';
import TravelPlansList from './pages/yourPlans';
import Planning from './pages/Planning';

function App() {
  const { user } = useAuthContext();
  const routesWithoutNavbar = ['/login', '/signup'];

  const showNavbar = !routesWithoutNavbar.includes(window.location.pathname);

  return (
    <Router>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={user ? <Form /> : <Navigate to="/signup" />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path='/yourPlans' element={user ? <TravelPlansList /> : <Navigate to="/signup" />} />
        <Route path='/plan/:id' element={<Planning />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
