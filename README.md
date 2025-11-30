# 101498470_COMP3123_Assignment2 - Employee Management System

A full-stack Employee Management System built with **React**, **Node.js**, **Express**, and **MongoDB**. This application provides a complete CRUD interface for managing employee records with authentication, file uploads, and search functionality.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration with Mongoose
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ File upload support for employee profile pictures (Multer)
- ✅ Input validation with express-validator
- ✅ Search functionality by department and position
- ✅ CORS enabled for frontend integration

### Frontend (React + Material-UI)
- ✅ Modern, responsive UI with Material-UI
- ✅ User authentication (Login/Signup)
- ✅ Session management with localStorage
- ✅ Employee CRUD operations
- ✅ Profile picture upload with preview
- ✅ Search and filter employees
- ✅ Form validation with error messages
- ✅ Protected routes
- ✅ Premium design with gradients and animations

## 📋 API Endpoints

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/signup` | Create new user account |
| POST | `/api/v1/user/login` | User login |

### Employee Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/emp/employees` | Get all employees (supports search) |
| POST | `/api/v1/emp/employees` | Create new employee (with file upload) |
| GET | `/api/v1/emp/employees/:eid` | Get employee by ID |
| PUT | `/api/v1/emp/employees/:eid` | Update employee (with file upload) |
| DELETE | `/api/v1/emp/employees?eid=:eid` | Delete employee |

### Search Parameters
- `department` - Filter by department name
- `position` - Filter by position title

## 👨‍💻 Author

**Student ID**: 101498470  
**Course**: COMP3123 - Full Stack Development  
**Assignment**: Assignment 2 - React Frontend

## 📄 License

This project is created for educational purposes as part of COMP3123 coursework.

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Express.js for the backend framework
- React for the frontend framework
