import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
// import Form from './pages/form';
import UserState from './contexts/userState';
// import Signup from './pages/signup';
import './App.css';
// import TravelPlansList from './pages/yourPlans';
// import SpecificPlan from './pages/specificPlan';


const App = () => {
  return (
    <UserState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          {/* <Route exact path="/form" element={<Form />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/yourPlans" element={<TravelPlansList />} />
          <Route exact path="/plan/:id" element={<SpecificPlan />} /> */}
        </Routes>
      </Router>
    </UserState>

  );
};

export default App;