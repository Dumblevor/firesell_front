import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


export default function SellerReg() {
  const navigate = useNavigate()
  const [registrationDataForm, setRegistrationDataForm] = useState({
    email: "",
    password: "",
  })

  function handleChange(e) {
    setRegistrationDataForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  async function handleRegistrationSubmission(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/newseller`, registrationDataForm)
      data && handleLoginSubmit() && console.log("logging in")
      console.log("success") && navigate('/')
      // && data.token && localStorage.setItem('token', data.token)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/sellerlogin`, registrationDataForm)
      console.log(data.token);
      if (data.token) {
        
        localStorage.setItem('token', data.token)
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("cartItems", JSON.stringify([]))

        console.log("success");
        navigate('/')
      } else {
        navigate('/login')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }

  return (
    <>
      <div className="mx-5">
        <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="computer online selling data and software revenue dashboard"></img>
        <h1> Welcome Seller</h1>
        <form onSubmit={handleRegistrationSubmission}>
          <div className=" ">
            <label className="label">Email address</label>
            <div className="">
              <textarea
                className="input"
                type="text"
                name={'email'}
                value={registrationDataForm.email}
                onChange={handleChange}
                placeholder="example: developer1@firesell.com"
              />
            </div>
          </div>
          <div className=" ">
            <label className="label">Password</label>
            <div className="">
              <textarea
                className="input"
                type="text"
                name={'password'}
                value={registrationDataForm.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
          <Button sx={{ mt: 2 }} variant="outlined">
            REGISTER
          </Button>
        </form>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={(e) => handleLoginSubmit(e)}>
          LOGIN
        </Button>
      </div>
      <p className="mx-5 my-5">Copyright Firesell 2022 by Dimitar Vidolov</p>
    </>
  )

}