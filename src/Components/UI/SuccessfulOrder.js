import { PropaneSharp } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function SuccessfulOrder(props) {
  const navigate = useNavigate()


  const timer = setTimeout(() => {
    navigate("/")
  }, 15000);


  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 10000);
  })

  return (
    <>
      <Box textAlign='center' sx={{ mx: 1, m: 2 }} >

        <p> You've successfully ordered {props.name}, please check your email for next steps.
          This page will dissapear in 10 seconds.</p>

        <Button component={Link} sx={{ mx: 1, m: 2 }} variant="outlined" to="/">Home Page</Button>
      </Box>
    </>
  )
}