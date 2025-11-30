import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Box,
    Avatar,
    Typography,
    Divider,
    Chip,
} from '@mui/material';
import {
    Email,
    Work,
    Business,
    AttachMoney,
    CalendarToday,
} from '@mui/icons-material';

const ViewEmployeeModal = ({ open, employee, onClose }) => {
    if (!employee) return null;

    const getAvatarUrl = (profilePicture) => {
        if (profilePicture) {
            return `http://localhost:8084${profilePicture}`;
        }
        return null;
    };

    const InfoRow = ({ icon, label, value }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
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
                Employee Details
            </DialogTitle>
            <DialogContent sx={{ pt: 4 }}>
                {/* Profile Section */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                        src={getAvatarUrl(employee.profile_picture)}
                        sx={{
                            width: 120,
                            height: 120,
                            margin: '0 auto',
                            mb: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: '3rem',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                        }}
                    >
                        {employee.first_name[0]}
                    </Avatar>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        {employee.first_name} {employee.last_name}
                    </Typography>
                    <Chip
                        label={employee.position}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 600,
                            px: 2,
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Employee Information */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InfoRow
                            icon={<Email />}
                            label="Email Address"
                            value={employee.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow
                            icon={<Work />}
                            label="Position"
                            value={employee.position}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow
                            icon={<Business />}
                            label="Department"
                            value={employee.department}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow
                            icon={<AttachMoney />}
                            label="Salary"
                            value={`$${employee.salary.toLocaleString()}`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InfoRow
                            icon={<CalendarToday />}
                            label="Date of Joining"
                            value={new Date(employee.date_of_joining).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(102, 126, 234, 0.05)',
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Employee ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                        {employee.employee_id}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                        },
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewEmployeeModal;
