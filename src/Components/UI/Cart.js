
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


export default function Cart(props) {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  return (
    <Link to='/checkout'>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={props} sx={{ mx: 1 }} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Link>
  )
}