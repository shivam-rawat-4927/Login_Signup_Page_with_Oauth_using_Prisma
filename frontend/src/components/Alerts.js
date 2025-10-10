import React, { useState } from 'react';
import { 
  FiBell, 
  FiMail, 
  FiSmartphone, 
  FiGlobe, 
  FiShield, 
  FiUser, 
  FiX,
  FiCheck,
  FiAlertTriangle,
  FiSettings,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';
import './Alerts.css';

const Alerts = ({ user, onClose }) => {
  const [preferences, setPreferences] = useState({
    // Security Alerts
    loginAlerts: true,
    passwordChange: true,
    accountChanges: true,
    suspiciousActivity: true,
    
    // Account Activity
    profileUpdates: false,
    newConnections: true,
    dataExport: true,
    accountDeletion: true,
    
    // Communication
    emailUpdates: true,
    productNews: false,
    weeklyDigest: true,
    maintenanceNotices: true,
    
    // Mobile/Push
    pushNotifications: true,
    mobileAlerts: false,
    offlineSync: true,
    
    // Delivery Methods
    emailDelivery: true,
    smsDelivery: false,
    browserNotifications: true,
    
    // Frequency
    immediate: true,
    daily: false,
    weekly: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('security');

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Alert preferences saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const alertCategories = [
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: FiShield,
      description: 'Security-related notifications and privacy alerts',
      preferences: [
        {
          key: 'loginAlerts',
          title: 'Login Notifications',
          description: 'Get notified when someone logs into your account',
          critical: true
        },
        {
          key: 'passwordChange',
          title: 'Password Changes',
          description: 'Alerts when your password is changed',
          critical: true
        },
        {
          key: 'accountChanges',
          title: 'Account Modifications',
          description: 'Notifications for profile and account changes',
          critical: true
        },
        {
          key: 'suspiciousActivity',
          title: 'Suspicious Activity',
          description: 'Alerts for unusual account activity',
          critical: true
        }
      ]
    },
    {
      id: 'activity',
      title: 'Account Activity',
      icon: FiUser,
      description: 'Updates about your account activity and changes',
      preferences: [
        {
          key: 'profileUpdates',
          title: 'Profile Updates',
          description: 'Confirmation when profile information is updated',
          critical: false
        },
        {
          key: 'newConnections',
          title: 'New Connections',
          description: 'Notifications when new apps are connected',
          critical: false
        },
        {
          key: 'dataExport',
          title: 'Data Export',
          description: 'Updates on data export requests and completion',
          critical: false
        },
        {
          key: 'accountDeletion',
          title: 'Account Deletion',
          description: 'Warnings before account deletion processes',
          critical: true
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: FiMail,
      description: 'Product updates and communication preferences',
      preferences: [
        {
          key: 'emailUpdates',
          title: 'Email Updates',
          description: 'Important updates delivered via email',
          critical: false
        },
        {
          key: 'productNews',
          title: 'Product News',
          description: 'Updates about new features and improvements',
          critical: false
        },
        {
          key: 'weeklyDigest',
          title: 'Weekly Digest',
          description: 'Summary of your account activity each week',
          critical: false
        },
        {
          key: 'maintenanceNotices',
          title: 'Maintenance Notices',
          description: 'Advance notice of scheduled maintenance',
          critical: false
        }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile & Push',
      icon: FiSmartphone,
      description: 'Mobile app and push notification settings',
      preferences: [
        {
          key: 'pushNotifications',
          title: 'Push Notifications',
          description: 'Real-time notifications on your devices',
          critical: false
        },
        {
          key: 'mobileAlerts',
          title: 'Mobile Alerts',
          description: 'SMS alerts for critical account events',
          critical: false
        },
        {
          key: 'offlineSync',
          title: 'Offline Sync',
          description: 'Sync notifications when you come back online',
          critical: false
        }
      ]
    }
  ];

  const deliveryMethods = [
    {
      key: 'emailDelivery',
      title: 'Email',
      description: 'Receive alerts via email',
      icon: FiMail
    },
    {
      key: 'smsDelivery',
      title: 'SMS',
      description: 'Receive critical alerts via SMS',
      icon: FiSmartphone
    },
    {
      key: 'browserNotifications',
      title: 'Browser',
      description: 'Show notifications in your browser',
      icon: FiGlobe
    }
  ];

  const frequencyOptions = [
    {
      key: 'immediate',
      title: 'Immediate',
      description: 'Get notified right away'
    },
    {
      key: 'daily',
      title: 'Daily Digest',
      description: 'Once per day summary'
    },
    {
      key: 'weekly',
      title: 'Weekly Summary',
      description: 'Weekly summary of activities'
    }
  ];

  const currentCategory = alertCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="alerts-overlay">
      <div className="alerts-container">
        <div className="alerts-header">
          <div className="header-content">
            <FiBell className="header-icon" />
            <div>
              <h2>Alert Preferences</h2>
              <p>Customize your notification settings and alert preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="close-button" type="button">
            <FiX />
          </button>
        </div>

        <div className="alerts-content">
          {successMessage && (
            <div className="success-message">
              <FiCheck className="success-icon" />
              {successMessage}
            </div>
          )}

          <div className="alerts-layout">
            {/* Category Navigation */}
            <div className="category-nav">
              <h3>Alert Categories</h3>
              <div className="category-list">
                {alertCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    <category.icon className="category-icon" />
                    <div className="category-info">
                      <h4>{category.title}</h4>
                      <p>{category.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Alert Settings */}
            <div className="alert-settings">
              <div className="settings-header">
                <currentCategory.icon className="settings-icon" />
                <div>
                  <h3>{currentCategory.title}</h3>
                  <p>{currentCategory.description}</p>
                </div>
              </div>

              <div className="preferences-list">
                {currentCategory.preferences.map(pref => (
                  <div key={pref.key} className="preference-item">
                    <div className="preference-content">
                      <div className="preference-header">
                        <h4>{pref.title}</h4>
                        {pref.critical && (
                          <span className="critical-badge">
                            <FiShield />
                            Critical
                          </span>
                        )}
                      </div>
                      <p>{pref.description}</p>
                    </div>
                    
                    <div className="preference-controls">
                      <button
                        onClick={() => handlePreferenceChange(pref.key)}
                        className={`preference-toggle ${preferences[pref.key] ? 'enabled' : 'disabled'}`}
                        disabled={pref.critical && preferences[pref.key]}
                      >
                        <div className="toggle-track">
                          <div className="toggle-thumb" />
                        </div>
                        <span className="toggle-label">
                          {preferences[pref.key] ? 'Enabled' : 'Disabled'}
                        </span>
                      </button>
                      
                      {preferences[pref.key] && (
                        <button className="preference-config">
                          <FiSettings />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Methods */}
          <div className="delivery-section">
            <h3>
              <FiGlobe className="section-icon" />
              Delivery Methods
            </h3>
            <p>Choose how you want to receive your alerts and notifications</p>
            
            <div className="delivery-grid">
              {deliveryMethods.map(method => (
                <div key={method.key} className="delivery-card">
                  <div className="delivery-header">
                    <method.icon className="delivery-icon" />
                    <div>
                      <h4>{method.title}</h4>
                      <p>{method.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePreferenceChange(method.key)}
                    className={`delivery-toggle ${preferences[method.key] ? 'enabled' : 'disabled'}`}
                  >
                    {preferences[method.key] ? <FiVolume2 /> : <FiVolumeX />}
                    {preferences[method.key] ? 'On' : 'Off'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Settings */}
          <div className="frequency-section">
            <h3>
              <FiBell className="section-icon" />
              Notification Frequency
            </h3>
            <p>Control how often you receive non-critical notifications</p>
            
            <div className="frequency-options">
              {frequencyOptions.map(option => (
                <label key={option.key} className="frequency-option">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.key}
                    checked={preferences[option.key]}
                    onChange={() => {
                      // Reset all frequency options
                      setPreferences(prev => ({
                        ...prev,
                        immediate: false,
                        daily: false,
                        weekly: false,
                        [option.key]: true
                      }));
                    }}
                  />
                  <div className="radio-custom" />
                  <div className="frequency-info">
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="recent-alerts-section">
            <h3>
              <FiAlertTriangle className="section-icon" />
              Recent Alerts
            </h3>
            
            <div className="recent-alerts-list">
              <div className="alert-item security">
                <FiShield className="alert-icon" />
                <div className="alert-content">
                  <h4>New login detected</h4>
                  <p>Someone signed in to your account from Chrome on Windows</p>
                  <span className="alert-time">2 hours ago</span>
                </div>
                <span className="alert-status read">Read</span>
              </div>
              
              <div className="alert-item activity">
                <FiUser className="alert-icon" />
                <div className="alert-content">
                  <h4>Profile updated</h4>
                  <p>Your profile information was successfully updated</p>
                  <span className="alert-time">1 day ago</span>
                </div>
                <span className="alert-status unread">Unread</span>
              </div>
              
              <div className="alert-item communication">
                <FiMail className="alert-icon" />
                <div className="alert-content">
                  <h4>Weekly digest available</h4>
                  <p>Your weekly account activity summary is ready</p>
                  <span className="alert-time">3 days ago</span>
                </div>
                <span className="alert-status read">Read</span>
              </div>
            </div>
            
            <button className="view-all-alerts">
              View All Alert History
            </button>
          </div>

          {/* Save Button */}
          <div className="alerts-actions">
            <button 
              onClick={handleSavePreferences}
              className="save-preferences-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Saving Preferences...
                </>
              ) : (
                <>
                  <FiCheck />
                  Save Preferences
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
