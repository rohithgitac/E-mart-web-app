import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useLocation,useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Button, Form, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails , adminUpdateUsers} from '../actions/userActions'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstant'
import FormContainer from '../components/FormContainer'

const AdminUserEditScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const userId = params.id
    const navigate = useNavigate()

    const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [isAdmin,setIsAdmin] = useState(false)

   const userDetails = useSelector(state => state.userDetails)
   const {loading,error,user} = userDetails

   const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
   const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdateAdmin

   useEffect(() => {
    if(successUpdate){
      dispatch({type: USER_UPDATE_ADMIN_RESET})
      navigate('/admin/userslist')
    }
    else{
      if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      }
      else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
    
   }, [dispatch,user,userId,successUpdate,navigate])
   
   const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(adminUpdateUsers({_id:user._id,name,email,isAdmin}))
   }

  return (
    <>
    <Link to='/admin/userslist' className='btn btn-light my-2'> &lt;&lt;Back </Link>
    <FormContainer>
      <h1>Edit User</h1>
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

        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl type='email' placeholder='enter email ' value={email}
          onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='isAdmin'>
          <FormCheck type='checkbox' label='is Admin ? ' checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}></FormCheck>
        </FormGroup>

        <Button type='submit' variant='primary'>Update</Button> 
      </Form>)}
    </FormContainer>
    </>
  )
}

export default AdminUserEditScreen