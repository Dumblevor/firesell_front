import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function SellerReg() {
  const navigate = useNavigate()
  const [registrationDataForm, setRegistrationDataForm] = useState({
    email: "",
    password: "",
  })

  const token = localStorage.getItem('token')

  const [newProdData, setNewProdData] = useState({
    name: "",
    price: null,
    description: "",
    url: "",
    categories: "",
    pictures: ""
  })


  function handleProductSubmit(e) {
    setNewProdData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }



  function handleChange(e) {
    setRegistrationDataForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }


  async function handleProdPost(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/newproduct`, newProdData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(newProdData);
      console.log(data);

    } catch (e) {
      console.log(e.response.data)
    }
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
      <Box sx={{ flexGrow: 1 }} >

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="mx-5">
              <h1> Welcome Seller</h1>
              <form onSubmit={handleRegistrationSubmission}>
                <div className=" ">
                  <label className="label">
                    Email address</label>
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
                <Button sx={{ mr: 1 , mt: 1}} type="submit" variant="outlined">
                  REGISTER
                </Button>
                <Button  sx={{ mt: 1}} variant="outlined" onClick={(e) => handleLoginSubmit(e)}>
                  LOGIN
                </Button>
              </form>

            </div>
          </Grid>

          <Grid item xs={6} sx={{ p: 3}}>
            <h2>
              Post a new product
            </h2>
            <form onSubmit={handleProdPost}>
              <div >
                <label className="label">
                  Product name:</label>
                <div className="">
                  <textarea
                    className="input"
                    type="text"
                    name={'name'}
                    value={newProdData.name}
                    onChange={handleProductSubmit}
                    placeholder="example: developer1@firesell.com"
                  />
                </div>
              </div>
              <div className=" ">
                <label className="label">
                  Description</label>
                <div className="">
                  <textarea
                    className="input"
                    type="text"
                    name={'description'}
                    value={newProdData.description}
                    onChange={handleProductSubmit}
                    placeholder="description"
                  />
                </div>
              </div>
              <div className=" ">
                <label className="label">
                  Price in € / EUR</label>
                <div className="">
                  <textarea
                    className="input"
                    type="float"
                    name={'price'}
                    value={newProdData.price}
                    onChange={handleProductSubmit}
                    placeholder="2.99"
                  />
                </div>
              </div>
              <div className=" ">
                <label className="label">Download url</label>
                <div className="">
                  <textarea
                    className="input"
                    type="url"
                    name={'url'}
                    value={newProdData.url}
                    onChange={handleProductSubmit}
                    placeholder="www.yourdomain.com/api/product/id/purchase"
                  />
                </div>
              </div>
              <div className=" ">
                <label className="label">Picture url</label>
                <div className="">
                  <textarea
                    className="input"
                    type="url"
                    name={'url'}
                    value={newProdData.pictures}
                    onChange={handleProductSubmit}
                    placeholder="www.yourdomain.com/api/product/id/picture.png"
                  />
                </div>
              </div>
              <Button sx={{ mt: 2 }} variant="outlined" type="submit">
                Register product
              </Button>
            </form>
          </Grid>
          <p className="mx-5 my-5">Copyright Firesell 2022 by Dimitar Vidolov</p>
        </Grid>
      </Box>
    </>
  )

}