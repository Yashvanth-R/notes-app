# Notes App - Full Stack TypeScript Application

A full-stack notes application built with Next.js (TypeScript) frontend and FastAPI (Python) backend, using MongoDB for data storage.

## Features

- **User Authentication**: Sign up, sign in, and JWT-based authentication
- **Notes Management**: Create, read, search, and delete notes
- **Real-time Search**: Search notes by title or content
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Secure**: JWT tokens, password hashing, and CORS protection

## Tech Stack

### Frontend
- **Next.js 15** with TypeScript
- **React 19** with hooks
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for API calls

### Backend
- **FastAPI** with Python
- **MongoDB** with Motor (async driver)
- **JWT** authentication
- **Pydantic** for data validation
- **Bcrypt** for password hashing

## Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (Atlas or local instance)

### 1. Clone and Setup
```bash
git clone <your-repo>
cd notes-app
```

### 2. Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit backend/.env with your MongoDB connection string
```

### 3. Frontend Setup
```bash
cd frontend

# Install Node.js dependencies
npm install
```

### 4. Start Development Servers

**Option A: Use the batch file (Windows)**
```bash
# From the root directory
start-dev.bat
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd backend
python start.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Environment Configuration

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notesdb
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=3600
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Sign in user

### Notes (Protected)
- `GET /notes` - List user's notes (with optional search)
- `POST /notes` - Create new note
- `DELETE /notes/{note_id}` - Delete note

### Health Check
- `GET /health` - Check API and database status

## Project Structure

```
notes-app/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration and security
│   │   ├── db/            # Database connection
│   │   ├── models/        # Data models
│   │   ├── routes/        # API endpoints
│   │   ├── schemas/       # Pydantic schemas
│   │   └── main.py        # FastAPI app
│   ├── .env               # Environment variables
│   ├── requirements.txt   # Python dependencies
│   └── start.py          # Development server
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js app router
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and API
│   │   └── types/        # TypeScript types
│   ├── package.json      # Node.js dependencies
│   └── tailwind.config.ts
├── start-dev.bat         # Development startup script
└── README.md
```

## Usage

1. **Sign Up**: Create a new account at `/signup`
2. **Sign In**: Log in at `/signin`
3. **Create Notes**: Use the form on the home page
4. **Search Notes**: Use the search box to find notes by title or content
5. **Delete Notes**: Click the delete button on any note

## Development

### Adding New Features
1. **Backend**: Add routes in `backend/app/routes/`
2. **Frontend**: Add pages in `frontend/src/app/`
3. **Database**: Update models in `backend/app/models/`

### Common Issues

**CORS Errors**: Make sure backend is running and CORS_ORIGINS is set correctly

**Database Connection**: Verify MongoDB URI in backend/.env

**Port Conflicts**: Change ports in start scripts if 3000/8000 are in use

## Deployment

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy from `backend/` directory
3. Use `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel/Netlify)
1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Deploy from `frontend/` directory
3. Build command: `npm run build`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.