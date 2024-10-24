import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2';
import { useStateContext } from '../Helpers/ContextAPI';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Features', path: '/features' },
  { name: 'News', path: '/news' },
  { name: 'About', path: '/about' },
  { name: 'Download', path: '/download' },
];

const pagesIfNoUser = [
  { name: 'Features', path: '/features' },
  { name: 'About', path: '/about' },
  { name: 'Download', path: '/download' },
  { name: 'Login', path: '/login' },
]

const settings = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Logout', path: '/logout' },
];

//the purpose of this navbar is when the user tried to clicked the buttons at the default navbar withou session. This will show the login button so the user can navigate back to login page.

function NavbarGeneral() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [showDefaultNavBar, setShowDefaultNavBar] = React.useState(false);

  const { setToken, setUser, setUserID, setRole } = useStateContext();
  const { cookie } = useCookies(['sessionID'])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    checkIfThereIsUser();
  }, [])

  const navigator = useNavigate();


  const checkIfThereIsUser = () => {

    if (localStorage.getItem('sessionID') == null) {
      setShowDefaultNavBar(true)
    } else {
      setShowDefaultNavBar(false)
    }

  }

  const handleLogout = () => {

    setAnchorElUser(false)

    Swal.fire({
      title: "Logout?",
      text: '',
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'No',
      confirmButtonColor: 'blue',
      confirmButtonText: "Yes",

    }).then((result) => {
      if (result.isConfirmed) {

        setUser(null)
        setUserID(null)
        setToken(null)
        setRole(null)

        navigator('/login');
      }
    });
  }


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2471a3' }}>
        <Container maxWidth={false} sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <Toolbar disableGutters sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NURSERY BEATS
            </Typography>

            {/* CHECK MUNA IF MERONG SESSION FOR THIS */}
            {showDefaultNavBar ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/home"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  NURSERY BEATS
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Typography
                          component={Link}
                          to={page.path}
                          sx={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: 'black', textDecoration: 'none' }}
                        >
                          {page.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/home"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  NURSERY BEATS
                </Typography>
                <Box sx={{ flexGrow: 1, mr: 2.5, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      component={Link}
                      to={page.path}
                    >
                      <Typography sx={{ fontFamily: 'Poppins, sans-serif', color: 'white', fontWeight: 600 }}>
                        {page.name}
                      </Typography>
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon sx={{ color: 'white', fontSize: 28 }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        component={Link}
                        to={'/user-dashboard'}
                        sx={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: 'black', textDecoration: 'none' }}
                      >
                        Dashboard
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>
                      <Typography
                        sx={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: 'black', textDecoration: 'none' }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavbarGeneral;
