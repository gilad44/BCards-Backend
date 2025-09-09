# 🔧 Configuration Setup Guide

This guide explains how to set up the configuration files for the BCards Backend API.

## 📁 Configuration Files

### 1. `config/default.json` (Already configured)

Contains the JWT secret key. **Update this with a strong secret before production use.**

### 2. `config/development.json` (Ready to use)

Contains development environment settings with local MongoDB connection.

### 3. `config/production.json` (MUST BE CREATED)

Contains production environment settings. **This file is not included in the repository for security.**

## 🚀 Setup Instructions

### For Development (Local MongoDB)

1. Make sure MongoDB is running locally on port 27017
2. Run: `npm run dev`
3. The app will use `config/development.json` settings

### For Production (MongoDB Atlas)

1. **Copy the example file:**

   ```bash
   cp config/production.json.example config/production.json
   ```

2. **Edit `config/production.json` with your real values:**

   ```json
   {
     "NODE_ENV": "production",
     "PORT": 9191,
     "TOKEN_GENERATOR": "jwt",
     "DB_NAME": "mongodb+srv://username:password@cluster.mongodb.net/BCards",
     "DB_PASSWORD": "your-actual-password",
     "LOGGER": "morgan",
     "DB": "MONGODB"
   }
   ```

3. **Update `config/default.json` with a strong JWT secret:**

   ```json
   {
     "JWT_KEY": "your-very-strong-and-long-jwt-secret-key-here"
   }
   ```

4. **Run production:**
   ```bash
   npm start
   ```

## 🔐 Security Notes

- **Never commit `config/production.json`** - it's in `.gitignore`
- **Always use strong, unique passwords**
- **Use a long, random JWT secret key**
- **Keep your MongoDB credentials secure**

## 📝 Environment Variables Alternative

If you prefer environment variables over config files, you can modify the code to use:

- `process.env.JWT_SECRET`
- `process.env.MONGODB_URI`
- `process.env.PORT`

This would be more secure for production deployments.
