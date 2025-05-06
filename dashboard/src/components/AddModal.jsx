import React from 'react';
import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ReusableModal = ({ open, onClose, title, fields, data, handleChange, handleSubmit }) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ width: "30%", margin: "auto" }}>
            <Box className="modal-box" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Grid container spacing={2}>
                    {fields.map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                label={field}
                                name={field}
                                value={data[field]}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default ReusableModal;