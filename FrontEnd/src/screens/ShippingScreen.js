import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import Checkoutsteps from "../components/Checkoutsteps";

const ShippingScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [phone, setPhone] = useState(shippingAddress.phone);

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,phone}))
    navigate('/payment')
  }
  return (
     <> <Checkoutsteps step1 step2 />
    <FormContainer><h3 className="text-center mt-3">Shipping Details</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="enter your address "
            value={address} required
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="enter city "
            value={city} required
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="postalcode">
          <FormLabel>Postal code</FormLabel>
          <FormControl
            type="text"
            placeholder="enter your postalcode "
            value={postalCode} required
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="phone">
          <FormLabel> Phone</FormLabel>
          <FormControl
            type="number"
            placeholder="enter your phone "
            value={phone}required
            onChange={(e) => setPhone(e.target.value)}
          ></FormControl>
        </FormGroup>
        <div className='d-flex justify-content-end' >
        <Button type="submit" variant='outline-success'className='mt-2 my-button-addtocart'>
          Continue
        </Button>
        </div>
      </Form>
    </FormContainer></>
  );
};

export default ShippingScreen;
