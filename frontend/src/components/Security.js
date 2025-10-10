import React, { useState } from 'react';
import { 
  FiShield, 
  FiLock, 
  FiKey, 
  FiSmartphone, 
  FiEye, 
  FiEyeOff, 
  FiCheck, 
  FiX,
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
  FiTrash2
} from 'react-icons/fi';
import './Security.css';

const Security = ({ user, onClose }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  const recoveryCodes = [
    '1a2b-3c4d-5e6f',
    '7g8h-9i0j-1k2l',
    '3m4n-5o6p-7q8r',
    '9s0t-1u2v-3w4x',
    '5y6z-7a8b-9c0d',
    '1e2f-3g4h-5i6j',
    '7k8l-9m0n-1o2p',
    '3q4r-5s6t-7u8v'
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({ submit: 'Failed to update password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTwoFactorEnabled(!twoFactorEnabled);
      setSuccessMessage(
        !twoFactorEnabled 
          ? 'Two-factor authentication enabled successfully!' 
          : 'Two-factor authentication disabled successfully!'
      );
      
      if (!twoFactorEnabled) {
        setShowRecoveryCodes(true);
      }
    } catch (error) {
      setErrors({ twoFactor: 'Failed to update two-factor authentication. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    if (strength <= 2) return { level: 'weak', color: '#ef4444', text: 'Weak' };
    if (strength <= 3) return { level: 'medium', color: '#f59e0b', text: 'Medium' };
    return { level: 'strong', color: '#10b981', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  const securityChecklist = [
    {
      title: 'Strong Password',
      description: 'Your password meets security requirements',
      status: passwordData.newPassword ? passwordStrength.level !== 'weak' : true,
      action: 'Update password'
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      status: twoFactorEnabled,
      action: twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'
    },
    {
      title: 'Email Verification',
      description: 'Your email address is confirmed',
      status: user?.emailVerified || true,
      action: 'Verify email'
    },
    {
      title: 'Recent Login Activity',
      description: 'Monitor your account for suspicious activity',
      status: true,
      action: 'View activity'
    }
  ];

  return (
    <div className="security-overlay">
      <div className="security-container">
        <div className="security-header">
          <div className="header-content">
            <FiShield className="header-icon" />
            <div>
              <h2>Security Settings</h2>
              <p>Manage your account security and authentication preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button" type="button">
            <FiX />
          </button>
        </div>

        <div className="security-content">
          {successMessage && (
            <div className="success-message">
              <FiCheck className="success-icon" />
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="error-message">
              <FiAlertTriangle className="error-icon" />
              {errors.submit}
            </div>
          )}

          <div className="security-sections">
            {/* Security Overview */}
            <div className="security-section">
              <h3>
                <FiShield className="section-icon" />
                Security Overview
              </h3>
              
              <div className="security-score">
                <div className="score-header">
                  <h4>Security Score</h4>
                  <span className="score-value">85%</span>
                </div>
                <div className="score-bar">
                  <div className="score-progress" style={{ width: '85%' }} />
                </div>
                <p className="score-description">
                  Your account security is strong. Enable two-factor authentication to reach 100%.
                </p>
              </div>

              <div className="security-checklist">
                {securityChecklist.map((item, index) => (
                  <div key={index} className={`checklist-item ${item.status ? 'complete' : 'pending'}`}>
                    {item.status ? (
                      <FiCheck className="checklist-status" />
                    ) : (
                      <FiAlertTriangle className="checklist-status" />
                    )}
                    <div className="checklist-content">
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                    <button type="button" className="checklist-action">
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Password Settings */}
            <div className="security-section">
              <h3>
                <FiLock className="section-icon" />
                Password Settings
              </h3>
              
              <form onSubmit={handlePasswordUpdate} className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="password-input">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your current password"
                      className={errors.currentPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="password-toggle"
                    >
                      {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.currentPassword && <span className="field-error">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="password-input">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter a strong new password"
                      className={errors.newPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="password-toggle"
                    >
                      {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {passwordData.newPassword && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className={`strength-progress ${passwordStrength.level}`}
                          style={{ 
                            width: passwordStrength.level === 'weak' ? '33%' : 
                                   passwordStrength.level === 'medium' ? '66%' : '100%'
                          }}
                        />
                      </div>
                      <span className="strength-text" style={{ color: passwordStrength.color }}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  )}
                  {errors.newPassword && <span className="field-error">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="password-input">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm your new password"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="password-toggle"
                    >
                      {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="update-password-button" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="spinner" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiKey />
                      Update Password
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="security-section">
              <h3>
                <FiSmartphone className="section-icon" />
                Two-Factor Authentication
              </h3>
              
              <div className="two-factor-card">
                <div className="two-factor-info">
                  <div className="two-factor-header">
                    <h4>Authenticator App</h4>
                    <span className={`status-badge ${twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <p>
                    {twoFactorEnabled
                      ? 'Two-factor authentication is protecting your account. You\'ll need your authenticator app to sign in.'
                      : 'Add an extra layer of security by requiring a code from your authenticator app when signing in.'
                    }
                  </p>
                </div>
                
                <button 
                  onClick={handleTwoFactorToggle}
                  className={`two-factor-toggle ${twoFactorEnabled ? 'disable' : 'enable'}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner" />
                      {twoFactorEnabled ? 'Disabling...' : 'Enabling...'}
                    </>
                  ) : (
                    <>
                      {twoFactorEnabled ? <FiX /> : <FiShield />}
                      {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </>
                  )}
                </button>
              </div>

              {twoFactorEnabled && (
                <div className="recovery-section">
                  <h4>Recovery Codes</h4>
                  <p>
                    Save these recovery codes in a safe place. You can use them to access your account 
                    if you lose your authenticator device.
                  </p>
                  
                  <div className="recovery-actions">
                    <button 
                      onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                      className="show-codes-button"
                    >
                      <FiEye />
                      {showRecoveryCodes ? 'Hide Codes' : 'Show Codes'}
                    </button>
                    <button className="generate-codes-button">
                      <FiRefreshCw />
                      Generate New Codes
                    </button>
                  </div>

                  {showRecoveryCodes && (
                    <div className="recovery-codes">
                      <div className="codes-header">
                        <h5>Your Recovery Codes</h5>
                        <div className="codes-actions">
                          <button className="download-codes">
                            <FiDownload />
                            Download
                          </button>
                          <button className="copy-codes">
                            Copy All
                          </button>
                        </div>
                      </div>
                      <div className="codes-grid">
                        {recoveryCodes.map((code, index) => (
                          <div key={index} className="recovery-code">
                            {code}
                          </div>
                        ))}
                      </div>
                      <div className="codes-warning">
                        <FiAlertTriangle />
                        <span>Each code can only be used once. Store them securely!</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Login Activity */}
            <div className="security-section">
              <h3>
                <FiRefreshCw className="section-icon" />
                Recent Login Activity
              </h3>
              
              <div className="activity-list">
                <div className="activity-item current">
                  <div className="activity-info">
                    <h5>Current Session</h5>
                    <p>Chrome on Windows • {new Date().toLocaleString()}</p>
                    <span className="activity-location">Your current location</span>
                  </div>
                  <span className="activity-status current">Active</span>
                </div>
                
                <div className="activity-item">
                  <div className="activity-info">
                    <h5>Previous Login</h5>
                    <p>Chrome on Windows • 2 days ago</p>
                    <span className="activity-location">Your current location</span>
                  </div>
                  <span className="activity-status">Ended</span>
                </div>
                
                <div className="activity-item">
                  <div className="activity-info">
                    <h5>Mobile Login</h5>
                    <p>Safari on iPhone • 1 week ago</p>
                    <span className="activity-location">Your current location</span>
                  </div>
                  <span className="activity-status">Ended</span>
                </div>
              </div>
              
              <button className="view-all-activity">
                View All Login Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
