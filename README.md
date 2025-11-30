# Task Management Dashboard

A modern full-stack Kanban-style task management dashboard with React frontend and Node.js/Express/MongoDB backend.

- #### Live URL: [Task-Management-Dashboard](https://kanban-board-manan-b.vercel.app/)

## Features

- **Kanban Board View**: View tasks in a three-column layout (To Do, In Progress, Done)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Drag and Drop**: Intuitively move tasks between columns or reorder within columns
- **Task Details**: View and edit task details in a modal
- **Create Tasks**: Add new tasks with title, description, and status
- **Responsive Design**: Works on desktop and mobile devices
- **Persistent Storage**: Tasks are stored in MongoDB database
- **REST API**: Full CRUD operations via Express backend

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **@dnd-kit** for drag and drop functionality
- **Axios** for API calls
- **React Icons** for icons

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **CORS** for cross-origin requests

## Project Structure

```
Task-Management-Dashboard-main/
├── frontend/                   # React application
│   ├── public/
│   ├── src/
│   │   ├── api/               # API integration
│   │   ├── components/
│   │   ├── context/           # React context for global state
│   │   ├── hooks/             # Custom hooks
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── .env                   # Frontend environment variables
├── backend/                    # Express API server
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   └── server.ts          # Main server file
│   ├── package.json
│   └── .env                   # Backend environment variables
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** - Choose one:
  - **Option 1**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free cloud database - Recommended)
  - **Option 2**: [MongoDB Community Edition](https://www.mongodb.com/try/download/community) (Local installation)

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Click "Connect" and select "Connect your application"
4. Copy the connection string
5. Update `backend/.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management?retryWrites=true&w=majority
   ```

#### Option 2: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB runs as a service automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. Use default connection string in `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/task-management
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RutikKulkarni/Task-Management-Dashboard.git
   cd Task-Management-Dashboard
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create backend environment file:
   ```bash
   copy .env.example .env
   # Edit .env and update MONGODB_URI with your connection string
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You'll need **two terminal windows**:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

Open your browser and visit: `http://localhost:3000`

## Architecture and Approach

### State Management

The application uses React Context API for global state management:

- **TaskContext**: Manages task data and operations (fetch, add, update, move)
- **ThemeContext**: Manages theme preferences (light/dark mode)

Custom hooks (`useTasks` and `useTheme`) provide convenient access to these contexts.

### Component Design

The application follows a component-based architecture:

- **KanbanBoard**: The main component orchestrating the board layout and drag-and-drop logic
- **KanbanColumn**: Represents a column in the Kanban board with a specific status
- **TaskCard**: Represents an individual task with basic information
- **TaskDetailsModal**: Provides detailed view and editing capability for tasks
- **AddTaskModal**: Form for creating new tasks

### API Integration

The frontend communicates with the backend via REST API:

- `GET /api/tasks`: Fetch all tasks
- `POST /api/tasks`: Create a new task
- `PATCH /api/tasks/:id`: Update an existing task
- `DELETE /api/tasks/:id`: Delete a task

### Database Schema

Tasks are stored in MongoDB with the following schema:

```typescript
{
  title: String (required)
  description: String (required)
  status: String (enum: 'todo' | 'inProgress' | 'done')
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Drag and Drop

The drag-and-drop functionality is implemented using @dnd-kit, allowing users to:

1. Move tasks between columns (changing status)
2. Reorder tasks within a column

### Theme Support

The application supports both light and dark themes, persisted in local storage and respecting the user's system preferences by default.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
```
