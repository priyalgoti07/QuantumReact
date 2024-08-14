import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Box, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

const LeftNavbar: React.FC = () => {

    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    return (
        <div style={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        My Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem component={Link} to="/home">
                        <ListItemText primary="Home" />
                    </ListItem>
                    {/* User ListItem with hover submenu */}
                    <ListItem
                        onMouseEnter={() => setUserMenuOpen(true)}
                        onMouseLeave={() => setUserMenuOpen(false)}
                        sx={{ position: 'relative' }}
                    >
                        <ListItemIcon>
                            {/* <PeopleIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItem>

                    {/* Submenu for User */}
                    {userMenuOpen && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '100%',  // Position the submenu above the parent item
                                left: 0,
                                width: '100%',  // Match the width of the parent item
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 3,
                                zIndex: 1,
                            }}
                        // onMouseEnter={handleMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                        >
                            <List component="div" disablePadding>
                                <ListItem
                                    component={Link}
                                    to="/user/profile"
                                    button
                                    sx={{ pl: 2 }}
                                >
                                    <ListItemIcon>
                                        {/* <PersonIcon /> */}
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/user/group"
                                    button
                                    sx={{ pl: 2 }}
                                >
                                    <ListItemIcon>
                                        {/* <GroupIcon /> */}
                                    </ListItemIcon>
                                    <ListItemText primary="Group" />
                                </ListItem>
                            </List>
                        </Box>
                    )}
                    <ListItem component={Link} to="/">
                        <ListItemText primary="About" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default LeftNavbar;
