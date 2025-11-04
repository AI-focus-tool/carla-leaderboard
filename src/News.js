// News page component
import React from 'react';
import './Pages.css';

function News() {
  const newsItems = [
    {
      date: '2025-02-18',
      title: 'DriveTransformer (ICLR25) Released',
      content: 'New work introduces a tiny validation set Dev10 for quick development of models. The 10 clips are carefully selected from the official 220 routes, designed to be both difficult and representative with low variance.',
      category: 'Research'
    },
    {
      date: '2024-10-14',
      title: 'Benchmark V0.0.3 Released',
      content: 'Fixed typos in ability calculation and updated multi-ability results. This update does not affect driving score and success rate. Also addressed bugs in B2D_vad_dataset.',
      category: 'Update'
    },
    {
      date: '2024-09-26',
      title: 'Accepted at NeurIPS 2024',
      content: 'Bench2Drive has been accepted at NeurIPS 2024 Datasets and Benchmarks Track. This represents a major milestone for the autonomous driving research community.',
      category: 'Achievement'
    },
    {
      date: '2024-08-27',
      title: 'New Metrics and Bug Fixes',
      content: 'Updated results under new protocols with two additional metrics: Driving Efficiency and Driving Smoothness. Fixed camera extrinsic bugs and improved evaluation protocols.',
      category: 'Update'
    },
    {
      date: '2024-08-19',
      title: 'Major Updates to Evaluation',
      content: 'Added Driving Efficiency and Driving Smoothness metrics. Removed minimum speed penalty from Drive Score calculation. Extended TickRunTime from 2000 to 4000 for more lenient evaluation.',
      category: 'Feature'
    },
    {
      date: '2024-08-10',
      title: 'Camera Bug Fixes',
      content: 'Fixed camera projection bugs in UniAD and VAD team code agents. Training process was correct, but evaluation had extrinsic issues. Results will be updated soon.',
      category: 'Fix'
    },
    {
      date: '2024-07-29',
      title: 'Extrinsic Bug Discovery',
      content: 'Identified bug in BACK CAMERA extrinsic for UniAD and VAD agents during evaluation. Training process remains correct. Users encouraged to use correct extrinsics.',
      category: 'Issue'
    },
    {
      date: '2024-07-22',
      title: 'Evaluation Improvements',
      content: 'Added automatic cleaning code and reminders in evaluation toolkit. Enhanced robustness for CARLA crashes with automatic restart capabilities.',
      category: 'Improvement'
    },
    {
      date: '2024-07-10',
      title: 'Full Dataset Expansion',
      content: 'Expanded Full dataset to 13638 clips. Due to HuggingFace limits, split into two repositories. Added filelists and SHA256 checksums for verification.',
      category: 'Dataset'
    },
    {
      date: '2024-06-19',
      title: 'Data Upload Fix',
      content: 'Fixed typo in upload script that caused empty clips for VehicleTurningRoutePedestrian scenario in HuggingFace version. Users should verify their data integrity.',
      category: 'Fix'
    },
    {
      date: '2024-06-05',
      title: 'Full Release Launch',
      content: 'Bench2Drive releases complete Full dataset (10000 clips), evaluation tools, baseline code, and comprehensive benchmark results.',
      category: 'Release'
    },
    {
      date: '2024-04-27',
      title: 'Initial Dataset Release',
      content: 'Bench2Drive releases Mini (10 clips) and Base (1000 clips) splits of the official training data, marking the beginning of the benchmark platform.',
      category: 'Release'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Announcement': '#4CAF50',
      'Update': '#2196F3',
      'Results': '#FF9800',
      'Release': '#9C27B0',
      'Event': '#F44336',
      'Feature': '#00BCD4'
    };
    return colors[category] || '#666';
  };

  return (
    <div className="page-content">
      <div className="news-header">
        <h1>Latest News</h1>
        <p className="subtitle">Stay updated with the latest developments and announcements</p>
      </div>

      <div className="news-grid">
        {newsItems.map((item, index) => (
          <div key={index} className="news-card">
            <div className="news-meta">
              <span className="news-date">{item.date}</span>
              <span 
                className="news-category" 
                style={{ backgroundColor: getCategoryColor(item.category) }}
              >
                {item.category}
              </span>
            </div>
            <h3 className="news-title">{item.title}</h3>
            <p className="news-content">{item.content}</p>
            <a href="#read-more" className="news-link">Read more →</a>
          </div>
        ))}
      </div>

      <div className="subscribe-section">
        <h2>Stay Informed</h2>
        <p>Subscribe to our newsletter to receive updates directly in your inbox</p>
        <div className="subscribe-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="subscribe-input"
          />
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default News;
