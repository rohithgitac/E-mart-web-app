import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { topProductsAction } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const{loading,error,topProducts} = productTopRated

    useEffect(() => {
        dispatch(topProductsAction())
    },[dispatch])
  return (
    loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
    (<Carousel className='carouselfull' pause='hover' >
        {topProducts.map(product => (
            <Carousel.Item key={product._id} className='align-items-center'>
                <Link to={`/product/${product._id}`}>
                    <Image className='d-block w-100 mt-md-3 mt-sm-5' src={product.image}
                     alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} @ rs.{product.price}/-</h2>

                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>)

  )
}

export default ProductCarousel