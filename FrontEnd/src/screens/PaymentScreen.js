import React, { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormCheck,Col
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import Checkoutsteps from "../components/Checkoutsteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";


const PaymentScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart)

  const {shippingAddress} = cart

  if(!shippingAddress){
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('');


  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({type:ORDER_CREATE_RESET})
  },[dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    
    navigate('/placeorder')
   
  }
  return (
     <> <Checkoutsteps step1 step2 step3/>
    <FormContainer><h3 className="text-center mt-4">Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup className="m-3">
            <FormLabel as='legend'>
           <p> Select Method</p>
            </FormLabel>
        
        <Col>
            <FormCheck type="radio" label='Paypal OR Credit card'
            id='Paypal' name='paymentMethod' value='Paypal' 
            onChange={(e)=>{
                setPaymentMethod(e.target.value)
            }}>
            </FormCheck>

            <FormCheck type="radio" label='Cash on delivery'
            id='cashOnDelivery' name='paymentMethod' value='Cash on delivery'
            onChange={(e)=>{
                setPaymentMethod(e.target.value)
            }}>

            </FormCheck>
        </Col>
        </FormGroup>
        <div className='d-flex justify-content-end' >
        <Button type="submit" variant='outline-success'className='mt-2 my-button-addtocart'
         disabled={!paymentMethod}>
          Continue
        </Button>
        </div>
      </Form>
    </FormContainer></>
  );
};

export default PaymentScreen;
