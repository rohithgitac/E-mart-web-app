import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Form,Button, FormControl} from 'react-bootstrap'

const SearchBox = () => {
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState('')
  

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    
    }


  return (
    <Form inline='true' className='d-inline-flex' onSubmit={submitHandler} >
        <FormControl type='text' name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search product...'
        className='mr-sm-2' >
        </FormControl>
        <Button  type='submit' variant='outline-success'
        >Search</Button>
      
    </Form>
  )
}

export default SearchBox