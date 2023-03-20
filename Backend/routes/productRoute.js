import express from "express";
const router = express.Router()
import { getProducts,getProductById ,deleteProduct, updateProduct, createProduct} from "../controllers/productController.js";
import { protect , admin} from "../middleware/authMiddleware.js";


// Fetch all products
// GET api/products
// public access
router.route('/').get(getProducts).post(protect,admin,createProduct)
// Fetch a single product by its id
// GET api/products/:id
// public access
router.route('/:id')
    .get(getProductById)
    .delete(protect,admin,deleteProduct)
    .put(protect,admin,updateProduct)




export default router