import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,
        productDetailsReducer,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productTopRatedReducer} from './reducer/productReducer.js'
import { cartReducer } from './reducer/cartReducer.js'
import { userLoginReducer ,
         userRegisterReducer,
         userDetailsReducer,
         userUpdateProfileReducer,
         userListReducer,
         userDeleteReducer,
         userUpdateAdminReducer} from './reducer/userReducer.js'
import { orderCreateReducer ,
         orderDetailsReducer,
         orderPayReducer,
         myordersReducer,
         ordersDetailsReducer,
         orderDeliverReducer} from './reducer/orderReducer.js'
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    myorders:myordersReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateAdmin:userUpdateAdminReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    ordersDetails:ordersDetailsReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}


const initialState = {
    cart: {cartItems:cartItemsFromStorage,
           shippingAddress:shippingAddressFromStorage
          },
    userLogin : {userInfo : userInfoFromStorage}
}

const middleWare = [thunk]

const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleWare)))


export default store