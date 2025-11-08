// Mock data for leaderboard and submissions
// Based on real autonomous driving research models

const leaderboardData = [
  {
    rank: 1,
    entry: "UniAD (Unified Autonomous Driving)",
    score: 85.60,
    driving_score: 82.30,
    route_completion: 94.5,
    infraction_penalty: 0.15,
    submissions: 12
  },
  {
    rank: 2,
    entry: "VAD (Vectorized Scene Representation)",
    score: 83.20,
    driving_score: 80.10,
    route_completion: 92.8,
    infraction_penalty: 0.18,
    submissions: 8
  },
  {
    rank: 3,
    entry: "Think2Drive (RL-based Planning)",
    score: 81.90,
    driving_score: 79.50,
    route_completion: 91.2,
    infraction_penalty: 0.21,
    submissions: 15
  },
  {
    rank: 4,
    entry: "ST-P3 (Spatial-Temporal Planning)",
    score: 79.40,
    driving_score: 76.80,
    route_completion: 89.6,
    infraction_penalty: 0.24,
    submissions: 6
  },
  {
    rank: 5,
    entry: "BEVFormer (Bird's Eye View Transformer)",
    score: 77.80,
    driving_score: 75.20,
    route_completion: 87.3,
    infraction_penalty: 0.28,
    submissions: 10
  },
  {
    rank: 6,
    entry: "FIERY (Future Instance Prediction)",
    score: 75.30,
    driving_score: 72.90,
    route_completion: 85.1,
    infraction_penalty: 0.32,
    submissions: 7
  },
  {
    rank: 7,
    entry: "TCP (Trajectory-guided Control)",
    score: 73.60,
    driving_score: 71.40,
    route_completion: 83.5,
    infraction_penalty: 0.35,
    submissions: 9
  },
  {
    rank: 8,
    entry: "LAV (Learning from All Vehicles)",
    score: 71.20,
    driving_score: 69.10,
    route_completion: 81.2,
    infraction_penalty: 0.39,
    submissions: 5
  },
  {
    rank: 9,
    entry: "TransFuser (Transformer Fusion)",
    score: 68.90,
    driving_score: 66.80,
    route_completion: 78.9,
    infraction_penalty: 0.43,
    submissions: 11
  },
  {
    rank: 10,
    entry: "CILRS (Conditional Imitation Learning)",
    score: 65.40,
    driving_score: 63.50,
    route_completion: 75.6,
    infraction_penalty: 0.48,
    submissions: 4
  },
  {
    rank: 11,
    entry: "InterFuser (Interpretable Fusion)",
    score: 62.80,
    driving_score: 60.90,
    route_completion: 73.2,
    infraction_penalty: 0.52,
    submissions: 3
  },
  {
    rank: 12,
    entry: "NEAT (Neural Attention)",
    score: 59.50,
    driving_score: 57.80,
    route_completion: 70.5,
    infraction_penalty: 0.58,
    submissions: 6
  }
];

module.exports = { leaderboardData };

