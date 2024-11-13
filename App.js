import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './main';
import LoginForm from './LoginForm';
import './App.css'; // Assuming you have an App.css for general styles
import Signup from './Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="/sign" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
