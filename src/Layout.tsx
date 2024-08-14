import { Outlet } from 'react-router-dom'
import LeftNavbar from './components/LeftNavbar'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
    <LeftNavbar />
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Outlet />
    </Box>
  </Box>
  )
}

export default Layout