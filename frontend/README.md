# Frontend – Simple UI for API Demo

A minimal **React** frontend built with **Vite + Tailwind CSS** to demonstrate and interact with the backend APIs.

Features login, registration, logout, and toast notifications — no complex state management.

---

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State**: Context API (lightweight auth state)
- **HTTP**: Native `fetch` with `credentials: 'include'`

---

### Setup

### 1. Install Dependencies
```bash
npm install
```
### 2. Start the frontend
```bash
npm run dev
```

All protected routes require a valid JWT cookie. 

### Project Structure
```bash
/controllers    → Route logic
/middleware     → Auth, RBAC, validation
/models         → Mongoose schemas
/routes/v1      → Versioned API routes
/validators     → Joi validation schemas
/utils          → ApiError, ApiResponse
/docs           → Thunder Client collection


### Testing with Thunder Client
Import docs/thunder-client.json into Thunder Client (VS Code)
Test auth flow: Register → Login → /me → Logout

### Security Notes
Passwords are hashed with bcrypt
JWT stored in HttpOnly cookies (XSS-safe)
Input validated with Joi
CORS restricted to frontend origin (http://localhost:5173)

### Scalability Considerations
Modular structure supports easy addition of new entities (e.g., /products)
Stateless auth enables horizontal scaling
Ready for Dockerization and Redis caching (future)

```