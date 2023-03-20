import express from "express";
const router = express.Router()
import { authUser ,registerUser, getUserProfile,
     updateUserProfile, getUsers, deleteUser,
     updateUserByAdmin,getUserByIdAdmin} from "../controllers/userController.js";
import { protect , admin} from "../middleware/authMiddleware.js";

router.route('/').post(registerUser).get(protect,admin,getUsers)
// Fetch all products
// GET api/products
// public access
router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

router.route('/:id')
    .delete(protect,admin,deleteUser)
    .get(protect,admin,getUserByIdAdmin)
    .put(protect,admin,updateUserByAdmin)

export default router