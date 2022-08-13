import { NavLink, Link, useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import logoFile from "../../Assets/firesell_logo.png"
import { getLoggedInUserId } from "./auth";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const [cartLen, setCartLen] = React.useState(0);
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = React.useState(getLoggedInUserId())

  const updateCart = useEffect(() => {
    function getCart() {
      localStorage.getItem("cartItems") && setCartLen(JSON.parse(localStorage.getItem("cartItems")).length)
    }
    const cartInterval = setInterval(() => {
      getCart()
    }, 500);
    return () => { clearInterval(cartInterval) }

  }, [location])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")))
  }, [isLoggedIn, location])

  function Logout() {
    window.localStorage.clear()
    setIsLoggedIn(false)
  }


  return (
    <>
      <header>
        <Stack sx={{ mt: 2, ml: 2 }} direction="row" spacing={2}>
          <NavLink to="/">
            <img src={logoFile} className="logo image image is-128x128 p-3 mx-2 my-2" alt="Firesell logo" />
          </NavLink>
          <Typography variant={'h1'}>
            Firesell
            <Typography variant={'subtitle2'}>
              Where software comes to thrive
            </Typography>
          </Typography>

        </Stack>
        <Stack sx={{ mt: 2, ml: 2 }} direction="row" spacing={2}>


        </Stack>


        <div className="navbar-end">

          <ButtonGroup onClick={() => handleChange(null, false)} variant="outlined" aria-label="outlined button group" sx={{ mr: 3 }}>
            <Link to='/checkout'>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartLen} sx={{ mx: 1 }} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
            {!isLoggedIn && <Button component={NavLink} to="/login" variant="outlined">
              Login
            </Button>}
            {!isLoggedIn && <Button component={NavLink} to="/register" sx={{ mx: 1 }} variant="outlined" >
              Register
            </Button>}
            {isLoggedIn && <Button component={NavLink} to="/" onClick={Logout} variant="outlined">
              Logout
            </Button>}
          </ButtonGroup>
        </div>
        <nav >

          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered aria-label="nav tabs">
              <Tab component={Link} to="/" label="Hot today 🔥" />
              {/* <Tab component={Link} to="/" label="Most downloaded⬇" />
              <Tab component={Link} to="/" label="Recent hits 🔝" /> */}
              <Tab component={Link} to="/newseller" label="Sell on Firesell $" />
            </Tabs>
          </Box>

        </nav>
      </header>
    </>
  )
}



