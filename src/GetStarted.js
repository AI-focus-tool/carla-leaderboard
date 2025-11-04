// Get Started page component
import React from 'react';
import './Pages.css';

function GetStarted() {
  return (
    <div className="page-content">
      <div className="get-started-header">
        <h1>Get Started</h1>
        <p className="subtitle">Follow these steps to submit your agent to the leaderboard</p>
      </div>

      <div className="steps-container">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Install Bench2Drive</h3>
          <p>Download and install the Bench2Drive evaluation toolkit from GitHub.</p>
          <pre className="code-block">
{`# Clone Bench2Drive repository
git clone https://github.com/Thinklab-SJTU/Bench2Drive.git
cd Bench2Drive

# Install dependencies
pip install -r requirements.txt

# Download evaluation data (choose one)
# Mini set (10 clips, 4GB)
bash tools/download_mini.sh

# Base set (1000 clips, 400GB) 
huggingface-cli download --repo-type dataset rethinklab/Bench2Drive --local-dir Bench2Drive-Base`}
          </pre>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Clone the Leaderboard Repository</h3>
          <p>Get the official Bench2Drive leaderboard code from GitHub.</p>
          <pre className="code-block">
{`git clone https://github.com/Thinklab-SJTU/Bench2Drive.git
cd Bench2Drive
pip install -r requirements.txt`}
          </pre>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Create Your Agent</h3>
          <p>Implement your autonomous driving agent following the Bench2Drive template.</p>
          <pre className="code-block">
{`from leaderboard.autoagents.autonomous_agent import AutonomousAgent

class MyAgent(AutonomousAgent):
    def setup(self, path_to_conf_file):
        # Initialize your agent
        # Load model, set up sensors, etc.
        pass
    
    def run_step(self, input_data, timestamp):
        # Process sensor data and return control command
        control = carla.VehicleControl()
        # Your driving logic here
        # Consider multi-ability requirements:
        # - Overtaking, Merging, Emergency Braking
        # - Traffic Sign Recognition, Give Way
        return control`}
          </pre>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <h3>Test Locally</h3>
          <p>Run the Bench2Drive evaluation locally to test your agent on the 220 routes.</p>
          <pre className="code-block">
{`# Set your agent and configuration
export TEAM_AGENT=leaderboard/team_code/your_agent.py
export TEAM_CONFIG=your_model_checkpoint.pth

# Run evaluation (choose appropriate script)
# For UniAD/VAD style agents
bash leaderboard/scripts/run_evaluation_multi_uniad.sh

# For TCP/ADMLP style agents  
bash leaderboard/scripts/run_evaluation_multi_tcp.sh

# For debug mode (single route)
bash leaderboard/scripts/run_evaluation_debug.sh`}
          </pre>
        </div>

        <div className="step-card">
          <div className="step-number">5</div>
          <h3>Submit to Leaderboard</h3>
          <p>Once your agent performs well locally, submit your results to the Bench2Drive leaderboard.</p>
          <pre className="code-block">
{`# Submit your results
python leaderboard/scripts/submit.py \\
  --results-dir=\${RESULTS_DIR} \\
  --team-name="\${TEAM_NAME}" \\
  --method-name="\${METHOD_NAME}" \\
  --email="\${EMAIL}" \\
  --institution="\${INSTITUTION}"`}
          </pre>
          <p>After submission, your results will be reviewed and added to the public leaderboard within 24-48 hours.</p>
        </div>
      </div>

      <div className="resources-section">
        <h2>Additional Resources</h2>
        <ul className="resource-list">
          <li>
            <a href="https://github.com/Thinklab-SJTU/Bench2Drive" target="_blank" rel="noopener noreferrer">
              📖 Official Bench2Drive Repository
            </a>
          </li>
          <li>
            <a href="https://github.com/Thinklab-SJTU/Bench2Drive/blob/main/docs/README.md" target="_blank" rel="noopener noreferrer">
              💻 Documentation
            </a>
          </li>
          <li>
            <a href="https://huggingface.co/datasets/rethinklab/Bench2Drive" target="_blank" rel="noopener noreferrer">
              📚 Bench2Drive Dataset
            </a>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2406.03877" target="_blank" rel="noopener noreferrer">
              📄 Research Paper
            </a>
          </li>
        </ul>
      </div>

      <div className="help-section">
        <h2>Need Help?</h2>
        <p>
          Join the Bench2Drive community on GitHub Discussions or check out the documentation for common questions.
        </p>
        <div className="help-buttons">
          <a href="https://github.com/Thinklab-SJTU/Bench2Drive/discussions" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            GitHub Discussions
          </a>
          <a href="https://github.com/Thinklab-SJTU/Bench2Drive/blob/main/docs/README.md" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
