import React from 'react';
import LeftNavbar from './components/LeftNavbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const drawerWidth = 200;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftNavbar />
      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            My Application
          </Typography>
          {/* Right Side Button */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={handleLogout} >SignIn</Button>
            <Button color="inherit" onClick={handleLogout}>SignOut</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          marginTop: '64px', // Adjust for AppBar height

        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout