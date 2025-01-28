# Time Control Backend

This is the backend of the **Time Control App**, developed using **Node.js**, **TypeScript**, and **Express.js**. The app is deployed on Render and uses a Render PostgreSQL database. This backend serves as the API for managing users, clocks, entries, entry types, and notes.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Handles requests and business logic
├── middleware/      # Middleware for authentication and error handling
├── models/          # Database models for interacting with tables
├── routes/          # API routes definitions
├── utils/           # Utility functions (e.g., hashing, date utilities)
├── index.ts         # Entry point of the application
```

### Folders and Key Files

- **config/db.ts**: Sets up the PostgreSQL connection using the `pg` package.
- **controllers/**: Contains controllers for `user`, `entry`, `clock`, `note`, and authentication logic.
- **middleware/**:
  - `authMiddleware.ts`: Handles JWT-based authentication.
  - `errorHandler.ts`: Catches and processes server errors.
- **models/**: Contains models for database interactions for `user`, `entry`, `clock`, and `note`.
- **routes/**: Includes route definitions for `auth`, `clock`, `entry`, and `user` endpoints.
- **utils/**:
  - `dateUtils.ts`: Date manipulation utilities.
  - `hashUtils.ts`: Hashing and password comparison utilities.

## Features

- **User Authentication**: JWT-based login system.
- **Clock Management**: Add and retrieve clocks.
- **Entries and Notes**: Add and manage time entries and notes.
- **Calendar Integration**: Verify and display entries on the calendar.
- **Environment Handling**: Supports environment variables for configuration.
- **Secure Database Connection**: Uses SSL for connecting to Render PostgreSQL.


## Endpoints

### Auth

- **POST /auth/login**: Login with email and password.
- **POST /auth/register**: Register a new user (to be implemented).

### Clocks

- **GET /clocks**: Retrieve all clocks.
- **POST /clocks**: Add a new clock.

### Entries

- **GET /entries**: Retrieve all entries.
- **POST /entries**: Add a new entry.

### Notes

- **GET /notes**: Retrieve all notes.
- **POST /notes**: Add a new note.

### Users

- **GET /users**: Retrieve all users (protected).
- **GET /users/:id**: Retrieve a single user (protected).

## Development

### Scripts

- **`npm run build`**: Compiles TypeScript to JavaScript.
- **`npm run dev`**: Runs the development server using `ts-node-dev`.
- **`npm run start`**: Runs the production build.

### Dependencies

Key dependencies used:

- `express`: For building the REST API.
- `pg`: For PostgreSQL connection.
- `jsonwebtoken`: For JWT-based authentication.
- `bcryptjs`: For hashing and comparing passwords.
- `date-fns-tz`: For date and time handling.
- `dotenv`: For environment variable management.

### Dev Dependencies

- `typescript`: TypeScript support.
- `eslint`: Linting support.
- `ts-node-dev`: TypeScript live reload for development.

## Deployment

This backend is deployed on Render:

- **Render Link**: [https://time-control-server.onrender.com](https://time-control-server.onrender.com)

### Render Setup

- **Build Command**: `npm install && tsc`
- **Start Command**: `node dist/index.js`
- **Environment Variables**:
  - `DATABASE_URL`: Render PostgreSQL database connection string.
  - `SECRET_KEY`: JWT secret key.
  - `NODE_VERSION`: 22

