import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./model/userModel.js"
import Product from "./model/productModel.js"
import Order from "./model/orderModel.js";
import connectDB from "./config/connection.js";

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        console.log(adminUser)

        const sampleProducts = products.map((product)=>{
             return { ...product, user:adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('Data imported ..!!'.bgYellow);
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
        
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('Data destroyed ..!!'.bgRed);
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
        
    }
}

if(process.argv[2] === '-destroy'){
    destroyData()
}else
{
    importData()
}