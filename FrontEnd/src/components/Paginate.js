import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages,page,isAdmin=false,keyword='',isOrder=false,isAllOrders=false}) => {
  return (
    pages>1 && (
        <Pagination  className='justify-content-center'>
            {[...Array(pages).keys()].map(x =>  (
                <LinkContainer key={x+1} to={
                    !isAllOrders
                    ?
                    !isOrder
                    ?
                    !isAdmin 
                    ?
                    keyword 
                    ? 
                    `/search/${keyword}/page/${x+1}`
                    :
                    `/page/${x+1}`
                    :
                    `/admin/productslist/${x+1}`
                    :
                    `/profile/${x+1}`
                    :
                    `/admin/orderslist/${x+1}`}>
                        <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate