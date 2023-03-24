import React, { useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate,useParams} from 'react-router-dom'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts,deleteProducts, createProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'


const ProductListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const pageNumber= params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const{ loading, error, products,page,pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const{ userInfo } = userLogin
   
    const productDelete = useSelector(state => state.productDelete)
    const{ loading:loadingDelete,error: errorDelete, success : successDelete } = productDelete
   
    const productCreate = useSelector(state => state.productCreate)
    const{ loading:loadingCreate,
        error: errorCreate,
        success : successCreate,
        product : createdProduct } = productCreate

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('',pageNumber))          //no func() here
        }

    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,pageNumber])
    
    const deleteHandler = (id,name)=>{
        if(window.confirm(`Are you sure to delete ${name}..?`)){

           dispatch(deleteProducts(id))
        }
    }
    
    const createProductHandler = () =>{
        dispatch(createProducts())
    }


  return (
    <>

        <Row className='mt-3'>
            <Col className='justify-content-end' >
                <h1>Products</h1>
            </Col>
            <Col className='mb-2 d-flex justify-content-end'>
            <Button onClick={createProductHandler}>
                <i className='fas fa-plus'></i>Create Product 
            </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader/> } 
        { errorDelete && <Message variant='danger'>{errorDelete}</Message>} 
        
        {loadingCreate && <Loader/> } 
        { errorCreate && <Message variant='danger'>{errorCreate}</Message>} 

        {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>
        :(
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>I.D</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>Rs.{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td> <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' 
                        onClick={()=>{deleteHandler(product._id,product.name)}}>
                            <i className='fas fa-trash' ></i>
                        </Button>
                        </td>
                    </tr>
                    )}
                    
                </tbody>
            </Table>
            <Paginate page={page} pages={pages} isAdmin={true} />
            </>
        )}    
    </>
  )
}

export default ProductListScreen