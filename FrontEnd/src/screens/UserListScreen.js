import React, { useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUsers } from '../actions/userActions'


const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const{ loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const{ userInfo } = userLogin
   
    const userDelete = useSelector(state => state.userDelete)
    const{ success : successDelete } = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate('/login')
        }

    },[dispatch,navigate,userInfo,successDelete])
    
    const deleteHandler = (id,name)=>{
        if(window.confirm(`Are you sure to delete ${name}'s account..?`)){

            dispatch(deleteUsers(id))
        }
    }



  return (
    <>
        <h1>Users</h1>
        {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>
        :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>I.D</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>{user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>)
                        :
                        (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                        <td>{user.name==='Admin user'? <h6>Admin Head</h6> :(<div> <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>{deleteHandler(user._id,user.name)}}>
                            <i className='fas fa-trash' ></i>
                        </Button></div>)}
                        </td>
                    </tr>
                    )}
                    
                </tbody>
            </Table>
        )}
    
    
    
    </>
  )
}

export default UserListScreen