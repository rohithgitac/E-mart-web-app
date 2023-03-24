import React,{useState,useEffect} from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,Form, ListGroup, ListGroupItem,Image, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails,createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstant'


const Productscreen = ( ) => {
 const [qty,setQty] = useState(1)
 const [rating,setRating] = useState(0)
 const [comment,setComment] = useState('')
 const navigate= useNavigate()
 const params= useParams() 
 const dispatch =useDispatch()

 const productDetails = useSelector(state=>state.productDetails)
 const {loading,error,product} = productDetails

 const userLogin = useSelector(state=>state.userLogin)
 const {userInfo} = userLogin
 
 const productReviewCreate = useSelector(state=>state.productReviewCreate)
 const {success:successProductReview,error:errorProductReview} = productReviewCreate

  useEffect(()=>{
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    if(successProductReview){
        alert('Review submitted.!')
        setRating(0)
        setComment('')
        dispatch({type : PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(params.id))
  },[dispatch,params,successProductReview])

  const addToCartHandler = () => {
   navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id,{
        rating,
        comment
    }))
  }
   

  return (
    <>
    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
        <>
        <Meta title={product.name}/>
         <Row>
         <Col md={6}>
             <ListGroup variant='flush'>
                 <ListGroupItem>
                     <h3>{product.name}</h3>
                 </ListGroupItem>
                 <ListGroupItem>
                     <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
                 </ListGroupItem>
                 <ListGroupItem>
                     Price Rs.<b>{product.price}</b>
                 </ListGroupItem>
                 <ListGroupItem>
                     Description : {product.description}
                 </ListGroupItem>
                 <ListGroupItem>
                     <Row>
                         <Col>
                         Status :</Col>
                         <Col>
                         {product.countInStock>0?'In stock':'Out of stock' }</Col>
                     </Row>
                 </ListGroupItem>
                 { product.countInStock > 0  && (
                     <ListGroupItem>
                     <Row>
                         <Col>
                         Quantity :</Col>
                         <Col>
                         <FormControl as = 'select' value = {qty} 
                         onChange ={(e)=> setQty(e.target.value)}>
                         {
                            [...Array(product.countInStock).keys()].map((x)=>(
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                            ))
                         }   
                            </FormControl></Col>
                     </Row>
                 </ListGroupItem>)
                  }
                
             </ListGroup>
         </Col>
         <Col md={6}>
             <Image src={product.image} alt={product.name} fluid/>
             <div className='m-2 text-center'>
             <Button onClick={addToCartHandler} variant='outline-success' className='my-button-addtocart'
                type='button' disabled={product.countInStock===0}>Add to Cart</Button>
             </div>   
         </Col> 
     </Row>
     <Row>
        <Col md={6}>
            {product.reviews.length ===0 && <Message>No reviews</Message>}
            <ListGroup variant='flush'>
            <ListGroupItem>
            <h3>Reviews</h3>
            </ListGroupItem>
                {product.reviews.map( review => (
                    <ListGroupItem key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating}/>
                        <p>{review.comment}</p>
                        <p>{review.createdAt.substring(0,10)}</p>
                    </ListGroupItem>
                ))}
                </ListGroup>
        </Col>
        <Col md={6} className='mt-4' >
            <ListGroup className='mt-4'>
                <ListGroupItem>
                    <h3 >Write your review</h3>
                    {errorProductReview && 
                    <Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo ?
                     (<Form onSubmit={submitHandler}>
                        <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl as='select' value={rating}
                        onChange={(e) =>{ setRating(e.target.value)} }>
                            <option value=''>Select...</option>
                            <option value='1'>1-Poor</option>
                            <option value='2'>2-Fair</option>
                            <option value='3'>3-Good</option>
                            <option value='4'>4-Very good</option>
                            <option value='5'>5-Excellent</option>
                        </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                            <FormLabel>Comment</FormLabel>
                            <FormControl as='textarea'
                             row='3'
                             value={comment}
                             onChange={(e)=> setComment(e.target.value)}>
                             </FormControl>
                        </FormGroup>
                        <div className='mt-1 text-center'>
                        <Button variant='outline-success'className='my-button-addtocart' type='submit'>Submit</Button>
                        </div>
                    </Form>) 
                    :
                    ( <Message>Please <Link to='/login'>
                    sign In</Link> to write a review</Message>)}
                </ListGroupItem>
            </ListGroup>
        </Col>
         <Link className='text-center mt-4 justify-content-right mx-2'  to ='/'>
        <Button  variant='outline-success'className='my-button-addtocart' > &lt;&lt;Go back</Button>
     </Link> 
     </Row>
     </>
    )}
   
    </>
  )
}

export default Productscreen