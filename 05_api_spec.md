# API Specification

## 1. Authentication
- `POST /api/auth/register`
  - Input: `{ "email": "...", "password": "..." }`
  - Output: `{ "message": "User created", "token": "..." }`
- `POST /api/auth/login`
  - Input: `{ "email": "...", "password": "..." }`
  - Output: `{ "message": "Login successful", "token": "..." }`

## 2. Tasks
- `GET /api/tasks`
  - Headers: Authorization (Token)
  - Output: `[ { "id": 1, "title": "Buy milk", "is_completed": false }, ... ]`

- `POST /api/tasks`
  - Headers: Authorization (Token)
  - Input: `{ "title": "New Task Name" }`
  - Output: `{ "id": 2, "title": "New Task Name", "is_completed": false }`

- `PUT /api/tasks/:id`
  - Purpose: Mark complete or edit text.
  - Input: `{ "is_completed": true }` OR `{ "title": "Updated Name" }`
  - Output: `{ "id": 1, "updated": true }`

- `DELETE /api/tasks/:id`
  - Purpose: Remove a task.
  - Output: `{ "message": "Task deleted" }`