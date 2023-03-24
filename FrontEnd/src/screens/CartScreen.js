import React,{useEffect} from 'react'
import {Link,useParams,useNavigate,useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,ListGroupItem,Image,FormControl,Button,Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart,removeAllFromCart,removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const productId = params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart
  console.log(cartItems)

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))

  }
  const removeAllfunc = () =>{
    dispatch(removeAllFromCart())

  }
 const checkoutHandler = () =>{
   navigate('/login?redirect=/shipping')
 }

  return (
    <>
    <Row>
      <h1>Shopping Cart</h1>
      
    <Col md= {8}>
      
      {
        cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go back</Link>
          </Message>
        ):
        (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to = {`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    Rs.{item.price}
                  </Col>
                  <Col md={2}>
                    <FormControl as = 'select' value = {item.qty} 
                         onChange ={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))}>
                         {
                            [...Array(item.countInStock).keys()].map((x)=>(
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                            ))
                         }   
                     </FormControl>
                  </Col>
                  <Col md={2}>
                        <Button type='button' variant='light' onClick={() =>
                        removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i></Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )
      }
      {cartItems.length > 0 &&
      <div className='d-flex justify-content-end' >
        <Button type='button' variant='outline-danger' onClick={removeAllfunc}>Remove all</Button>
      </div>
      }
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroupItem className='py-3'>
            <h2 className='pt-1'>
              Total Items : {cartItems.reduce((acc,item) => acc + item.qty ,0)}
            </h2>
           <h2 className='py-3'>Total Price : Rs. 
           {cartItems.reduce((acc,item) => acc + (item.qty * item.price) ,0).toFixed(2)} /-</h2>
          </ListGroupItem>
          <ListGroupItem className='py-2 text-center'>
            <Button type='button'variant='outline-success'className='my-button-addtocart' disabled={cartItems.length ===0 }
            onClick ={checkoutHandler}>
              Proceed to checkout
            </Button>

          </ListGroupItem>
        </ListGroup>
      </Card>
    </Col>
    </Row>
    
    </>
  )
}

export default CartScreen