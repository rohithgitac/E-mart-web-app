import React from 'react'
import {Nav, NavItem, NavLink} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Checkoutsteps = ({step1,step2,step3,step4}) => {
  return (
    <Nav className='justify-content-center '>
        <NavItem>
            {step1 ? (
                <LinkContainer to='/login'className='bg-success text-white'>
                    <NavLink>Sign In</NavLink>
                </LinkContainer>
            ):(<NavLink disabled>Sign In</NavLink>)}
        </NavItem>

        <NavItem>
            {step2 ? (
                <LinkContainer to='/shipping'className='bg-success text-white'>
                    <NavLink>Shipping</NavLink>
                </LinkContainer>
            ):(<NavLink disabled>Shipping</NavLink>)}
        </NavItem>

        <NavItem>
            {step3 ? (
                <LinkContainer to='/payment'className='bg-success text-white'>
                    <NavLink>Payment</NavLink>
                </LinkContainer>
            ):(<NavLink disabled>Payment</NavLink>)}
        </NavItem>

        <NavItem>
            {step4 ? (
                <LinkContainer to='/placeorder'className='bg-success text-white'>
                    <NavLink>Place Order</NavLink>
                </LinkContainer>
            ):(<NavLink disabled>Place Order</NavLink>)}
        </NavItem>

    </Nav>
  )
}

export default Checkoutsteps