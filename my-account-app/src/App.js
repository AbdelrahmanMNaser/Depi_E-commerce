// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';  

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<h1>Welcome to Every</h1>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
