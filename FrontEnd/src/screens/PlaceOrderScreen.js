import React,{useEffect} from 'react'
import { ListGroup, ListGroupItem , Row,Col, Image, Card, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Checkoutsteps from '../components/Checkoutsteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }
    //Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price*item.qty,0))
    //shipping Price
    cart.shippingPrice = addDecimals(cart.itemsPrice>500 ?0 : 100)
    //tax price
    cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.09).toFixed(2)))
    //total price
    cart.totalPrice =(Number(cart.itemsPrice) +Number(cart.shippingPrice )+ Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const {order,success,error} = orderCreate

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        }
    },[navigate,success])

    const placeOrderHandler = () => {
       dispatch(createOrder({
        orderItems : cart.cartItems,
        shippingAddress : cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemsPrice : cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice
       }))
         
    }
  return (
    <> <Checkoutsteps step1 step2 step3 step4/>
        <Row className='mt-3'>
            <Col md={8}>
                <ListGroup variant= 'flush'>
                    <ListGroupItem>
                        <h2>Shipping Details</h2>
                        <p>
                            <strong>Address : </strong>
                            {cart.shippingAddress.address}
                        </p>
                        <p>
                            <strong>City : </strong>
                            {cart.shippingAddress.city}
                        </p>
                        <p>
                            <strong>Postal code : </strong>
                            {cart.shippingAddress.postalCode}
                        </p>
                        <p>
                            <strong>Phone : </strong>
                            {cart.shippingAddress.phone}
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment method</h2>
                        <strong>Method : </strong>
                        {cart.paymentMethod}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Ordered Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>
                        : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=> (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src ={item.image} alt={item.name}
                                                fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to = {`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x Rs.{item.price} = Rs. {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4} className='mt-3'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>Order Summary</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>Rs.{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>Rs.{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>Rs.{cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs.{cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        {error && <ListGroupItem>
                            <Message variant='danger'>{error}</Message> </ListGroupItem>}
                       
                        <ListGroupItem>
                            <Button type = 'button' className='btn-block'
                            disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen