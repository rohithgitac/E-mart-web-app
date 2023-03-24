import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
    <title>{title}</title>
<meta name='description' content={description}/>
    <meta name='keywords' content={keywords}/>
  </Helmet>
  )
}

Meta.defaultProps = {
    title : 'Welcome to E-mart',
    description : 'Quality products at best price',
    keywords : 'Buy latest smartphones, buy electronics'
}

export default Meta