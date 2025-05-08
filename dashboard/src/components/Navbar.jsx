import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
const Navbar = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setIsDrawerOpen(newOpen);
    };

    const NAVIGATION = [{

        text: 'Dashboard',
        icon: <GridViewIcon />,
        path: '/dashboard'
    }, {
        text: 'Students',
        icon: <EmojiPeopleIcon />,
        path: '/students'
    }, {
        text: 'Users',
        icon: <GroupIcon />,
        path: '/users'
    }, {
        text: 'Logout',
        icon: <LogoutIcon />,
        path: '/'
    }]

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <img style={{ maxWidth: '100%', height: 'auto' }} src="/smu-emblem.png" alt="smu logo" />
            <List>
                {NAVIGATION.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => navigate(item.path)} >
                            <ListItemIcon sx={{ color: 'black' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ p: 1, boxShadow: 3, bgcolor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="black"
                            aria-label="menu"
                            sx={{ ml: -5, mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                            Student Information System
                        </Typography>
                        <Avatar alt="Remy Sharp" src="/smu-emblem.png" sx={{ width: 50, height: 50 }} />
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default Navbar;