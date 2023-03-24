import React from 'react'
import {Nav, NavItem, NavLink} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const Checkoutsteps = ({step1,step2,step3,step4}) => {
  return (
    <Nav className='justify-content-center '>
        <NavItem className='mx-0'>
            {step1 ? (
                <LinkContainer to='/login'className='bg-success text-white'>
                    <NavLink>Sign In</NavLink>
                </LinkContainer>
            ):(<NavLink className='disabled-button' disabled>Sign In</NavLink>)}
        </NavItem>
        <NavItem className='double-arrow'>&gt;&gt;</NavItem>
        <NavItem className='mx-0'>
            {step2 ? (
                <LinkContainer to='/shipping'className='bg-success text-white'>
                    <NavLink>Shipping</NavLink>
                </LinkContainer>
            ):(<NavLink className='disabled-button' disabled>Shipping</NavLink>)}
        </NavItem>
        <NavItem className='double-arrow'>&gt;&gt;</NavItem>
        <NavItem className='mx-0'>
            {step3 ? (
                <LinkContainer to='/payment'className='bg-success text-white'>
                    <NavLink>Payment</NavLink>
                </LinkContainer>
            ):(<NavLink  className='disabled-button' disabled>Payment</NavLink>)}
        </NavItem>
        <NavItem className='double-arrow'>&gt;&gt;</NavItem>
        <NavItem className='mx-0'>
            {step4 ? (
                <LinkContainer to='/placeorder'className='bg-success text-white'>
                    <NavLink>Place Order</NavLink>
                </LinkContainer>
            ):(<NavLink className='disabled-button' disabled>Place Order</NavLink>)}
        </NavItem>

    </Nav>
  )
}

export default Checkoutsteps