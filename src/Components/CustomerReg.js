import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


export default function CustomerReg() {
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
      const { data } = await axios.post(`${baseUrl}/newcustomer`, registrationDataForm)
      handleLoginSubmit(e)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/customerlogin`, registrationDataForm)
      console.log(data.token);
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("cartItems", JSON.stringify([]))

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
        <div>Image</div>
        <h2> Welcome back</h2>
        <h3> Sign in below</h3>
        <form onSubmit={handleRegistrationSubmission}>
          <div className=" ">
            <label className="label">Email address</label>
            <div className="">
              <input
                className="input"
                type="email"
                name={'email'}
                value={registrationDataForm.email}
                onChange={handleChange}
                placeholder="example: developer1@firesell.com"
                autoComplete="on"
              />
            </div>
          </div>
          <div className=" ">
            <label className="label">
              Password
            </label>
            <div className="">
              <input
                className="input"
                type="password"
                name={'password'}
                value={registrationDataForm.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="on"
              />
            </div>
          </div>
          <Button type="submit" sx={{ mt: 2 }} variant="outlined">
            REGISTER
          </Button>
        </form>
        <div> remember me</div>
        <div>Already have an account? Sign in here.</div>
      </div>
      <p className="mx-5 my-5">Copyright Firesell 2022 by Dimitar Vidolov</p>
    </>
  )

}