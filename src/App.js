// Import necessary libraries: React Router for navigation
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import GetStarted from './pages/GetStarted';
import News from './pages/News';
import Profile from './pages/Profile';
import Submit from './pages/Submit';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfileModal from './components/EditProfileModal';
import Navbar from './components/Navbar';
import './styles/App.css';

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

// (Navbar component extracted to ./components/Navbar)

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
