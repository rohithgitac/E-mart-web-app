import React, { useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { allOrdersAction } from '../actions/orderActions'
import { ORDER_DETAILS_RESET } from '../constants/orderConstant'


const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const pageNumber = params.pageNumber

    const ordersDetails = useSelector(state => state.ordersDetails)
    const{ loading, error, allOrders,page,pages} = ordersDetails

    const userLogin = useSelector(state => state.userLogin)
    const{ userInfo } = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch({type:ORDER_DETAILS_RESET})
            dispatch(allOrdersAction(pageNumber))
        }else{
            navigate('/login')
        }

    },[dispatch,navigate,userInfo,pageNumber])




  return (
    <>
        <h1>Orders</h1>
        {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>
        :(
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>I.D</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Payment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order)=>
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>Rs.{order.totalPrice}</td>
                        <td>{order.isPaid ? (order.paidAt.substring(0,10))
                        :
                        (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>

                        <td>{order.isDelivered  ? (order.deliveredAt.substring(0,10))
                        :
                        (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                        <td>{order.paymentMethod}</td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>Details</Button>
                            </LinkContainer>
                        </td>
                        
                    </tr>
                    )}
                    
                </tbody>
            </Table>
            <div className="mt-2">
            <Paginate page={page} pages={pages} isAllOrders={true}/>
            </div>
            </>
        )}
    
    
    
    </>
  )
}

export default OrderListScreen