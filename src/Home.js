// Home page component
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Home() {
  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>Bench2Drive Autonomous Driving Leaderboard</h1>
        <p className="hero-subtitle">
          Towards Multi-Ability Benchmarking of Closed-Loop End-To-End Autonomous Driving
        </p>
        <div className="hero-buttons">
          <Link to="/leaderboard" className="btn btn-primary">
            View Leaderboard
          </Link>
          <Link to="/get-started" className="btn btn-secondary">
            Get Started
          </Link>
          <a href="https://thinklab-sjtu.github.io/Bench2Drive/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Official Website
          </a>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">�</div>
            <h3>Multi-Ability Benchmarking</h3>
            <p>Comprehensive evaluation across multiple driving abilities including overtaking, merging, emergency braking, and traffic sign recognition</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3>Think2Drive Integration</h3>
            <p>Powered by Think2Drive teacher model for efficient reinforcement learning in latent world models for quasi-realistic autonomous driving</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Metrics</h3>
            <p>Track driving score, route completion, infraction penalties, driving efficiency, and driving smoothness metrics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>220 Challenge Routes</h3>
            <p>Comprehensive test suite with 220 carefully designed routes covering diverse urban and highway scenarios</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>About Bench2Drive Leaderboard</h2>
        <p>
          Bench2Drive is a comprehensive benchmark for evaluating closed-loop end-to-end autonomous driving systems.
          It provides multi-ability benchmarking across diverse driving scenarios, enabling researchers and developers
          to assess and improve their autonomous driving algorithms.
        </p>
        <p>
          Built on the CARLA simulator with Think2Drive integration, Bench2Drive offers 220 carefully designed routes
          covering urban and highway scenarios. The benchmark evaluates driving performance across multiple dimensions
          including safety, efficiency, and smoothness.
        </p>
      </div>

      <div className="overview-section">
        <h2>Project Overview</h2>
        <div className="overview-container">
          <img src="/overview.png" alt="Bench2Drive Project Overview" className="overview-image" />
        </div>
      </div>

      <div className="video-section">
        <h2>Introduction Video</h2>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-osdzJJs2g0"
            title="Bench2Drive Introduction Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to compete?</h2>
        <p>Join the leaderboard and showcase your autonomous driving solution</p>
        <Link to="/get-started" className="btn btn-primary">
          Get Started Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
