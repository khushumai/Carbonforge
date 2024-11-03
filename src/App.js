import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

// Import your component pages
import Landing from './components/landing.js';
import Projects from './components/projects.js';
import Bids from './components/bids.js';
import About from './components/about.js';
import Dashboard from './components/dashboard.js';
import SignOut from './components/signout.js';
import UserDash from './components/userdash.js';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/user" element={<UserDash />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
