# Rails React User Management

A full-stack user management application built with **Ruby on Rails (API-only)**, **React**, **Vite**, and **PostgreSQL**.

The project demonstrates how to keep the backend and frontend separate while developing them in a single repository:

- **Rails API** handles HTTP endpoints, validation, persistence, and backend business logic.
- **React** renders the user interface and manages UI state.
- **Vite** provides the frontend development server and production build tooling.
- **PostgreSQL** stores user records.

## Features

- List users
- Create users
- Edit users
- Delete users
- Server-side name and email validation
- Loading and error states in React
- JSON API responses
- Vite development proxy for `/api` requests
- Reusable React components and a centralized API module

## Tech stack

- Ruby / Ruby on Rails (API-only)
- PostgreSQL
- React
- Vite
- JavaScript (ES modules and JSX)

> Use the versions installed in your local environment and committed lockfiles. Check `ruby -v`, `rails -v`, `node -v`, and `npm -v` if setup commands fail.

## Architecture

```text
Browser
  |
  v
React UI (Vite dev server: localhost:5173)
  |
  | /api/*
  v
Vite development proxy
  |
  v
Rails API (localhost:3000)
  |
  v
Active Record
  |
  v
PostgreSQL
```

The frontend and backend are separate applications in one repository:

```text
rails_react_user_management/
├── backend/                  # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   └── users_controller.rb
│   │   └── models/
│   │       └── user.rb
│   ├── config/
│   │   └── routes.rb
│   ├── db/
│   │   ├── migrate/
│   │   └── seeds.rb
│   └── Gemfile
└── frontend/                 # React + Vite
    ├── src/
    │   ├── api/
    │   │   └── users.js
    │   ├── components/
    │   │   ├── UserForm.jsx
    │   │   └── UserList.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## Prerequisites

Install and configure:

- Ruby and Rails
- Node.js and npm (use a version supported by your installed Vite version)
- PostgreSQL, running locally

Check your tools:

```bash
ruby -v
rails -v
node -v
npm -v
psql --version
```

## Setup

### 1. Create the Rails API

If you're creating the project from scratch:

```bash
mkdir rails_react_user_management
cd rails_react_user_management

rails new backend --api -d postgresql
cd backend
bin/rails db:create
```

If the Rails application already exists, skip the `rails new` command and continue from its `backend/` directory.

### 2. Configure the User model and API

Generate the model and migration if they do not already exist:

```bash
bin/rails generate model User name:string email:string
bin/rails db:migrate
```

The model can validate the required fields and email uniqueness:

```ruby
# backend/app/models/user.rb
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false }
end
```

Configure RESTful routes:

```ruby
# backend/config/routes.rb
Rails.application.routes.draw do
  scope "/api" do
    resources :users
  end
end
```

The controller should implement `index`, `show`, `create`, `update`, and `destroy`. Use strong parameters and return validation failures with HTTP `422 Unprocessable Entity`.

### 3. Create the React frontend

From the repository root:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

If `frontend/` already exists, run `npm install` inside it instead.

### 4. Configure the Vite development proxy

Configure `frontend/vite.config.js` so API calls are forwarded to Rails:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

The React application can now request `fetch("/api/users")` without hard-coding the backend origin. This proxy is for local development; production routing must be configured separately.

### 5. Seed sample users (optional)

Add sample records to `backend/db/seeds.rb`:

```ruby
User.create!([
  { name: "Abhilash", email: "abhilash@example.com" },
  { name: "John", email: "john@example.com" }
])
```

Run the seed task from `backend/`:

```bash
bin/rails db:seed
```

Only run seeds when you want the sample records. Ensure seed data is appropriate for the environment.

## Run the application

Start the backend and frontend in **separate terminals**.

**Terminal 1 - Rails API**

```bash
cd backend
bin/rails server
```

Rails runs at `http://localhost:3000`.

**Terminal 2 - React + Vite**

```bash
cd frontend
npm run dev
```

Vite prints the local frontend URL, usually `http://localhost:5173`.

Open the Vite URL in your browser.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/users` | List users |
| `GET` | `/api/users/:id` | Retrieve one user |
| `POST` | `/api/users` | Create a user |
| `PATCH` | `/api/users/:id` | Update a user |
| `PUT` | `/api/users/:id` | Replace/update a user, if supported by the controller |
| `DELETE` | `/api/users/:id` | Delete a user |

Example: list users

```bash
curl http://localhost:3000/api/users
```

Example: create a user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"user":{"name":"Sam","email":"sam@example.com"}}'
```

A successful create should return HTTP `201 Created`. Invalid data should return HTTP `422` with an `errors` array when implemented as described above.

## Frontend responsibilities

- `src/App.jsx` coordinates loading, saving, editing, deleting, and UI state.
- `src/api/users.js` centralizes HTTP requests and error handling.
- `src/components/UserForm.jsx` renders a controlled create/edit form.
- `src/components/UserList.jsx` renders users and edit/delete actions.

The current app uses React state for this relatively small feature set. Redux is not required unless application-wide state becomes more complex.

## Troubleshooting

### Rails cannot connect to PostgreSQL

Confirm PostgreSQL is running, then check the database settings in `backend/config/database.yml`. Retry:

```bash
cd backend
bin/rails db:create
bin/rails db:migrate
```

### Frontend cannot reach the API

- Confirm Rails is running on port `3000`.
- Confirm `vite.config.js` proxies `/api` to `http://localhost:3000`.
- Restart Vite after changing its configuration.
- Check the browser Network and Console tabs.

### The browser shows duplicate requests in development

React `StrictMode` may run an extra effect setup/cleanup cycle in development to help detect unsafe effects. Keep StrictMode enabled and implement appropriate cleanup for effects.

### A request returns `422 Unprocessable Entity`

Check the JSON response's `errors` array. Confirm the required `name` and `email` fields are supplied and that the email is not already in use.

## Production notes

This repository uses two applications during development. Before deploying:

- Build the frontend with `npm run build` inside `frontend/`.
- Decide where the generated static assets will be hosted (for example, a CDN/static host or a web server).
- Configure production API routing and the frontend API base URL appropriately.
- Configure CORS only if the browser calls the API across origins; same-origin routing can avoid that requirement.
- Enforce authentication and authorization on the Rails API before exposing user-management operations.
- Add database indexes and appropriate constraints for data integrity, including a unique index on normalized email if email uniqueness is required.
- Add automated tests for Rails endpoints and React components/API behavior.
- Never rely on frontend validation for security; validate and authorize requests on the server.

## Learning goals

This project is intended for hands-on practice with:

- React components, props, and hooks
- Controlled forms and event handling
- Fetching data from a Rails API
- RESTful routes and JSON responses
- Loading, error, and empty states
- State updates after CRUD operations
- Component responsibilities and API abstraction
- Frontend/backend separation and deployment trade-offs

## License

<Add a license file>
