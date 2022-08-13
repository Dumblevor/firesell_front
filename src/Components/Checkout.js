import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Product from './products/Product.js';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';


export default function Checkout() {


  const navigate = useNavigate()

  const [productData, setProductData] = useState([])
  const [alignment, setAlignment] = React.useState('card');

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    security: "",
  })

  let total = 0;

  const token = localStorage.getItem('token')
  let itemsGet = JSON.parse(localStorage.getItem('cartItems'))

  useEffect(() => {
    let newSet = [...new Set(itemsGet)]
    let array = []
    // async function fetchOneProduct(item) {
    //   const { data } = await axios.get(`${baseUrl}/products/${item}`)
    //   return data
    // }

    for (let item in newSet) {
      array.push(new Promise(async (resolve) => {
        const { data } = await axios.get(`${baseUrl}/products/${newSet[item]}`)
        resolve(data)
      }))
    }

    // setProductData(array)

    Promise.all(array).then((values) => {
      setProductData(values)
    })
  }, [itemsGet])


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



      // id numbers
const itemsGet = "1,1,2,3,2,4"
// convert to array of ids
const arrayOfIds = itemsGet.split(',')
// ensure they are numbers
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







    // const itemsArray = itemsGet.join(",")
    // //array of numbers
    // const itemsReduce = itemsArray.reduce((acc, item) => {
    //   return 
    // })
    // console.log(itemsArray);

    try {
      const { response } = await axios.post(`${baseUrl}/neworder`, {"products": data}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log({"products": data});

      localStorage.setItem("cartItems", JSON.stringify([]))
      navigate('/sucessfulorder')
    } catch (e) {
      console.log(e.response.data)
    }
  }



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
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
            </Box>
          </Grid>


          <Grid item xs={5}>
            {
              productData ? productData.map((productData, index) => {
                let qty = itemsGet.filter((item) => item === productData.id).length
                total += productData.price * qty
                return (
                  <div key={index}>
                    <hr />
                    <Typography gutterBottom variant="h5" component="div">{productData.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{productData.description}</Typography>
                    €{productData.price} x {qty} QTY
                    <hr />
                  </div>
                )
              }
              ) : (
                <p> Loading products, please wait. </p >)}

            {productData.length === 0 &&
              <div>
                < br /><br />
                <Stack spacing={1}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text">-----------</Skeleton>
                  <Skeleton variant="rectangular" width={210} height={118} />
                </Stack>
                <p>Your cart is empty, go ahead and add some products!</p>
              </div>}
            <br /><br />
            <Typography gutterBottom variant="h4" >Total: € {parseFloat(total).toFixed(2)}</Typography>

            <p>Please note shipping is always free</p>
            <hr />

          </Grid>


        </Grid>
      </Box>
    </>
  )
}