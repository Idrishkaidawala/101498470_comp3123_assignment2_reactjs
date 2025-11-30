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

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer (file uploads)
- express-validator
- CORS
- dotenv

### Frontend
- React 18
- React Router DOM
- Material-UI (MUI)
- Axios
- Context API for state management

### DevOps
- Docker & Docker Compose
- Nginx (for frontend serving)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

### Option 1: Local Development

#### Backend Setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
MONGO_URI=mongodb://localhost:27017/employee_db
PORT=8084
JWT_SECRET=your_secret_key

# Start the backend
npm run dev
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:8084/api/v1" > .env

# Start the frontend
npm start
```

### Option 2: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8084
# MongoDB: mongodb://localhost:27017
```

## 🎨 Application Screenshots

### Login Screen
Modern authentication interface with gradient background and glassmorphism effects.

### Employee List
Comprehensive data table with search, filter, and action buttons for each employee.

### Add Employee
Modal form with profile picture upload, validation, and error handling.

### View Employee Details
Beautiful card layout displaying complete employee information.

### Update Employee
Pre-filled form for editing employee details with image upload capability.

## 📁 Project Structure

```
101498470_COMP3123_Assignment1/
├── backend/
│   ├── controllers/
│   │   ├── employeeController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── employee.js
│   │   └── user.js
│   ├── middleware/
│   │   └── upload.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEmployeeModal.js
│   │   │   ├── EditEmployeeModal.js
│   │   │   ├── ViewEmployeeModal.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── EmployeeList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## 🧪 Testing the Application

1. **Signup**: Create a new user account
2. **Login**: Sign in with your credentials
3. **Add Employee**: Click "Add Employee" and fill in the form
4. **Upload Picture**: Click on the avatar to upload a profile picture
5. **View Details**: Click the eye icon to view employee details
6. **Update**: Click the edit icon to modify employee information
7. **Delete**: Click the delete icon to remove an employee
8. **Search**: Use the search bar and filters to find employees

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
