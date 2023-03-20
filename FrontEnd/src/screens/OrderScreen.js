import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { ListGroup, ListGroupItem , Row,Col, Image, Card} from 'react-bootstrap'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstant'
import { removeAllFromCart } from '../actions/cartActions'

const OrderScreen = () => {

    const navigate = useNavigate()
    const params =useParams()
    const dispatch = useDispatch()

    const orderId = params.id

    const [sdkReady,setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order,loading, error} = orderDetails
    
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay} = orderPay



    if(!loading){
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }
    //Calculate Prices
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price*item.qty,0))
    }
    useEffect(()=>{
        const addPaypalScript = async () =>{
            const {data: clientId} =await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        
        if(!order || successPay){
            dispatch({type : ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch, orderId,successPay,order])

    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
        dispatch(removeAllFromCart())
    }
  return (
    loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
     <>
        <h1>Order {order._id}</h1>
        <Row className='mt-3'>
        <Col md={8}>
            <ListGroup variant= 'flush'>
                <ListGroupItem>
                    <h2>Shipping Details</h2>
                    <p><strong>Name : </strong>
                    {order.user.name}</p>
                    <p><strong>Email : </strong>
                    <a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                    <p>
                        <strong>Address : </strong>
                        {order.shippingAddress.address}<br/>
                       {order.shippingAddress.city}<br/>
                        {order.shippingAddress.postalCode}<br/>
                        {order.shippingAddress.phone}
                    </p>
                    {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> 
                    : <Message variant='danger'>Delivery pending</Message>}
                </ListGroupItem>

                <ListGroupItem>
                    <h2>Payment method</h2>
                    <p> <strong>Method : </strong>
                    {order.paymentMethod}</p>
                    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> 
                    : <Message variant='danger'>Payment pending</Message>}
                </ListGroupItem>

                <ListGroupItem>
                    <h2>Ordered Items</h2>
                    {order.orderItems.length === 0 ? <Message>Your order is empty</Message>
                    : (
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=> (
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
                            <Col>Rs.{order.itemsPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>Rs.{order.shippingPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Tax</Col>
                            <Col>Rs.{order.taxPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Total</Col>
                            <Col>Rs.{order.totalPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    {!order.isPaid && (
                        <ListGroupItem>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> :(
                                <PayPalButton amount={order.totalPrice}
                                onSuccess={successPaymentHandler} />
                            )}
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
     </>)
}

export default OrderScreen