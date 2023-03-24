
import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, error , userInfo} = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email,password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl type='email' placeholder='enter email ' value={email}
          onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' placeholder='enter your password ' value={password}
          onChange={(e) => setPassword(e.target.value)}></FormControl>
        </FormGroup>
        <div className='d-flex justify-content-end' >
        <Button type='submit'variant='outline-success'className='mt-2 my-button-addtocart'>Sign In</Button> 
        </div>
      </Form>

      <Row className='py-3'>
        <Col>
        New to Emart ?<Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> Register</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen