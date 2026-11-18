# Backend Development Fundamentals – Lab 4
## User Registration, Login and JWT Authentication

### Student Information

| Detail | Information |
|---|---|
| **Name** | BHAGYASRI |
| **Register Number** | 252U1R5108 |
| **Course** | B.Tech – Computer Science and Engineering (AI&DE) |
| **Institution** | Aurora Higher Education and Research Academy |
| **Academic Year** | 2025–2026 |
| **Lab Number** | 04 |

---

## 1. Project Overview

This project implements a User Registration, Login and JWT Authentication system using Node.js, Express.js and SQLite.

The main purpose of this lab is to understand how backend authentication works in real-world web applications.

Users can register by providing their username, name and password. The password is securely hashed using bcrypt before being stored in the database.

Registered users can log in using their credentials. After successful login, the application generates a JSON Web Token (JWT), which is used to access protected API endpoints.

This project demonstrates the basic implementation of a secure authentication system.

## 2. Objectives

The main objectives of this lab are:

- To understand backend development using Node.js and Express.js.
- To create and manage an SQLite database.
- To implement user registration functionality.
- To validate user input.
- To securely hash passwords using bcrypt.
- To implement user login authentication.
- To generate JWT tokens.
- To understand authentication middleware.
- To protect API endpoints using JWT authentication.
- To test REST APIs using Postman.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Creating REST API endpoints |
| SQLite3 | Storing user information |
| bcrypt | Hashing passwords securely |
| jsonwebtoken | Generating and verifying JWT tokens |
| Postman | Testing API endpoints |
| Git | Version control |
| GitHub | Hosting and managing project code |

## 4. Project Folder Structure

The project contains the following important files and folders:

```text
BDFLAB-04/
│
├── lab-04/
│   ├── config/
│   │   ├── database.js
│   │   └── jwt.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── database/
│   │   └── users.db
│   │
│   ├── screenshots/
│   │   ├── 01-register-success.png
│   │   ├── 02-login-success.png
│   │   ├── 03-profile-success.png
│   │   ├── 04-register-duplicate.png
│   │   ├── 05-login-invalid.png
│   │   ├── 06-profile-unauthorized.png
│   │   └── 07-database-password-hash.png
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
└── README.md
```

**Note:** The SQLite database file is created locally and is excluded from Git if configured in `.gitignore`.

### Description of Important Files

- **server.js:** Starts the Express server and connects the application routes.
- **config/database.js:** Handles SQLite database configuration and initialization.
- **config/jwt.js:** Contains JWT configuration.
