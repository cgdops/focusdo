# Frontend Structure

## 1. Pages (Routes)
- `/login` - Login form. Redirects to Dashboard upon success.
- `/signup` - Registration form.
- `/dashboard` - The main view. Shows the list of tasks.
- `*` (404) - A "Page Not Found" screen for invalid URLs.

## 2. Component Hierarchy
- `App.js` (Main Container)
  - `Navbar` (Shows Logo and Logout button)
  - `Login` Page
  - `Signup` Page
  - `Dashboard` Page
    - `TaskInput` (Text box + "Add" button)
    - `TaskList` (The container for all items)
      - `TaskItem` (Individual row: Checkbox, Text, Delete Button)
        - Props: `task` object, `onToggle` function, `onDelete` function.