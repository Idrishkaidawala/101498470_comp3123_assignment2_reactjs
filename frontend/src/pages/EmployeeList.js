import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Avatar,
    Chip,
    TextField,
    InputAdornment,
    AppBar,
    Toolbar,
    Alert,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Tooltip,
    Grid,
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Visibility,
    Logout,
    Search as SearchIcon,
    Person,
    FilterList,
} from '@mui/icons-material';
import { getAllEmployees, deleteEmployee } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EditEmployeeModal from '../components/EditEmployeeModal';
import ViewEmployeeModal from '../components/ViewEmployeeModal';

const EmployeeList = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');

    // Modals
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        filterEmployees();
    }, [employees, searchTerm, departmentFilter, positionFilter]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            showSnackbar('Failed to fetch employees', 'error');
        } finally {
            setLoading(false);
        }
    };

    const filterEmployees = () => {
        let filtered = employees;

        if (searchTerm) {
            filtered = filtered.filter(
                (emp) =>
                    emp.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (departmentFilter) {
            filtered = filtered.filter((emp) =>
                emp.department.toLowerCase().includes(departmentFilter.toLowerCase())
            );
        }

        if (positionFilter) {
            filtered = filtered.filter((emp) =>
                emp.position.toLowerCase().includes(positionFilter.toLowerCase())
            );
        }

        setFilteredEmployees(filtered);
    };

    const handleDelete = async () => {
        try {
            await deleteEmployee(selectedEmployee.employee_id);
            showSnackbar('Employee deleted successfully', 'success');
            fetchEmployees();
            setDeleteDialogOpen(false);
        } catch (error) {
            showSnackbar('Failed to delete employee', 'error');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleView = (employee) => {
        setSelectedEmployee(employee);
        setViewModalOpen(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
    };

    const getAvatarUrl = (profilePicture) => {
        if (profilePicture) {
            return `http://localhost:8084${profilePicture}`;
        }
        return null;
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            {/* AppBar */}
            <AppBar position="static" elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <Toolbar>
                    <Person sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Employee Management System
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Welcome, {user?.username}
                    </Typography>
                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            borderRadius: 2,
                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Employee Directory
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setAddModalOpen(true)}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                },
                            }}
                        >
                            Add Employee
                        </Button>
                    </Box>

                    {/* Search and Filters */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'white',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Filter by department..."
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterList />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'white',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Filter by position..."
                                value={positionFilter}
                                onChange={(e) => setPositionFilter(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterList />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'white',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Showing {filteredEmployees.length} of {employees.length} employees
                    </Typography>
                </Paper>

                {/* Employee Table */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Employee</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Position</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Department</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Salary</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Joining Date</TableCell>
                                        <TableCell align="center" sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEmployees.map((employee) => (
                                        <TableRow
                                            key={employee.employee_id}
                                            sx={{
                                                '&:hover': { background: 'rgba(102, 126, 234, 0.05)' },
                                                transition: 'background 0.3s',
                                            }}
                                        >
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar
                                                        src={getAvatarUrl(employee.profile_picture)}
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        }}
                                                    >
                                                        {employee.first_name[0]}
                                                    </Avatar>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {employee.first_name} {employee.last_name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={employee.position}
                                                    size="small"
                                                    sx={{
                                                        background: 'rgba(102, 126, 234, 0.1)',
                                                        color: '#667eea',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{employee.department}</TableCell>
                                            <TableCell>${employee.salary.toLocaleString()}</TableCell>
                                            <TableCell>{new Date(employee.date_of_joining).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleView(employee)}
                                                        sx={{ color: '#667eea' }}
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEdit(employee)}
                                                        sx={{ color: '#4caf50' }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteClick(employee)}
                                                        sx={{ color: '#f44336' }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredEmployees.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                                <Typography variant="h6" color="text.secondary">
                                                    No employees found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>

            {/* Modals */}
            <AddEmployeeModal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSuccess={() => {
                    fetchEmployees();
                    showSnackbar('Employee added successfully');
                }}
            />

            <EditEmployeeModal
                open={editModalOpen}
                employee={selectedEmployee}
                onClose={() => setEditModalOpen(false)}
                onSuccess={() => {
                    fetchEmployees();
                    showSnackbar('Employee updated successfully');
                }}
            />

            <ViewEmployeeModal
                open={viewModalOpen}
                employee={selectedEmployee}
                onClose={() => setViewModalOpen(false)}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: { borderRadius: 3 },
                }}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete {selectedEmployee?.first_name} {selectedEmployee?.last_name}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ borderRadius: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmployeeList;
