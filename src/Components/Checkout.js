import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';


export default function Checkout() {
  let total = 0;
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [productData, setProductData] = useState([])
  const [alignment, setAlignment] = React.useState('card');
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    security: "",
  })


  async function getProductData() {
    let itemsGet = JSON.parse(localStorage.getItem('cartItems'))
    if (itemsGet !== undefined) {
      let newSet = [...new Set(itemsGet)]
      let array = []
      for (let item in newSet) {
        array.push(new Promise(async (resolve) => {
          const { data } = await axios.get(`${baseUrl}/products/${newSet[item]}`)
          resolve(data)
        }))}
      setProductData(array)
      Promise.all(array).then((values) => {
        setProductData(values)
      })}}

  useEffect(() => {
    getProductData()
    const productInterval = setInterval(() => {
      getProductData()
    }, 10000);
    return () => { clearInterval(productInterval) }
  }, [])


  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleChange(e) {
    setCardData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  async function handleOrderSubmit(e) {
    e.preventDefault()
    let itemsGet = JSON.parse(localStorage.getItem('cartItems'))
    const arrayOfIds = JSON.parse(localStorage.getItem('cartItems')).split(',')
    const numbersOfIds = arrayOfIds.map(id => Number(id))

    // create an object where product_id are keys and values are quantities 
    const objs = numbersOfIds.reduce((acc, productId) => {
      if (acc[productId]) return { ...acc, [productId]: acc[productId] + 1 }
      else return { ...acc, [productId]: 1 }
    }, {})

    // turn this into an array of objects, with product_id and qty
    const data = Object.entries(objs).map((item) => {
      const [productId, quantity] = item
      return { product_id: productId, qty: quantity }
    })

    console.log(data) // this is the format you want for your backend

    try {
      const { response } = await axios.post(`${baseUrl}/neworder`, { "products": data }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log({ "products": data });
      localStorage.setItem("cartItems", JSON.stringify([]))
      navigate('/sucessfulorder')
    } catch (e) {
      console.log(e.response.data)
    }
  }

  function hadnleDelete(productID) {

    let itemsWithout = JSON.parse(localStorage.getItem('cartItems')).filter((number) => { return number !== productID })
    let itemsGet = localStorage.setItem('cartItems', JSON.stringify(itemsWithout)) // updates local storage

    setProductData((prevState) => prevState.filter((object) => {
      return object.id !== productID
    })) // updates state after filtering
  }


  function clearCart() {
    localStorage.setItem("cartItems", JSON.stringify([]))
    setProductData([])
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ m: 3 }}>
            <Typography gutterBottom variant="h5" textAlign='center' >
              Payment method
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeToggle}
            >
              <ToggleButton value="card">Card</ToggleButton>
              <ToggleButton value="applepay">Apple Pay</ToggleButton>
              <ToggleButton value="paypal">PayPal</ToggleButton>
            </ToggleButtonGroup>

            <form name="orderForm" onSubmit={handleOrderSubmit}>
              <div >
                <label className="label">Name</label>
                <div>
                  <textarea
                    className="input"
                    type="text"
                    name={'name'}
                    value={cardData.email}
                    onChange={handleChange}
                    placeholder="e.g. Richard Branson"
                  />
                </div>
              </div>
              <div>
                <label className="label">Card number</label>
                <div >
                  <textarea
                    className="input"
                    type="text"
                    name={'number'}
                    value={cardData.number}
                    onChange={handleChange}
                    placeholder="0123 4567 8910 1112"
                  />
                </div>
              </div>
              <div>
                <label className="label">Expiry Date</label>
                <div >
                  <textarea
                    className="input"
                    type="text"
                    name={'expiry'}
                    value={cardData.expiry}
                    onChange={handleChange}
                    placeholder="1222"
                  />
                </div>
              </div>
              <div>
                <label className="label">Security code</label>
                <div >
                  <textarea
                    className="input"
                    type="text"
                    name={'security'}
                    value={cardData.security}
                    onChange={handleChange}
                    placeholder="last 3 digits on the back, e.g. 123"
                  />
                </div>
              </div>
            </form>

            <Box sx={{ xs: 2, my: 2 }} textAlign='center'>
              <Button variant="contained" type="submit" form="orderForm" onClick={(e) => handleOrderSubmit(e)} color="success">
                Complete Purchase
              </Button>
              <Box textAlign='left'>
                <Button onClick={() => navigate("/")}>
                  Back to apps</Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={5} sx={{ m: 3 }}>
            <Typography gutterBottom variant="h4" >
              Your Cart
            </Typography>
            <p>Please note shipping is free.</p>


            {
              productData ? productData.map((oneProductData, index) => {
                let qty = JSON.parse(localStorage.getItem('cartItems')).filter((item) => item === oneProductData.id).length
                total += oneProductData.price * qty

                return (
                  <div key={`${index}_${oneProductData.id}`}>
                    <hr />
                    {oneProductData.pictures !== undefined &&
                      <Avatar alt={oneProductData.name} src={oneProductData.pictures[0].url} />}

                    <Typography gutterBottom variant="h5" component="div">
                      {oneProductData.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {oneProductData.description}
                    </Typography>

                    €{oneProductData.price} x {qty} quantity
                    <br />
                    <Typography gutterBottom variant="h7">
                      Subtotal: € {parseFloat(total).toFixed(2)}
                    </Typography>
                    <Box textAlign='right'>
                      <Button onClick={() => hadnleDelete(oneProductData.id)}>
                        Remove item</Button>
                    </Box>
                  </div>
                )
              }


              ) : (

                <p> Loading products, please wait. </p >
              )
            }
            <hr />
            {total !== 0 && <div>
              <Typography gutterBottom variant="h5" >
                Total: € {parseFloat(total).toFixed(2)}
              </Typography>
              <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-end' }}>
                <Button onClick={clearCart} >
                  Clear Cart
                </Button>
              </div>
            </div>
            }


            {productData !== undefined && productData.length === 0 &&
              <div>
                <Stack spacing={1}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text">-----------</Skeleton>
                  <Skeleton variant="rectangular" width={210} height={118} />
                </Stack>
                <Link to='/'>
                  <p>Your cart is empty, go ahead and add some products:

                    <Button>
                      Back to apps</Button>
                  </p></Link>
              </div>}
          </Grid>
        </Grid>
      </Box>

    </>
  )
}