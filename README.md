# Frontend - Bench2Drive Leaderboard

React-based frontend for the Bench2Drive Autonomous Driving Leaderboard.

## Quick Start

```bash
npm install
npm start
```

Opens at: `http://localhost:3000`

## Features

- **Sortable Table**: Click column headers to sort
- **Tab Navigation**: Switch between Map Track and Sensor Track
- **Responsive Design**: Works on mobile and desktop
- **Real-time Updates**: Fetches data from backend API

## Technologies

- React 19
- Axios (API calls)
- @tanstack/react-table (sorting)
- CSS3

## Configuration

Backend API URL is configured in `src/App.js`:
```javascript
axios.get('http://localhost:5000/api/leaderboard')
```

Change this URL if your backend runs on a different port or domain.

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Customization

Edit `src/App.js` and `src/App.css` to customize the interface.

See main README.md in the parent directory for full documentation.

