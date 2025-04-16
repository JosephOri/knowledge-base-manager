# Knowledge Base Manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JosephOri/knowledge-base-manager.git
cd knowledge-base-manager
```

2. Install all dependencies for the monorepo:

```bash
yarn install
```

## Running the Application

1. Start both the backend and frontend development servers:

```bash
yarn start
```

- The backend will run on `http://localhost:3001`
- The frontend will open in your browser at `http://localhost:5173`

## Notes

- Data is persisted in `backend/src/knowledgebase.json`
- The backend server will auto-restart when making backend changes (via nodemon)