import React from 'react';
import { FaUserCircle, FaTachometerAlt, FaShieldAlt, FaRegBell } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ displayName = 'Member' }) => {
  const firstName = displayName.split(' ')[0];

  return (
    <nav className="dashboard-navbar" aria-label="Primary navigation">
      <div className="navbar-brand">
        <span className="brand-icon" aria-hidden="true">
          <FaShieldAlt />
        </span>
        <div className="brand-text">
          <span className="brand-title">Nebula</span>
          <span className="brand-subtitle">Account Center</span>
        </div>
      </div>

      <ul className="navbar-links">
        <li className="navbar-link active">
          <FaTachometerAlt aria-hidden="true" />
          <span>Overview</span>
        </li>
        <li className="navbar-link">
          <FaShieldAlt aria-hidden="true" />
          <span>Security</span>
        </li>
        <li className="navbar-link">
          <FaRegBell aria-hidden="true" />
          <span>Alerts</span>
        </li>
      </ul>

      <div className="navbar-profile" aria-label="Profile quick actions">
        <div className="profile-chip">
          <FaUserCircle aria-hidden="true" />
          <div className="profile-info">
            <span className="profile-label">Signed in</span>
            <span className="profile-name">{firstName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
