import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from '@mui/material';

export default function SimpleAlert({ message, severity }) {
    return (
        <Alert variant='filled'
            icon={<CheckIcon fontSize="inherit" />}
            severity={severity}
            sx={{
                zIndex: 1000, position: 'absolute', top: '10px', right: '10px',
            }}>
            {message}
        </Alert>
    );
}
