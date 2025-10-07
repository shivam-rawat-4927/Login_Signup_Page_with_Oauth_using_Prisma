# Login & Signup Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

> A beginner-friendly full-stack authentication project built with **React**, **Express**, **Prisma**, and **MySQL**. Users can register, log in, and view a protected profile using a clean, responsive UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database & Prisma](#database--prisma)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [Testing the Flow](#testing-the-flow)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User registration and login** using JSON Web Tokens
- **Password hashing** with bcrypt for secure credential storage
- **Protected profile endpoint** that requires a valid token
- **Modern React UI** with enhanced design and responsive layout
- **RESTful API** with clean error handling and simple code structure

## Tech Stack

- **Frontend:** React, React Router, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MySQL with Prisma ORM
- **Auth:** JWT tokens stored in `localStorage`
- **Tooling:** Nodemon, Axios (fetch), ESLint (Create React App defaults)

## Architecture

```
React (frontend) ──▶ Express API ──▶ Prisma ORM ──▶ MySQL
```

- The frontend sends auth requests to the backend.
- The backend validates credentials, hashes passwords, and issues JWTs.
- Prisma handles all database communication with MySQL.

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MySQL server running locally or hosted

### 1. Clone the Repository

```bash
git clone https://github.com/shivam-rawat-4927/Login_Signup_Page_with_Oauth_using_Prisma.git
cd Login_Signup_Page_with_Oauth_using_Prisma
```

<details>
<summary>✨ Quick start</summary>

```bash
git clone https://github.com/shivam-rawat-4927/Login_Signup_Page_with_Oauth_using_Prisma.git
cd Login_Signup_Page_with_Oauth_using_Prisma
npm install
cd backend && npm install
cd ../frontend && npm install
```

</details>

<details>
<summary>🛠️ Manual setup</summary>

### 2. Install Dependencies

```bash
npm install             # installs root tooling (optional)
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure Environment

```bash
# inside backend/
cp .env.example .env
```

Update `.env` with your MySQL credentials (see [Environment Variables](#environment-variables)).

### 4. Set Up Database

```bash
cd backend
npx prisma migrate dev
```

This creates the database schema defined in `backend/prisma/schema.prisma`.

### 5. Run the Apps

```bash
# Backend (port 5001)
cd backend
npm run dev

# Frontend (port 3000)
cd ../frontend
npm start
```

Open `http://localhost:3000` to access the UI.

</details>

## Environment Variables

`backend/.env` (copy from `.env.example`):

| Variable        | Description                                           | Example                                           |
|-----------------|-------------------------------------------------------|---------------------------------------------------|
| `PORT`          | Express server port                                   | `5001`                                            |
| `DATABASE_URL`  | Prisma connection string for MySQL                    | `mysql://user:password@localhost:3306/database`   |
| `JWT_SECRET`    | Secret key for signing JWT tokens                     | `super-secret-key`                                |

## Database & Prisma

- Prisma schema lives in `backend/prisma/schema.prisma`.
- Run migrations with `npx prisma migrate dev`.
- Inspect the database using `npx prisma studio` (optional).

## Available Scripts

| Path        | Command               | Description                         |
|-------------|-----------------------|-------------------------------------|
| `backend/`  | `npm run dev`         | Start Express server with nodemon   |
| `backend/`  | `npm test`            | *(placeholder)* add tests here      |
| `frontend/` | `npm start`           | Start React dev server              |
| `frontend/` | `npm run build`       | Build production assets             |

## API Reference

Base URL: `http://localhost:5001/api`

| Method | Endpoint              | Description            | Auth Required |
|--------|-----------------------|------------------------|---------------|
| `POST` | `/auth/register`      | Register new user      | No            |
| `POST` | `/auth/login`         | Login and get token    | No            |
| `GET`  | `/auth/profile`       | Fetch logged-in user   | Yes (JWT)     |

### Example Login Request

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123"}'
```

### Example Profile Request

```bash
TOKEN="<paste token here>"
curl -X GET http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

Use the `token` from the response in the `Authorization: Bearer <token>` header for protected endpoints.

## Frontend Routes

- `/login` – Login form
- `/signup` – Registration form
- `/dashboard` – Protected page showing user info

## Testing the Flow

1. Register via UI or curl.
2. Log in and store the JWT (automatically saved in `localStorage`).
3. Visit `/dashboard` to view the protected profile page.

## Troubleshooting

- **Prisma migration fails:** Ensure MySQL user has `CREATE DATABASE` permissions.
- **Cannot connect to DB:** Double-check `DATABASE_URL` and that MySQL is running.
- **Login fails:** Confirm the password is correct and the user exists in MySQL.
- **CORS issues:** The backend allows requests from `http://localhost:3000` by default; update `backend/index.js` if needed.

## Project Structure

```
Login_Signup_Page_with_Oauth_using_Prisma
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── components/
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request referencing related issues (e.g., `Fixes #2`).

## License

This project is licensed under the **MIT License**.
