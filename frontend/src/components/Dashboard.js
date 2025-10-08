import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {user?.firstName || user?.username}! 👋</h2>
          <p>You have successfully logged in to your account.</p>
        </div>

        <div className="user-info-section">
          <h3>Profile Information</h3>
          <div className="user-info-card">
            <div className="info-item">
              <label>Full Name:</label>
              <span>
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : 'Not provided'
                }
              </span>
            </div>
            <div className="info-item">
              <label>Username:</label>
              <span>{user?.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>Member Since:</label>
              <span>
                {user?.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Unknown'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h3>Available Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>🔐 Secure Authentication</h4>
              <p>Your account is protected with JWT tokens and bcrypt password hashing.</p>
            </div>
            <div className="feature-card">
              <h4>📊 User Management</h4>
              <p>Complete user registration and login system with validation.</p>
            </div>
            <div className="feature-card">
              <h4>🗄️ Database Integration</h4>
              <p>Powered by Prisma ORM with MySQL database for reliable data storage.</p>
            </div>
            <div className="feature-card">
              <h4>⚡ Modern Stack</h4>
              <p>Built with React.js frontend and Express.js backend for optimal performance.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
