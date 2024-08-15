import { Outlet } from 'react-router-dom'
import LeftNavbar from './components/LeftNavbar'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react';

const Layout: React.FC = () => {
  const drawerWidth = 200;
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
        <Toolbar>
          <Typography variant="h6" noWrap>
            My Application
          </Typography>
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