// Profile page component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pages.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, []); // Remove fetchUserData from dependencies since it's defined inside the component

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser.id;

      const [userResponse, submissionsResponse] = await Promise.all([
        axios.get(`http://localhost:5001/api/users/${userId}`),
        axios.get(`http://localhost:5001/api/users/${userId}/submissions`)
      ]);

      setUser(userResponse.data);
      setSubmissions(submissionsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="profile-header">
        <div className="profile-header-content">
          <div>
            <h1>User Profile</h1>
            <p>Manage your account and view submission history</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {user && (
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="profile-info">
            <div className="info-item">
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Submit Count:</label>
              <span>{submissions.length}</span>
            </div>
            <div className="info-item">
              <label>Member Since:</label>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="submissions-section">
        <h2>Submission History</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet. <a href="/submit">Make your first submission</a></p>
        ) : (
          <div className="submissions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Driving Score</th>
                  <th>Route Completion</th>
                  <th>Infraction Penalty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{new Date(submission.submitted_at).toLocaleString()}</td>
                    <td>{submission.score.toFixed(2)}</td>
                    <td>{submission.driving_score ? submission.driving_score.toFixed(2) : '-'}</td>
                    <td>{submission.route_completion ? submission.route_completion.toFixed(2) : '-'}</td>
                    <td>{submission.infraction_penalty ? submission.infraction_penalty.toFixed(2) : '-'}</td>
                    <td>
                      <span className={`status-${submission.status}`}>
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;