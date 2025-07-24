# CRM Full-Stack Project

This repository contains a full-stack CRM (Customer Relationship Management) application built with modern technologies:

- **Frontend:** React 19, TypeScript, Material UI (MUI), TanStack Query, react-hook-form, yup
- **Backend:** NestJS, TypeORM, PostgreSQL, JWT authentication
- **DevOps:** Docker Compose for multi-service orchestration

## Project Structure

```
├── client/         # React frontend (TypeScript, MUI, TanStack Query)
│   ├── src/
│   │   ├── api/    # All API utilities (project, user, github)
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main app pages (Home, Login, Register)
│   │   └── hooks/      # Custom React hooks (e.g., useDebounce)
│   ├── public/
│   └── ...
├── server/         # NestJS backend (TypeScript, TypeORM, JWT)
│   ├── src/
│   │   ├── auth/   # Authentication logic (JWT, guards, strategies)
│   │   ├── project/# Project CRUD endpoints and logic
│   │   ├── user/   # User registration, profile, validation
│   │   └── ...
│   └── ...
├── docker-compose.yml # Multi-service orchestration (PostgreSQL, backend, frontend)
└── README.md      # Project documentation
```

## Features

### Frontend
- Modern React 19 with functional components and hooks
- Material UI for a clean, responsive UI
- TanStack Query for data fetching and caching
- react-hook-form and yup for robust form validation
- Modular structure: all API logic in `src/api/`, custom hooks in `src/hooks/`
- Per-card and global loading states for smooth UX

### Backend
- NestJS with TypeORM for scalable, modular server
- PostgreSQL as the database
- JWT authentication (login, register, protected routes)
- Project CRUD endpoints (create, read, update, delete)
- User registration and profile endpoints

### DevOps
- Docker Compose for easy local development
- Services: frontend, backend, PostgreSQL

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/)

### Local Development

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd github-crm
   ```

2. **Start with Docker Compose:**
   ```sh
   docker-compose up --build
   ```
   - This will start the PostgreSQL database, backend (NestJS), and frontend (React) services.

3. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

### Manual (Non-Docker) Setup

#### Backend
```sh
cd server
npm install
npm run start:dev
```

#### Frontend
```sh
cd client
npm install
npm run dev
```

#### Database
- Ensure PostgreSQL is running and matches the credentials in `server/src/app.module.ts` or use Docker Compose for automatic setup.

## Authentication
- Register a new user via the Register page
- Login to receive a JWT token (handled automatically by the frontend)
- All project endpoints are protected and require authentication

## Project Management
- Add, update, delete, and list projects
- Projects are associated with users
- GitHub repo search and import (via GitHub API)

## Folder Highlights
- `client/src/api/`: All API logic (project, user, GitHub)
- `client/src/hooks/`: Custom React hooks (e.g., useDebounce)
-  `client/src/pages/`: Pages
- `server/src/project/`: Project entity, controller, service, and types
- `server/src/auth/`: JWT authentication logic

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is UNLICENSED (see `server/package.json`).
