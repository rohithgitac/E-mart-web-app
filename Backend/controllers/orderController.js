import asyncHandler from "express-async-handler";
import Order from '../model/orderModel.js'

// create new oreder
// POST api/orders
// Private
const addOrderItems = asyncHandler( async (req,res) => {
    const {orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,shippingPrice,totalPrice} = req.body
    if(orderItems&& orderItems.length ===0){
        res.status(400)
        throw new Error('No order Items')
        return
    }else{
        const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,shippingPrice,totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
} )
// get order by Id
// GET api/orders/:id
// Private
const getOrderById = asyncHandler( async (req,res) => {
    console.log(req.user._id)
   const order = await Order.findById(req.params.id).populate('user','name email')

   if(order){
    res.json(order)
   }else{
    res.status(404)
    throw new Error('Order not found')
   }

} )
// update order to paid
// GET api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler( async (req,res) => {
   const order = await Order.findById(req.params.id)

   if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
        id: req.body.id,
        status : req.body.status,
        update_time : req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
   }else{
    res.status(404)
    throw new Error('Order not found')
   }

} )
// update order to delivered
// GET api/orders/:id/deliver
// Private-admin
const updateOrderToDelivered= asyncHandler( async (req,res) => {
   const order = await Order.findById(req.params.id)

   if(order){
    order.isDelivered = true
    order.deliveredAt = Date.now()
  
    const updatedOrder = await order.save()

    res.json(updatedOrder)
   }else{
    res.status(404)
    throw new Error('Order not found')
   }

} )
// get logged in user orders
// GET api/orders/myorders
// Private
const getMyOrders = asyncHandler( async (req,res) => {
    const orderPageSize =4
    const orderPage = Number(req.query.pageNumber) || 1

    const orderCount = await Order.countDocuments({user : req.user._id})
    const orders = await Order.find({user : req.user._id}).limit(orderPageSize)
        .skip(orderPageSize*(orderPage-1))       
    res.json({orders,orderPage,orderPages:Math.ceil(orderCount/orderPageSize)})
} )
// get all orders
// GET api/orders
// Private-Admin
const getAllOrders = asyncHandler( async (req,res) => {
    const allOrderPageSize =5
    const allOrderPage = Number(req.query.pageNumber) || 1

    
    const allOrderCount = await Order.countDocuments()
    const allOrders = await  Order.find({}).populate('user','id name') .limit(allOrderPageSize)
        .skip(allOrderPageSize*(allOrderPage-1)) 
     
    res.json({allOrders,allOrderPage,allOrderPages:Math.ceil(allOrderCount/allOrderPageSize) })                    //allOrders
} )

export {addOrderItems,getOrderById, 
    updateOrderToPaid,getMyOrders,getAllOrders,updateOrderToDelivered}