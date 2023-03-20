import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'


const Homescreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)

  const {loading,error,products} =productList

  useEffect(()=>{
    dispatch(listProducts())

  },[dispatch])

  return (
    <>
    <h2> Latest products</h2>
    {loading ? <Loader/>:error? <Message variant='danger'>{error}</Message>:
      <Row>
      {products.map((product,index)=>{
          return(
          <Col key={index} md={4} sm={12}>
          <Product product={product}/>
          </Col>
          )
          })}
  </Row>}  
  </>
  )
}

export default Homescreen