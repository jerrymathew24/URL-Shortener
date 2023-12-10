import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UrlShorten from './pages/UrlShorten';
import Home from './pages/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shortUrls" element={<UrlShorten />} />
      </Routes>
    </Router>
  );
}

export default App;
