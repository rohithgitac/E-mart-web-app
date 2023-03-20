import asyncHandler from "express-async-handler";
import Product from '../model/productModel.js'


// Fetch all products
// GET api/products
// public access
const getProducts = asyncHandler( async (req,res) => {
    const products = await Product.find({})
    res.json(products)
     
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

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}