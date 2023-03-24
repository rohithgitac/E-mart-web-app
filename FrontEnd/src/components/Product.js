import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


const Product = ({product}) => {
  return (
    <div>
        
        <Card className='mx-1 mt-2 p-1 rounded ' >
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'  />
            </Link>
            <Card.Body >
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div' >
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating
                    value={product.rating}
                    text= {` ${product.numReviews} reviews`} fluid
                    />              
            </Card.Text>
            <Card.Text as='h2'>
                    <div className='my-1 py-1'>
                        R<small>s</small>.{product.price}
                    </div>
            </Card.Text>
            </Card.Body>
        </Card>
        
    </div>
  )
}


export default Product