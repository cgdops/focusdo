# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing **FocusDo**, a minimal task management application for single users. Currently only the backend is implemented.

## Development Commands

### Backend (FocusToDo/backend)
```bash
cd FocusToDo/backend
npm install          # Install dependencies
npm run dev          # Start dev server with nodemon (hot reload)
npm start            # Start production server
```

Backend runs on port 3001 by default. Health check available at `GET /api/health`.

## Architecture

### Backend Structure (Node.js/Express)
```
FocusToDo/backend/src/
├── index.js              # Express app entry point, middleware setup
├── config/database.js    # SQLite setup with better-sqlite3
├── controllers/          # Request handlers (auth_controller.js, task_controller.js)
├── models/               # Database operations (user_model.js, task_model.js)
├── middleware/           # auth_middleware.js - JWT verification
└── routes/               # Route definitions (auth_routes.js, task_routes.js)
```

### Key Technical Details
- **Database**: SQLite with better-sqlite3 (synchronous API)
- **Auth**: JWT tokens stored in HttpOnly cookies, also accepts Bearer token header
- **Password**: bcryptjs with cost factor 10
- **CORS**: Configured for frontend at localhost:3000

### API Endpoints
- `POST /api/auth/register` - Create account (email, password)
- `POST /api/auth/login` - Login, returns JWT
- `POST /api/auth/logout` - Clear auth cookie
- `GET /api/tasks` - List user's tasks (auth required)
- `POST /api/tasks` - Create task (auth required)
- `PUT /api/tasks/:id` - Update task title or completion (auth required)
- `DELETE /api/tasks/:id` - Delete task (auth required)

## Coding Conventions

- **File naming**: snake_case (e.g., `auth_controller.js`)
- **Variables**: camelCase
- **Components**: PascalCase (for future React frontend)
- **Modules**: CommonJS (`require`/`module.exports`)
- Use functional React components with Hooks (for frontend when implemented)
- Every API call must have try/catch error handling
