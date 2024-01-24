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
import Hotels from './components/hotels';
import Restaurants from './components/restaurants';
import Places from './components/places';
import Flights from './components/flights';
import News from './components/News';

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
        {/* <Route path='/plan/:id' element={<Planning />} /> */}
        <Route path='/plan/hotels/:id' element={<Hotels />} />
        <Route path='/plan/restaurants/:id' element={<Restaurants />} />
        <Route path='/plan/places/:id' element={<Places />} />
        <Route path='/plan/flights/:id' element={<Flights />} />
        <Route path='/plan/news/' element={<News />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;