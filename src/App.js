// Import necessary libraries: React Router for navigation
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './Home';
import Leaderboard from './Leaderboard';
import GetStarted from './GetStarted';
import News from './News';
import Profile from './Profile';
import Submit from './Submit';
import Login from './Login';
import Register from './Register';
import EditProfileModal from './EditProfileModal';
import './App.css';

// Protected route for authenticated users only
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Auth route - redirect if already logged in
function AuthRoute({ user, children }) {
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  return children;
}

// Navigation bar component
function Navbar({ onEditProfile, currentUser, onUserUpdate }) {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Use currentUser prop instead of localStorage directly
  const user = currentUser;

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowDropdown(false);
    onUserUpdate(null);
    window.location.href = '/login';
  };

  const getUserInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo-section">
          <img src="/thinklab.png" alt="ThinkLab Logo" className="thinklab-logo" />
          <div className="nav-title">
            <h1>Bench2Drive Autonomous Driving Leaderboard</h1>
          </div>
        </div>
        <ul className="nav-menu">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/leaderboard" className={isActive('/leaderboard')}>Leaderboard</Link></li>
          <li><Link to="/submit" className={isActive('/submit')}>Submit</Link></li>
          <li><Link to="/get-started" className={isActive('/get-started')}>Get Started</Link></li>
          <li><Link to="/news" className={isActive('/news')}>News</Link></li>
          {user ? (
            <li className="user-menu" ref={dropdownRef}>
              <div
                className="user-avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {getUserInitials(user.username)}
              </div>
              {showDropdown && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-avatar-dropdown">{getUserInitials(user.username)}</div>
                    <div className="user-details">
                      <div className="username">{user.username}</div>
                      <div className="email">{user.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <span className="dropdown-icon">👤</span>
                    <span>View Profile</span>
                  </Link>
                  <button className="dropdown-item" onClick={() => {setShowDropdown(false); onEditProfile();}}>
                    <span className="dropdown-icon">⚙️</span>
                    <span>Edit Profile</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

// Create a functional component App that fetches leaderboard data from backend API
function App() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          onEditProfile={() => setShowEditProfile(true)}
          currentUser={currentUser}
          onUserUpdate={handleUserUpdate}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/submit" element={<ProtectedRoute user={currentUser}><Submit /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute user={currentUser}><Profile /></ProtectedRoute>} />
            <Route path="/login" element={<AuthRoute user={currentUser}><Login /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute user={currentUser}><Register /></AuthRoute>} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>

        <EditProfileModal
          isOpen={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          user={currentUser}
          onUpdate={handleUserUpdate}
        />

        <footer className="footer">
          <p>&copy; 2025 Bench2Drive Autonomous Driving Leaderboard. Built with React and Node.js.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
