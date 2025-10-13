const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, message: errors.array()[0].msg });
  }
  next();
};

// Validation middleware
const createEmployeeValidation = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('date_of_joining').isISO8601().withMessage('Valid date is required'),
  body('department').notEmpty().withMessage('Department is required'),
];

const updateEmployeeValidation = [
  body('position').optional().notEmpty().withMessage('Position is required'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
];

const employeeIdValidation = [
  param('eid').isMongoId().withMessage('Valid employee ID is required'),
];

const deleteEmployeeValidation = [
  query('eid').isMongoId().withMessage('Valid employee ID is required'),
];

// Routes
router.get('/employees', getAllEmployees);
router.post('/employees', createEmployeeValidation, handleValidationErrors, createEmployee);
router.get('/employees/:eid', employeeIdValidation, handleValidationErrors, getEmployeeById);
router.put('/employees/:eid', employeeIdValidation.concat(updateEmployeeValidation), handleValidationErrors, updateEmployee);
router.delete('/employees', deleteEmployeeValidation, handleValidationErrors, deleteEmployee);

module.exports = router;
