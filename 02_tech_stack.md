# Tech Stack & Guidelines

## 1. Technology Stack
- **Frontend:** React.js (Create React App or Vite)
- **Styling:** Tailwind CSS (for rapid UI development)
- **Backend:** Node.js with Express framework
- **Database:** SQLite (for simplicity in v1) or PostgreSQL
- **Authentication:** JSON Web Tokens (JWT) stored in HttpOnly cookies.

## 2. Coding Guidelines
- **Functional Components:** Use React functional components with Hooks (useState, useEffect), not Class components.
- **Naming Conventions:**
  - Variables: camelCase (e.g., `userEmail`)
  - Components: PascalCase (e.g., `TaskItem`)
  - Files: snake_case (e.g., `user_controller.js`)
- **Error Handling:** Every API call must have a try/catch block.
- **Comments:** Add comments explaining complex logic, but avoid commenting obvious code.