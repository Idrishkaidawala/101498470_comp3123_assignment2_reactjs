s# COMP3123 Assignment 1 - RESTful API

This is a Node.js RESTful API built with Express and MongoDB for user and employee management.

## Features

- User signup and login with JWT authentication
- Employee CRUD operations
- Input validation using express-validator
- Password hashing with bcryptjs
- MongoDB database integration

## API Endpoints

### User Management
- `POST /api/v1/user/signup` - Create new user account
- `POST /api/v1/user/login` - User login

### Employee Management
- `GET /api/v1/emp/employees` - Get all employees
- `POST /api/v1/emp/employees` - Create new employee
- `GET /api/v1/emp/employees/{eid}` - Get employee by ID
- `PUT /api/v1/emp/employees/{eid}` - Update employee details
- `DELETE /api/v1/emp/employees?eid={eid}` - Delete employee

Collections:
- `users`
- `employees`

## Sample User

Username: admin
Email: admin@example.com
Password: password123
