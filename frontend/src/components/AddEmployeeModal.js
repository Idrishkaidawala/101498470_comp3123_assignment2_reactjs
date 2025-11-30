import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    Avatar,
    Typography,
    Alert,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { createEmployee } from '../services/api';

const AddEmployeeModal = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
        setApiError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, profile_picture: 'Please select an image file' });
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, profile_picture: 'File size must be less than 5MB' });
                return;
            }
            setProfilePicture(file);
            setPreviewUrl(URL.createObjectURL(file));
            setErrors({ ...errors, profile_picture: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.position.trim()) {
            newErrors.position = 'Position is required';
        }
        if (!formData.salary) {
            newErrors.salary = 'Salary is required';
        } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
            newErrors.salary = 'Salary must be a positive number';
        }
        if (!formData.date_of_joining) {
            newErrors.date_of_joining = 'Date of joining is required';
        }
        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            if (profilePicture) {
                formDataToSend.append('profile_picture', profilePicture);
            }

            await createEmployee(formDataToSend);
            handleClose();
            onSuccess();
        } catch (error) {
            setApiError(error.response?.data?.message || 'Failed to add employee. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            position: '',
            salary: '',
            date_of_joining: '',
            department: '',
        });
        setProfilePicture(null);
        setPreviewUrl(null);
        setErrors({});
        setApiError('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 },
            }}
        >
            <DialogTitle
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                }}
            >
                Add New Employee
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 3 }}>
                    {apiError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                            {apiError}
                        </Alert>
                    )}

                    {/* Profile Picture Upload */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="profile-picture-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="profile-picture-upload">
                            <Avatar
                                src={previewUrl}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: '0 auto',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        opacity: 0.8,
                                    },
                                }}
                            >
                                <CloudUpload sx={{ fontSize: 40 }} />
                            </Avatar>
                        </label>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Click to upload profile picture (optional)
                        </Typography>
                        {errors.profile_picture && (
                            <Typography variant="caption" color="error">
                                {errors.profile_picture}
                            </Typography>
                        )}
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                error={!!errors.first_name}
                                helperText={errors.first_name}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                error={!!errors.position}
                                helperText={errors.position}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                error={!!errors.department}
                                helperText={errors.department}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Salary"
                                name="salary"
                                type="number"
                                value={formData.salary}
                                onChange={handleChange}
                                error={!!errors.salary}
                                helperText={errors.salary}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Joining"
                                name="date_of_joining"
                                type="date"
                                value={formData.date_of_joining}
                                onChange={handleChange}
                                error={!!errors.date_of_joining}
                                helperText={errors.date_of_joining}
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                            },
                        }}
                    >
                        {loading ? 'Adding...' : 'Add Employee'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddEmployeeModal;
