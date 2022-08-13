import { Link, NavLink } from "react-router-dom"
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { SettingsRemote } from "@mui/icons-material";



export default function Product(props) {

  function handleAddtoCart() {
    let currentItems = JSON.parse(localStorage.getItem('cartItems'))
    currentItems.push(props.id)
    localStorage.setItem('cartItems', JSON.stringify(currentItems))
  }

  return (
    <Card sx={{ maxWidth: 345, py: 1, pl: 2 }}>
      <Link to={`/product/${props.id}`}>
        <CardContent>
          <Avatar alt={props.name} src={props.pictures[0].url} />
          <Typography gutterBottom variant="h5" component="div">{props.name}</Typography>
          <div className="subtitle is-6">sold by: (seller id) - {props.product_owner_ID}</div>
          <CardMedia
            component="img"
            height="140"
            image={props.pictures[0].url}
            alt={props.description}
          />
          <Typography variant="body2" color="text.secondary">{props.description}</Typography>
        </CardContent>
      </Link>
      <Stack spacing={2}>
        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
        <Rating name="half-rating-read" defaultValue={props.rating} precision={0.5} readOnly />
        €{props.price}
      </Stack>
      <Button sx={{ mx: 1, m: 2 }} variant="outlined" onClick={() => handleAddtoCart()}>
        Add to cart</Button>
    </Card >
  )
}
