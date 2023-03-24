import asyncHandler from "express-async-handler";
import Product from '../model/productModel.js'


// Fetch all products
// GET api/products
// public access
const getProducts = asyncHandler( async (req,res) => {
   
    const pageSize =6
    const page = Number(req.query.pageNumber) || 1
 
    if(req.query.keyword ){
    var keywordname ={
          $or: [ { name:{$regex:req.query.keyword, $options:'i' }},
            { category:{  $regex:req.query.keyword,  $options:'i' }},
            {brand:{ $regex:req.query.keyword, $options:'i'} } 
            ] 
                }
    }else{
        keywordname = {}
    }    
   
    const count =await Product.countDocuments({...keywordname})
    const allproducts =await Product.find({...keywordname}).limit(pageSize)
                                  .skip(pageSize*(page-1))
    
    

    res.json({allproducts,page,pages:Math.ceil(count/pageSize)})
     
})
// Fetch a single product by its id
// GET api/products/:id
// public access
const getProductById = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
    res.json(product)}
    else{
        res.status(404)
        throw new Error('Product not found')
    }
     
})

// Delete a product
// DELETE api/products/:id
// private-admin access
const deleteProduct = asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
    await product.deleteOne()
    res.json({message:'Product deleted'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
     
})
// Create a product
// POST api/products
// private-admin access
const createProduct = asyncHandler( async (req,res) => {
    const product = new Product({
        name: 'sample name',
        price:0,
        image:'/images/sample.jpg',
        user:req.user._id,
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
// Update a product
// PUT api/products/:id
// private-admin access
const updateProduct = asyncHandler( async (req,res) => {
    const {name,
        price,
        image,
        description,
        brand,
        category,
        countInStock,
        } = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name,
        product.price = price,
        product.image = image,
        product.description = description,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


// Create new review
// POST api/products/:id/reviews
// private-admin access
const createProductReview = asyncHandler( async (req,res) => {
    const {
        rating,comment
        } = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed =product.reviews.find(r => r.user.toString() ===
            req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,item) => item.rating + acc ,0)/product.reviews.length
        await product.save()
        res.status(201).json({message:'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})
// Get top rated products
// GET api/products/top
// public
const getTopProducts = asyncHandler( async (req,res) => {
    const products = await Product.find({}).sort({rating:-1}).limit(4)
    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}