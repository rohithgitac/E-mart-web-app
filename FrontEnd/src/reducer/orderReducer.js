import { ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_FAIL,
    ALL_ORDER_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_RESET,
    MY_ORDER_RESET} from "../constants/orderConstant";

export const orderCreateReducer = (state = { }, action) => {
    switch (action.type){
        case  ORDER_CREATE_REQUEST :
        return {loading: true}
        case ORDER_CREATE_SUCCESS :
        return { loading: false,
        success : true,
        orderCreatedOne : action.payload}
        case ORDER_CREATE_FAIL:
            return{loading:false,
            error:action.payload}
        case ORDER_CREATE_RESET:
            return {success:false}    
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {loading:true, orderItems: [],shippingAddress: {}}, action) => {
    switch (action.type){
        case  ORDER_DETAILS_REQUEST :
        return { ...state,loading: true}
        case ORDER_DETAILS_SUCCESS :
        return { loading: false,
        order : action.payload}
        case ORDER_DETAILS_FAIL:
            return{loading:false,
            error:action.payload}
        case ORDER_DETAILS_RESET:                //changed for bug issue
            return{loading:true,orderItems:[],shippingAddress:{}}
        default:
            return state
    }
}
// export const orderDetailsReducer = (state = {loading:true, orderItems: [],shippingAddress: {} }, action) => {
//     switch (action.type){
//         case  ORDER_DETAILS_REQUEST :
//         return { ...state,loading: true}
//         case ORDER_DETAILS_SUCCESS :
//         return { loading: false,
//         order : action.payload}
//         case ORDER_DETAILS_FAIL:
//             return{loading:false,
//             error:action.payload}
//         case ORDER_DETAILS_RESET:                //changed for bug issue
//             return{}
//         default:
//             return state
//     }
// }

export const orderPayReducer = (state = {}, action) => {
    switch (action.type){
        case  ORDER_PAY_REQUEST :
        return {loading: true}
        case ORDER_PAY_SUCCESS :
        return { loading: false,
        success: true}
        case ORDER_PAY_FAIL:
            return{loading:false,
            error:action.payload}
        case ORDER_PAY_RESET:
            return{}    
        default:
            return state
    }
}
export const myordersReducer = (state = { orders:[]}, action) => {
    switch (action.type){
        case  MY_ORDER_REQUEST :
        return {loading: true}

        case MY_ORDER_SUCCESS :
        return { loading: false,
        orders:action.payload.orders,
        orderPage:action.payload.orderPage,
        orderPages:action.payload.orderPages}

        case MY_ORDER_FAIL:
            return{loading:false,
            error:action.payload}
        case MY_ORDER_RESET:
            return {orders:[]}    
        default:
            return state
    }
}
export const ordersDetailsReducer = (state = { allOrders:[]}, action) => {
    switch (action.type){
        case  ALL_ORDER_REQUEST :
        return {loading: true}

        case ALL_ORDER_SUCCESS :
        return { loading: false,
        allOrders:action.payload.allOrders,
        page: action.payload.allOrderPage,
        pages:action.payload.allOrderPages
        }

        case ALL_ORDER_FAIL:
            return{loading:false,
            error:action.payload}
        case ALL_ORDER_RESET:
            return{
                allOrders : []
            }
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type){
        case  ORDER_DELIVER_REQUEST :
        return {loading: true}
        case ORDER_DELIVER_SUCCESS :
        return { loading: false,
        success: true}
        case ORDER_DELIVER_FAIL:
            return{loading:false,
            error:action.payload}
        case ORDER_DELIVER_RESET:
            return{}    
        default:
            return state
    }
}