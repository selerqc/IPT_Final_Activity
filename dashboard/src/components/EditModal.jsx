import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const EditModal = ({ open, onClose, data, handleChange, handleSubmit, title, fields }) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ width: "30%", margin: "auto" }}>
            <Box className='modal-box' sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24 }}>
                <h2 className='modal-header'>{title}</h2>
                {fields.map((field) => (
                    <TextField
                        key={field}
                        className='text-field'
                        label={field}
                        name={field}
                        value={data[field]}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        disabled={field === 'userId'}
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