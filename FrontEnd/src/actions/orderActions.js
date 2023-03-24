import axios from 'axios'
import { ORDER_CREATE_REQUEST,
        ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL} from "../constants/orderConstant";   

export const createOrder = (order) => async (dispatch,getState) => {
        try {
            dispatch({
                type : ORDER_CREATE_REQUEST
            })
    
            const {userLogin :{userInfo}} = getState()
            const config = {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization :`Bearer ${userInfo.token}`
                }
            }
    
            const {data} = await axios.post('api/orders',order,config)
    
            dispatch({
                type : ORDER_CREATE_SUCCESS,
                payload : data
            })
           
        } catch (error) {
            dispatch({
                type : ORDER_CREATE_FAIL,
                payload : error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
            
        }
    }
export const getOrderDetails = (id) => async (dispatch,getState) => {
        try {
            dispatch({
                type : ORDER_DETAILS_REQUEST
            })
    
            const {userLogin :{userInfo}} = getState()
            const config = {
                headers : {
                    Authorization :`Bearer ${userInfo.token}`
                }
            }
    
            const {data} = await axios.get(`/api/orders/${id}`,config)
    
            dispatch({
                type : ORDER_DETAILS_SUCCESS,
                payload : data
            })
           
        } catch (error) {
            dispatch({
                type : ORDER_DETAILS_FAIL,
                payload : error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
            
        }
    }
export const payOrder = (orderId,paymentResult) => async (dispatch,getState) => {
        try {
            dispatch({
                type : ORDER_PAY_REQUEST
            })
    
            const {userLogin :{userInfo}} = getState()
            const config = {
                headers : {
                    'Content-Type':'application/json',
                    Authorization :`Bearer ${userInfo.token}`
                }
            }
    
            const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
    
            dispatch({
                type : ORDER_PAY_SUCCESS,
                payload : data
            })
           
        } catch (error) {
            dispatch({
                type : ORDER_PAY_FAIL,
                payload : error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
            
        }
    }

export const myOrdersAction = (pageNumber='') => async(dispatch,getState) =>{

        try {
            dispatch({type: MY_ORDER_REQUEST})

            const {userLogin :{userInfo}} = getState()
            const config = {
                headers : {
                    Authorization :`Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(`/api/orders/myorders?pageNumber=${pageNumber}`,config)

            dispatch({type:MY_ORDER_SUCCESS,
            payload:data})


        } catch (error) {
            dispatch({
                type : MY_ORDER_FAIL,
                payload : error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            })
        }

    }
    
export const allOrdersAction = (pageNumber='') => async(dispatch,getState) =>{

        try {
            dispatch({type: ALL_ORDER_REQUEST})

            const {userLogin :{userInfo}} = getState()
            const config = {
                headers : {
                    Authorization :`Bearer ${userInfo.token}`
                }
            }

            const {data} = await axios.get(`/api/orders?pageNumber=${pageNumber}`,config)

            dispatch({type:ALL_ORDER_SUCCESS,
            payload:data})


        } catch (error) {
            dispatch({
                type : ALL_ORDER_FAIL,
                payload : error.response && error.response.data.message
                ?error.response.data.message
                :error.message
            }
        )
    }

}

export const deliverOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({
            type : ORDER_DELIVER_REQUEST
        })

        const {userLogin :{userInfo}} = getState()
        const config = {
            headers : {
                Authorization :`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${order._id}/deliver`,{},config)

        dispatch({
            type : ORDER_DELIVER_SUCCESS,
            payload : data
        })
       
    } catch (error) {
        dispatch({
            type : ORDER_DELIVER_FAIL,
            payload : error.response && error.response.data.message
            ?error.response.data.message
            :error.message
        })
        
    }
}