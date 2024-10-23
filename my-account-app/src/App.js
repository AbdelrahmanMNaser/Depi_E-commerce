import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerAccount from './pages/CustomerAccount';
import AdminAccount from './pages/AdminAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/customer-account" element={<CustomerAccount />} />
          <Route path="/admin-account" element={<AdminAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;