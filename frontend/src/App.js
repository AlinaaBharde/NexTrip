import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Form from './components/form';
import UserState from './contexts/userState';
import './App.css';

const App = () => {
  return (
    <UserState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path="/api/form" element={<Form />} />
        </Routes>
      </Router>
    </UserState>

  );
};

export default App;
