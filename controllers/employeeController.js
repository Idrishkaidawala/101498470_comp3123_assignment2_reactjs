const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    let query = {};

    // Build search query
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }
    if (position) {
      query.position = { $regex: position, $options: 'i' };
    }

    const employees = await Employee.find(query);
    const formattedEmployees = employees.map(emp => ({
      employee_id: emp._id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
      profile_picture: emp.profile_picture,
    }));
    res.status(200).json(formattedEmployees);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ status: false, message: 'Employee with this email already exists' });
    }

    const employeeData = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    };

    // Add profile picture if uploaded
    if (req.file) {
      employeeData.profile_picture = `/uploads/${req.file.filename}`;
    }

    const employee = new Employee(employeeData);
    await employee.save();

    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: employee._id,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { eid } = req.params;
    const employee = await Employee.findById(eid);
    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(200).json({
      employee_id: employee._id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      position: employee.position,
      salary: employee.salary,
      date_of_joining: employee.date_of_joining,
      department: employee.department,
      profile_picture: employee.profile_picture,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { eid } = req.params;
    const updates = req.body;

    // Add profile picture if uploaded
    if (req.file) {
      updates.profile_picture = `/uploads/${req.file.filename}`;
    }

    updates.updated_at = Date.now();

    const employee = await Employee.findByIdAndUpdate(eid, updates, { new: true });
    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee details updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { eid } = req.query;
    const employee = await Employee.findByIdAndDelete(eid);
    if (!employee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
