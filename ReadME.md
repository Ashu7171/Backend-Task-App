# TaskApp – Backend Developer Intern Assignment

A secure, scalable REST API with JWT authentication, role-based access (user/admin), and CRUD operations — paired with a minimal React frontend for demonstration.

Built in 3 days for the **Backend Developer Intern** role.

---

## Structure
- `/backend` → Express + MongoDB (Node.js)
- `/frontend` → Vite + React + Tailwind

---

## Features Implemented
- User registration & login with **password hashing** (`bcrypt`)
- **JWT auth** via secure `HttpOnly` cookies
- **Role-based access**: `user` vs `admin`
- CRUD for **Tasks** with ownership enforcement
- Input validation with **Joi**
- Centralized error handling & API responses
- Simple frontend with **login, register, logout**, and **toast messages**

---

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Joi
- **Frontend**: React, Vite, Tailwind CSS
- **Security**: HttpOnly cookies, bcrypt, CORS, helmet
- **Testing**: Thunder Client (collection included in `/backend/docs`)

---

## Quick Start
1. Clone repo  
2. Run backend:
   ```bash
   cd backend
   npm install
   # Create .env (see backend/README.md)
   npm run dev