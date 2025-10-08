import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const fullName = user?.firstName || user?.lastName
    ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
    : '';
  const displayName = fullName || user?.username || 'Valued Member';
  const username = user?.username ? `@${user.username}` : 'Username not set';
  const email = user?.email || 'Email not added';
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';

  const highlightCards = [
    {
      icon: '🗓️',
      title: 'Member since',
      value: memberSince,
      hint: 'Thanks for being with us!',
    },
    {
      icon: '🛡️',
      title: 'Security',
      value: email !== 'Email not added' ? 'Email confirmed' : 'Complete setup',
      hint: 'Keep your account protected.',
    },
    {
      icon: '⚙️',
      title: 'Login method',
      value: user?.authProvider ? user.authProvider.replace(/_/g, ' ') : 'Email & password',
      hint: 'Connect other services for easy sign-in.',
    },
  ];

  const checklistItems = [
    {
      label: 'Email on file',
      description:
        email !== 'Email not added'
          ? 'Primary email address is ready to receive updates.'
          : 'Add an email address to stay informed.',
      complete: email !== 'Email not added',
    },
    {
      label: 'Secure password',
      description: 'Passwords are encrypted with industry best practices.',
      complete: true,
    },
    {
      label: 'Two-factor authentication',
      description: 'Enable 2FA to add another layer of protection.',
      complete: false,
    },
  ];

  const activityTimeline = [
    {
      icon: '🎉',
      title: 'Account created',
      description:
        user?.createdAt
          ? `Joined the community on ${memberSince}.`
          : 'Complete your profile details to personalize your dashboard.',
    },
    {
      icon: '🔑',
      title: 'Latest session',
      description: `Logged in on ${new Date().toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })}.`,
    },
    {
      icon: '💡',
      title: 'Next steps',
      description: 'Explore new features and connect your social accounts to sign in faster.',
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <p className="header-greeting">{greeting}</p>
            <h1>Welcome back, {displayName} 👋</h1>
            <p className="header-subtitle">
              Manage your profile, review account activity, and keep your security preferences up to date.
            </p>
          </div>
          <div className="header-actions">
            <button type="button" className="outline-button">Edit profile</button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="profile-summary" aria-label="Profile overview">
          <div className="profile-avatar" aria-hidden="true">
            <span>{initials}</span>
          </div>
          <div className="profile-meta">
            <div className="profile-name">
              <h2>{displayName}</h2>
              <span className="profile-role-tag">{user?.role || 'Member'}</span>
            </div>
            <p className="profile-username">{username}</p>
            <div className="profile-contacts">
              <span>📧 {email}</span>
              <span>📅 Joined {memberSince}</span>
            </div>
          </div>
          <div className="profile-actions">
            <div className="action-card">
              <h4>Complete your profile</h4>
              <p>Add more personal details to personalize your experience.</p>
              <button type="button" className="ghost-button">Update details</button>
            </div>
            <div className="action-card secondary">
              <h4>Boost account security</h4>
              <p>Review security settings and enable additional safeguards.</p>
              <button type="button" className="ghost-button">Security center</button>
            </div>
          </div>
        </section>

        <section className="profile-stats" aria-label="Account highlights">
          <h3>Account highlights</h3>
          <div className="stats-grid">
            {highlightCards.map((card) => (
              <div className="stat-card" key={card.title}>
                <span className="stat-icon" aria-hidden="true">{card.icon}</span>
                <div className="stat-content">
                  <p className="stat-title">{card.title}</p>
                  <p className="stat-value">{card.value}</p>
                  <p className="stat-hint">{card.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-details" aria-label="Profile details and activity">
          <div className="panel-card info-card">
            <h3>Profile details</h3>
            <ul className="info-list">
              <li className="info-row">
                <span className="info-label">Full name</span>
                <span className="info-value">{fullName || 'Not provided'}</span>
              </li>
              <li className="info-row">
                <span className="info-label">Username</span>
                <span className="info-value">{user?.username || 'Not provided'}</span>
              </li>
              <li className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{email}</span>
              </li>
              <li className="info-row">
                <span className="info-label">Member since</span>
                <span className="info-value">{memberSince}</span>
              </li>
            </ul>
          </div>

          <div className="panel-card security-card">
            <h3>Security checklist</h3>
            <ul className="security-list">
              {checklistItems.map((item) => (
                <li
                  key={item.label}
                  className={`security-item ${item.complete ? 'complete' : 'pending'}`}
                >
                  <span className="security-status" aria-hidden="true">
                    {item.complete ? '✅' : '🕒'}
                  </span>
                  <div className="security-text">
                    <p className="security-label">{item.label}</p>
                    <p className="security-description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card activity-card">
            <h3>Recent activity</h3>
            <ul className="activity-list">
              {activityTimeline.map((entry) => (
                <li key={entry.title} className="activity-item">
                  <span className="activity-icon" aria-hidden="true">{entry.icon}</span>
                  <div className="activity-text">
                    <p className="activity-title">{entry.title}</p>
                    <p className="activity-description">{entry.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
