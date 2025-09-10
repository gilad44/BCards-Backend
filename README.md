# 🃏 BCards Backend API

A RESTful API server for the BCards business card management system. Built with Node.js, Express, and MongoDB, providing secure authentication, user management, and business card operations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Default Credentials](#default-credentials)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

BCards Backend is a robust Node.js/Express API server that provides complete business card management functionality. The server handles user authentication, role-based authorization, business card CRUD operations, and includes comprehensive data validation and error handling.

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based authentication with configurable secret key
- Role-based access control (Regular, Business, Admin)
- Secure password hashing with bcryptjs
- Token-based session management (24-hour expiration)
- Protected route middleware

### 👤 User Management API

- User registration with data validation
- Secure login with password verification
- Profile management and updates
- Business status toggle functionality
- Admin user management capabilities
- User deletion with proper authorization

### 🃏 Business Card API

- Complete CRUD operations for business cards
- Business user restrictions for card creation
- Card ownership validation for edits
- Like/unlike functionality with user tracking
- Unique business number generation
- Comprehensive card data validation

### 🛡️ Security & Validation

- Joi schema validation for all inputs
- MongoDB injection protection
- Error handling and logging
- CORS configuration for cross-origin requests
- Request logging with Morgan

### 📝 Advanced Logging

- **Console logging** for all HTTP requests with color coding
- **File logging** for errors (status codes 400+)
- **Automatic log file creation** with timestamp-based naming
- **Detailed error information** including request data, status codes, and error messages
- **Logs folder organization** with individual files per error

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi validation library
- **Password Hashing:** bcryptjs
- **HTTP Logging:** Morgan with custom formatting
- **Environment Management:** node-config
- **Development:** Nodemon with cross-env

## 📁 Project Structure

```
BCards/
├── Backend/                    # Node.js/Express API server
│   ├── auth/                   # Authentication services
│   │   ├── authService.js      # Auth middleware
│   │   └── Providers/          # JWT provider
│   ├── cards/                  # Card management module
│   │   ├── models/             # Card data models
│   │   ├── routes/             # Card API routes
│   │   ├── services/           # Card business logic
│   │   ├── validations/        # Card validation schemas
│   │   └── helpers/            # Card utility functions
│   ├── users/                  # User management module
│   │   ├── models/             # User data models
│   │   ├── routes/             # User API routes
│   │   ├── services/           # User business logic
│   │   ├── validations/        # User validation schemas
│   │   └── helpers/            # User utility functions
│   ├── config/                 # Environment configurations
│   │   ├── default.json        # Default config
│   │   ├── development.json    # Development config
│   │   └── production.json     # Production config
│   ├── DB/                     # Database connection
│   ├── initialData/            # Seed data
│   ├── logger/                 # Logging services
│   ├── middleware/             # Custom middleware
│   ├── router/                 # Main router
│   ├── utils/                  # Utility functions
│   └── server.js               # Application entry point
│
└── Frontend/                   # React TypeScript application
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/              # Page components
    │   ├── types/              # TypeScript type definitions
    │   ├── hooks/              # Custom React hooks
    │   ├── store/              # Redux store configuration
    │   ├── slices/             # Redux slices
    │   ├── styles/             # CSS and styling
    │   └── validations/        # Form validation schemas
    ├── public/                 # Static assets
    └── package.json            # Frontend dependencies
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BCards
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

The backend uses `node-config` for environment management.

**📋 Quick Setup:**

1. For development: Configuration is ready (uses local MongoDB)
2. For production: See `Backend/CONFIG_SETUP.md` for detailed setup instructions

**🔐 Security Note:**
The production config file is not included in this repository for security. You'll need to create it based on the example provided.

### Configuration Files Overview

- `config/development.json` - Development settings (included)
- `config/default.json` - JWT secret (update before use)
- `config/production.json` - Production settings (create from example)

**For detailed configuration instructions, see: `Backend/CONFIG_SETUP.md`**

## 🏃‍♂️ Running the Application

### Development Mode

#### Start Backend (Development)

```bash
cd Backend
npm run dev          # Runs on http://localhost:8181
```

#### Start Frontend (Development)

```bash
cd Frontend
npm run dev          # Runs on http://localhost:5173
```

### Production Mode

#### Start Backend (Production)

```bash
cd Backend
npm start            # Runs on http://localhost:9191
```

#### Build and Serve Frontend

```bash
cd Frontend
npm run build
npm run preview
```

## 📚 API Documentation

### Base URL

- **Development:** `http://localhost:8181`
- **Production:** `http://localhost:9191`

### Authentication Endpoints

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| `POST` | `/users`       | Register new user | No            |
| `POST` | `/users/login` | User login        | No            |

### User Management Endpoints

| Method   | Endpoint     | Description            | Auth Required | Admin Only  |
| -------- | ------------ | ---------------------- | ------------- | ----------- |
| `GET`    | `/users`     | Get all users          | Yes           | Yes         |
| `GET`    | `/users/:id` | Get user by ID         | Yes           | Owner/Admin |
| `PUT`    | `/users/:id` | Update user            | Yes           | Owner/Admin |
| `PATCH`  | `/users/:id` | Toggle business status | Yes           | Owner/Admin |
| `DELETE` | `/users/:id` | Delete user            | Yes           | Owner/Admin |

### Business Card Endpoints

| Method   | Endpoint          | Description      | Auth Required | Business Only |
| -------- | ----------------- | ---------------- | ------------- | ------------- |
| `GET`    | `/cards`          | Get all cards    | No            | No            |
| `GET`    | `/cards/my-cards` | Get user's cards | Yes           | No            |
| `GET`    | `/cards/:id`      | Get card by ID   | No            | No            |
| `POST`   | `/cards`          | Create new card  | Yes           | Yes           |
| `PUT`    | `/cards/:id`      | Update card      | Yes           | Owner only    |
| `PATCH`  | `/cards/:id`      | Like/unlike card | Yes           | No            |
| `DELETE` | `/cards/:id`      | Delete card      | Yes           | Owner/Admin   |

### Request Headers

```javascript
{
  "Content-Type": "application/json",
  "x-auth-token": "your-jwt-token"  // For authenticated requests
}
```

## 👥 User Roles

### 1. Regular User

- ✅ View all business cards
- ✅ Like/unlike cards
- ✅ Update own profile
- ❌ Cannot create business cards

### 2. Business User

- ✅ All Regular User permissions
- ✅ Create business cards
- ✅ Edit own business cards
- ✅ View "My Cards" collection

### 3. Admin User

- ✅ All Business User permissions
- ✅ View all users
- ✅ Delete any user
- ✅ Delete any business card
- ✅ Manage user business status

## 🔑 Default Credentials

The application comes with pre-seeded users for testing:

### Regular User

- **Email:** `regular@gmail.com`
- **Password:** `Aa1234!Y%`

### Business User

- **Email:** `business@gmail.com`
- **Password:** `Aa1234!p*`

### Admin User

- **Email:** `admin@gmail.com`
- **Password:** `Aa1234!U&`

## 🗄️ Database Schema

### User Schema

```javascript
{
  name: {
    first: String (required, 2-50 chars),
    last: String (required, 2-50 chars)
  },
  phone: String (10-15 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed),
  image: {
    url: String (valid image URL),
    alt: String (2+ chars)
  },
  address: {
    state: String (2+ chars),
    country: String (required, 2+ chars),
    city: String (required, 2+ chars),
    street: String (required, 2+ chars),
    houseNumber: Number (required),
    zip: Number
  },
  isAdmin: Boolean (default: false),
  isBusiness: Boolean (default: false),
  createdAt: Date (auto-generated)
}
```

### Business Card Schema

```javascript
{
  title: String (required, 2+ chars),
  subtitle: String (required, 2+ chars),
  description: String (required, 2+ chars),
  phone: String (required, Israeli format),
  email: String (required, valid email),
  web: String (required, valid URL),
  image: {
    url: String (valid image URL),
    alt: String (2+ chars)
  },
  address: {
    state: String (2+ chars),
    country: String (required, 2+ chars),
    city: String (required, 2+ chars),
    street: String (required, 2+ chars),
    houseNumber: Number (required),
    zip: Number (required)
  },
  bizNumber: Number (auto-generated, unique),
  user_id: ObjectId (reference to User),
  likes: [String] (array of user IDs),
  createdAt: Date (auto-generated)
}
```

## 🌍 Environment Variables

### Backend Environment Variables

- `NODE_ENV`: Application environment (development/production)
- `PORT`: Server port number
- `JWT_KEY`: Secret key for JWT token signing
- `DB_NAME`: MongoDB connection string
- `TOKEN_GENERATOR`: Token generation method (jwt)
- `LOGGER`: Logging service (morgan)
- `DB`: Database type (MONGODB)

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Failed

```bash
# Check MongoDB service status
# Local MongoDB
sudo systemctl status mongod

# For MongoDB Atlas
# Verify connection string and network access
```

#### 2. Port Already in Use

```bash
# Find process using the port
netstat -ano | findstr :8181

# Kill the process (Windows)
taskkill /PID <PID> /F
```

#### 3. JWT Token Issues

- Verify `JWT_KEY` is set in configuration
- Check token expiration (24 hours default)
- Ensure `x-auth-token` header is included in requests

#### 4. CORS Issues

- Frontend origin is configured in `Backend/middleware/cors.js`
- Default allowed origins: `http://localhost:5173`, `http://127.0.0.1:5500`

### Debug Mode

```bash
# Backend debug mode
cd Backend
DEBUG=* npm run dev

# Frontend debug mode
cd Frontend
npm run dev -- --debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use TypeScript for frontend development
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🚀**
