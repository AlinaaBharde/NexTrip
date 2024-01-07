import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Form from './components/form';
import UserState from './contexts/userState';
import Signup from './components/signup';
import './App.css';


const App = () => {
  return (
    <UserState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserState>

  );
};

export default App;
