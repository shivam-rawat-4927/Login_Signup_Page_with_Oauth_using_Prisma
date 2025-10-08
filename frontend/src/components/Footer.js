import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaGlobeAmericas } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const links = [
    {
      icon: <FaGithub aria-hidden="true" />,
      label: 'GitHub',
      href: 'https://github.com',
    },
    {
      icon: <FaLinkedinIn aria-hidden="true" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com',
    },
    {
      icon: <FaTwitter aria-hidden="true" />,
      label: 'Twitter',
      href: 'https://twitter.com',
    },
    {
      icon: <FaGlobeAmericas aria-hidden="true" />,
      label: 'Help Center',
      href: '#',
    },
  ];

  return (
    <footer className="dashboard-footer" aria-label="Global footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-pill">Nebula Account Center</span>
          <p className="footer-text">
            Seamlessly manage your identity, security preferences, and notifications across the Nebula platform.
          </p>
        </div>

        <div className="footer-links" aria-label="Helpful resources">
          {links.map(({ icon, label, href }) => (
            <a key={label} href={href} className="footer-link" target="_blank" rel="noreferrer noopener">
              <span className="footer-icon">{icon}</span>
              <span className="footer-label">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nebula Labs. All rights reserved.</span>
        <div className="footer-meta">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
