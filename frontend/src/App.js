import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(user);
        // clean url
        window.history.replaceState({}, document.title, window.location.pathname);
        setLoading(false);
        return;
      } catch (error) {
        console.error('OAuth callback error:', error);
      }
    }

    // Existing local storage check
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ?
              <Login onLogin={handleLogin} /> :
              <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ?
              <Signup onLogin={handleLogin} /> :
              <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ?
              <Dashboard user={user} onLogout={handleLogout} /> :
              <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
