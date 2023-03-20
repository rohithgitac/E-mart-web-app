import React,{useState,useEffect} from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col, ListGroup, ListGroupItem,Image, Button, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails} from '../actions/productActions'




const Productscreen = ( ) => {
 const [qty,setQty] = useState(1)
 const navigate= useNavigate()
 const params= useParams() 
 const dispatch =useDispatch()

 const productDetails = useSelector(state=>state.productDetails)
 const {loading,error,product} = productDetails

  useEffect(()=>{
    dispatch(listProductDetails(params.id))
  },[dispatch,params])

  const addToCartHandler = () => {
   navigate(`/cart/${params.id}?qty=${qty}`)
  }
   

  return (
    <>
    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
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
                     Price Rs.{product.price}
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
                 <ListGroupItem>
                    <Button onClick={addToCartHandler} className='btn  btn-info' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
                 </ListGroupItem>
             </ListGroup>
         </Col>
         <Col md={6}>
             <Image src={product.image} alt={product.name} fluid/>
         </Col> 
         <Link className='btn btn-info my-2 justify-content-right mx-2'  to ='/'>
        <h6 > Go back</h6>
     </Link> 
     </Row>
    )}
   
    </>
  )
}

export default Productscreen