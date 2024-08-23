import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography, Box, ListItemIcon, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import Scroll from '../assets/svg/scroll.svg'
import ChatIcon from '@mui/icons-material/Chat';
// import IconButton from '@mui/icons-material/Icon';

const drawerWidth = 200;

const LeftNavbar: React.FC = () => {

    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

    // Function to handle click on the User list item
    const handleUserMenuClick = () => {
        setUserMenuOpen(!userMenuOpen);
    };
    return (
        <div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <div style={{ padding: '20px' }}>
                    <Typography variant="h6" noWrap>
                        My App
                    </Typography>
                </div>
                <List>
                    <ListItem component={Link} to="/home" button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                    {/* User ListItem with Submenu */}
                    <ListItem button onClick={handleUserMenuClick}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                        {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    {/* Submenu for User */}
                    <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem
                                component={Link}
                                to="/user/profile"
                                button
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem component={Link} to="/user/create" button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Create" />
                            </ListItem>
                            <ListItem component={Link} to="/user/list" button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary="List" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem component={Link} to="/infinite-scroll" button>
                        <ListItemIcon>
                            <div>
                                <img src={Scroll} alt='scroll' />
                            </div>
                        </ListItemIcon>
                        <ListItemText primary="InfiniteScroll" />
                    </ListItem>

                    <ListItem component={Link} to="/user/contact" button>
                        <ListItemIcon>
                            <ContactMailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>

                    <ListItem component={Link} to="/user-chat" button>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="UserChat" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default LeftNavbar;
