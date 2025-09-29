# Backend – Secure REST API with JWT & RBAC

A scalable, secure backend built with **Node.js + Express**, featuring **JWT authentication**, **role-based access control (user/admin)**, and **CRUD operations** for tasks.

Built for the **Backend Developer Intern Assignment**.

---

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT + `HttpOnly` cookies
- **Validation**: Joi
- **Security**: `bcrypt`, `helmet`, `cors`, `cookie-parser`
- **Error Handling**: Custom `ApiError` + centralized middleware
- **API Testing**: Thunder Client (collection included)

---

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env file
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_strong_secret_here_32_chars_min
JWT_EXPIRE=30m

### 3. Start the server
```bash
nodemon server.js (or) 
node server.js
```

### API Endpoints :
**Method**  **API**                    **Function**
POST        /api/v1/auth/register      Create user
POST        /api/v1/auth/login         Authenticate
GET         /api/v1/auth/me             Get current user
POST        /api/v1/auth/logout        End session
GET         /api/health                 Health check

### Folder Structure :
/controllers    → Route logic
/middleware     → Auth, RBAC, validation
/models         → Mongoose schemas
/routes/v1      → Versioned API routes
/validators     → Joi validation schemas
/utils          → ApiError, ApiResponse
/docs           → Thunder Client collection