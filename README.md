# Login & Signup Application

Simple full-stack authentication app using React, Express, Prisma, and MySQL.

## Project Structure

```
backend/
frontend/
```

## Setup

1. Install root dependencies: `npm install`
2. Install backend deps: `cd backend && npm install`
3. Install frontend deps: `cd frontend && npm install`
4. Copy backend `.env.example` to `.env` and update `DATABASE_URL`
5. Run Prisma migrate: `cd backend && npx prisma migrate dev`

## Development

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm start`

## Features

- User signup & login with JWT
- Password hashing with bcrypt
- Protected profile route
- Responsive React UI

## License

MIT
