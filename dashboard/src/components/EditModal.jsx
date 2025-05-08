import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
const EditModal = ({ open, onClose, data, handleChange, handleSubmit, title, fields }) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ width: "30%", margin: "auto", }}>
            <Box className='modal-box' sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {title}
                </Typography>
                {fields.map((field) => (
                    <TextField
                        key={field}
                        className='text-field'
                        label={field}
                        name={field}
                        value={data[field]}
                        onChange={handleChange}
                        fullWidth
                        disabled={field === 'userId' || field === 'idNumber'}
                        margin='normal'

                    />
                ))}
                <Button
                    variant='contained'
                    className='submit-button'
                    onClick={handleSubmit}>
                    Update
                </Button>
            </Box>
        </Modal>
    );
};

export default EditModal;