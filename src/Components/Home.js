import React, { useState, useEffect } from 'react'
import baseUrl from "../config.js"
import axios from 'axios'
import Product from './products/Product.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Home() {

  const [allProducts, setAllProducts] = useState(null)
  const [search, setSearch] = React.useState("")


  const getProductData = async () => {
    const { data } = await axios.get(`${baseUrl}/allproducts`)
    setAllProducts(data)
    data && console.log(data)
  }


  useEffect(() => {
    getProductData()
    const productInterval = setInterval(() => {
      getProductData()
    }, 10000);
    return () => { clearInterval(productInterval) }
  }, [])

  function productFilter() {
    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    )
  }
console.log(allProducts);
  return (
    <>
      <Box sx={{ flexGrow: 1, ml: 2, mt: 2 }}>
        <Grid container sx={{
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          fontWeight: '700'
        }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            allProducts ? productFilter().map((productData, index) => {
              return (

                <Grid item xs={2} sm={4} md={4} key={index} >
                  <Product
                    {...productData} />
                </Grid>
              )
            }
            ) : (
            <>
            <p> Loading products, please wait. </p >
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
              </Stack>
              </>)
          }
        </Grid>
      </Box>
    </>
  )
}
