# Keep Notes - Personal Note-Taking Application

A beautiful, modern note-taking application built with Next.js and FastAPI. Create, organize, and manage your personal notes with an intuitive interface and powerful search functionality.

## Features

- **User Authentication** - Secure signup and signin with JWT tokens
- **Note Management** - Create, edit, delete, and organize your notes
- **Real-time Search** - Instantly find notes by title or content
- **Rich Text Support** - Format your notes with a built-in rich text editor
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Beautiful UI** - Clean, modern interface with a warm color palette
- **Persistent Storage** - All your notes are safely stored in MongoDB

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database with Motor async driver
- **JWT Authentication** - Secure token-based authentication
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server for production

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (Atlas account or local installation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd notes-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=3600
   CORS_ORIGINS=http://localhost:3000
   ```

   Create `frontend/.env.local`
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Running the Application

**Option 1: Local Development**

```bash
# In one terminal run backend
cd backend
uvicorn app.main:app --reload --port 8000

# And in another terminal run frontend
cd frontend
npm run dev
```

**Option 2: Docker (Recommended)**

```bash
# Build and run with Docker Compose
docker compose up --build

# Run it in background
docker compose up --build -d
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## Usage

### Getting Started

1. **Sign Up** - Create a new account with your email and password
2. **Sign In** - Log into your account
3. **Create Notes** - Click "Create New Note" to add your first note
4. **Search Notes** - Use the search bar to find specific notes
5. **Edit Notes** - Click the edit icon on any note to modify it
6. **Delete Notes** - Remove notes you no longer need

### Features Overview

- **Rich Text Editor** - Format your notes with bold, italic, headers, and lists
- **Auto-Save** - Your notes are automatically saved as you type
- **Search Functionality** - Find notes instantly by searching title or content
- **Responsive Design** - Access your notes from any device
- **Secure Authentication** - Your notes are private and secure

## API Endpoints

### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/signin` - Authenticate user and get JWT token
- `GET /auth/me` - Get current user information

### Notes
- `GET /notes` - List all notes for authenticated user
- `POST /notes` - Create a new note
- `GET /notes/{id}` - Get a specific note
- `PUT /notes/{id}` - Update a note
- `DELETE /notes/{id}` - Delete a note

### Health Check
- `GET /health` - Check API and database status

## Docker Deployment

```bash
# Build and run all services
docker compose up --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```
