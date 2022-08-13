import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


export default function Login() {
  const navigate = useNavigate()

  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    setLoginDataForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/customerlogin`, loginDataForm)
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
      <h1> Welcome back</h1>
      <h2> Sign in below</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className=" ">
          <label className="label">Email address</label>
          <div className="">
            <textarea
              className="input"
              type="text"
              name={'email'}
              value={loginDataForm.email}
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
              value={loginDataForm.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>
        <Button sx={{ mt: 2 }} type="submit" variant="outlined">
            SIGN IN
          </Button>

      </form>
      <div> remember me</div>
      <div>Forgot password?</div>
      <div>No account? Signup here.</div>
    </div>
    <p className="mx-5 my-5">Copyright Firesell 2022 by Dimitar Vidolov</p>
  </>
)




}





