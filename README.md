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

Backend API base URL is centralized in `src/config.js`:
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
```

You can override it by setting an environment variable before starting the app:

```pwsh
$env:REACT_APP_API_BASE_URL = "http://localhost:5001"
npm start
```

All API calls use `${API_BASE_URL}/api/...`.

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Customization

- App layout: `src/App.js`
- Navigation: `src/components/Navbar.js`
- Pages: `src/pages/**/*`
- Styles: `src/styles/App.css` and `src/styles/Pages.css`

Project structure (src):

```
src/
	components/
		Navbar.js
		EditProfileModal.js
	pages/
		Home.js
		Leaderboard.js
		GetStarted.js
		News.js
		Profile.js
		Submit.js
		Auth/
			Login.js
			Register.js
	styles/
		App.css
		Pages.css
		index.css
	config.js
	App.js
	index.js
```

See main README.md in the parent directory for full documentation.

