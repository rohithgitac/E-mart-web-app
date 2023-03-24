import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { CardGroup, Col, Row } from 'react-bootstrap'
import Meta from '../components/Meta'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'


const Homescreen = () => {

  const params= useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)

  const {loading,error,products,pages,page} =productList

  useEffect(()=>{
    dispatch(listProducts(keyword,pageNumber))

  },[dispatch,keyword,pageNumber])

  return (
    <>
    <Meta />
    {!keyword ? <ProductCarousel/> :
     (<Link to={'/'} className='btn'> &lt;&lt;Go back </Link>)}
    <h2 className='mt-3'> Latest products</h2>
    {loading ? <Loader/>:error? <Message variant='danger'>{error}</Message>:
    <>
      <Row>
      <CardGroup >
      {products.map((product,index)=>{
          return(
            <Col key={index} md={4} sm={12} >
            <div className="cardproducts">
         
          <Product product={product} />
          </div>
          </Col>
          )
          })}
      </CardGroup>
     </Row>
     <div className='mt-2'>
     <Paginate  pages={pages} page={page} keyword={keyword ? keyword : ''}/>
     </div>
     </>
      } 
  </>
  )
}

export default Homescreen