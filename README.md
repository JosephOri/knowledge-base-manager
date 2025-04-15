# Knowledge Base Manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JosephOri/knowledge-base-manager.git
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server (from backend directory):
```bash
cd backend
npm start
```
The backend will run on http://localhost:3001

2. Start the frontend development server (from frontend directory):
```bash
cd frontend
npm run dev
```
The frontend will open in your browser at http://localhost:5173

## Scripts

### Backend
- `npm start`: Start development server with nodemon
- `npm build`: Compile TypeScript to JavaScript

### Frontend 
- `npm run dev`: Start Vite development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build

## Notes
- The backend must be running before using the frontend
- Data is persisted in `backend/src/knowledgebase.json`
- Server will auto-restart when making backend changes
