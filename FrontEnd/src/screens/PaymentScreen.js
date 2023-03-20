import React, { useState } from "react";
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

const PaymentScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart)

  const {shippingAddress} = cart

  if(!shippingAddress){
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('');


  const dispatch = useDispatch()

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
        <Button type="submit" className="mt-1" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer></>
  );
};

export default PaymentScreen;
