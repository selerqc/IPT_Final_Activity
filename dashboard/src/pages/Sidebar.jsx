import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

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
      <img style={{ maxWidth: '100%', height: 'auto' }} src="https://smu.edu.ph/wp-content/uploads/2021/08/seconday-emblem.png" alt="smu logo" />
      <List>
        {NAVIGATION.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)} >
              <ListItemIcon>
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
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', bottom: 16, left: 16, backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#115293' } }}
      >
        <MenuOpenIcon sx={{ fontSize: 30 }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  );
}
