// Submit page component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pages.css';

function Submit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);

    // Get user's current submit count
    fetchSubmitCount(userData.id);
  }, [navigate]);

  const fetchSubmitCount = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users/${userId}/submissions`);
      setSubmitCount(response.data.length);
    } catch (error) {
      console.error('Error fetching submit count:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      if (!file) {
        throw new Error('Please select a file to upload');
      }

      if (!user) {
        throw new Error('User not logged in');
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user.id);

      console.log('Submitting file:', file.name);
      const response = await axios.post('http://localhost:5001/api/submissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`✅ Submission successful! Submission ID: ${response.data.submission_id}`);
      setFile(null);
      // Reset file input
      document.getElementById('result_file').value = '';
      // Update submit count
      setSubmitCount(prev => prev + 1);

    } catch (error) {
      console.error('Submission error:', error.response || error.message);
      if (error.response) {
        setMessage(`❌ Error: ${error.response.data.error || 'Submission failed'}`);
      } else if (error.message) {
        setMessage(`❌ Error: ${error.message}`);
      } else {
        setMessage('❌ Network error. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="page-content">
      <div className="submit-header">
        <h1>Submit Results</h1>
        <p>Upload your Bench2Drive evaluation results to the leaderboard</p>
        {user && (
          <div className="user-info">
            <p>Logged in as: <strong>{user.username}</strong> ({user.email})</p>
            <p>Submit Count: <strong>{submitCount}</strong></p>
          </div>
        )}
      </div>

      <div className="submit-form-container">
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-group">
            <label htmlFor="result_file">Result File *</label>
            <input
              type="file"
              id="result_file"
              onChange={handleFileChange}
              accept=".json,.txt,.log,.zip"
              required
            />
            {file && (
              <div className="file-info">
                <small>Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</small>
              </div>
            )}
          </div>

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={submitting || !file}
          >
            {submitting ? 'Submitting...' : 'Submit Results'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Submit;