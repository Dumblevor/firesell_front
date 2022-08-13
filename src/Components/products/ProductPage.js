import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import baseUrl from "../../config"
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Product from './Product.js'
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SocialDistance } from '@mui/icons-material';


const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: '4px',
}));



export default function ProductPage() {
  const [productData, setProductData] = useState(undefined)
  const { productID } = useParams()
  const [commentData, setCommentData] = useState({
    content: ""
  })
  const token = localStorage.getItem('token')


  useEffect(() => {
    async function fetchOneProduct() {
      const { data } = await axios.get(`${baseUrl}/products/${productID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProductData(data)
    }
    fetchOneProduct()
    const productInterval = setInterval(() => {
      fetchOneProduct()
    }, 1000);
    return () => { clearInterval(productInterval) }

  }, [productID])

  function handleComChange(e) {
    setCommentData((prevState) => {
      return {
        ...prevState,
        content: e.target.value
      }
    })
  }

  async function handleComment(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/products/${productID}/comments`, commentData, {
        headers: { Authorization: `Bearer ${token}` },
      })

    } catch (e) {
      console.log(e.response.data)
    }
  }
  // function handleAddtoCart() {
  //   let currentItems = JSON.parse(localStorage.getItem('cartItems'))
  //   currentItems.push(productID)
  //   localStorage.setItem('cartItems', JSON.stringify(currentItems))
  // }


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      margin: '15px'
    }}>

      <Grid xs={5}>
        <Item >
          {
            productData ?
              <Product
                {...productData} />
              : <p>Loading product</p>
          }
        </Item>

        <Item sx={{
          width: 400, border: "1px solid", margin: '10px'
        }}>
          {
            productData ? productData.comments.map((each, index) => {
              return (
                <div key={index}>
                  <Typography variant="h5" color="text.secondary">
                    UserID {each.user_id} commented
                  </Typography>
                  <Typography variant="body6" color="text.secondary">
                    at {each.created_at} :
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {each.content}
                  </Typography>
                  <hr />
                </div>

              )
            })
              : <p>No comments yet.</p>
          }

        </Item>
        <Item sx={{ margin: '15px' }}>
          <TextField id="standard-basic" value={commentData.content} onChange={handleComChange} label="Comment here" variant="standard" />
          <Button sx={{ my: 1, mx: 4, }} type="submit" onClick={(e) => handleComment(e)} variant="outlined">
            post comment
          </Button>
        </Item>
      </Grid>

    </Box >

  )

}