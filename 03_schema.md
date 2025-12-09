# Data Schema

## 1. Table: Users
- `id` (Integer, Primary Key, Auto-increment): Unique ID for the user.
- `username` (String): The user's display name.
- `email` (String, Unique): User's login email.
- `password_hash` (String): Encrypted password (never store plain text!).
- `created_at` (DateTime): When the account was made.

## 2. Table: Tasks
- `id` (Integer, Primary Key, Auto-increment): Unique ID for the task.
- `user_id` (Integer, Foreign Key): Links the task to the User table.
- `title` (String): The content of the to-do item.
- `is_completed` (Boolean): False by default. True if checked.
- `created_at` (DateTime): To sort by newest first.

## 3. Relationships
- A **User** can have many **Tasks** (One-to-Many).
- A **Task** belongs to exactly one **User**.