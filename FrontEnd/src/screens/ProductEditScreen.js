import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails ,updateProducts} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'

const ProductEditScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const productId = params.id
    const navigate = useNavigate()

   const [name,setName] = useState('')
   const [price,setPrice] = useState(0)
   const [image,setImage] = useState('')
   const [brand,setBrand] = useState('')
   const [category,setCategory] = useState('')
   const [description,setDescription] = useState('')
   const [countInStock,setCountInStock] = useState(0)

   const productDetails = useSelector(state => state.productDetails)
   const {loading,error,product} = productDetails
  
   const productUpdate = useSelector(state => state.productUpdate)
   const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate


   useEffect(() => {
    if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        navigate('/admin/productslist')
    }
    else{
        if(!product.name || product._id !== productId){
            dispatch(listProductDetails(productId))
          }
          else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setCountInStock(product.countInStock)
          }
    }   
   }, [dispatch,product,productId,navigate,successUpdate])
   
   const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(updateProducts({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
    }))
   }

  return (
    <>
    <Link to='/admin/productslist' className='btn btn-light my-2'> &lt;&lt;Back </Link>
    <FormContainer>
      <h1>Edit Product</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
    :
      (<Form onSubmit={submitHandler}>

        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl type='name' placeholder='enter your name ' value={name}
          onChange={(e) => setName(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='price'>
          <FormLabel>Price</FormLabel>
          <FormControl type='number' placeholder='enter price ' value={price}
          onChange={(e) => setPrice(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='image'>
          <FormLabel>Image</FormLabel>
          <FormControl type='text' placeholder='enter image Url' value={image}
          onChange={(e) => setImage(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='brand'>
          <FormLabel>Brand</FormLabel>
          <FormControl type='text' placeholder='enter brand ' value={brand}
          onChange={(e) => setBrand(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='Count in stock'>
          <FormLabel>Count in stock</FormLabel>
          <FormControl type='number' placeholder='enter Count in stock ' value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='category'>
          <FormLabel>Category</FormLabel>
          <FormControl type='text' placeholder='enter category ' value={category}
          onChange={(e) => setCategory(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='description'>
          <FormLabel>Description</FormLabel>
          <FormControl type='text' placeholder='enter description ' value={description}
          onChange={(e) => setDescription(e.target.value)}></FormControl>
        </FormGroup>
        
        <Button type='submit' className='my-2' variant='primary'>Update</Button> 
      </Form>)}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen