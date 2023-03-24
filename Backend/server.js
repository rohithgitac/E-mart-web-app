import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/connection.js'

import Color from 'colors'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'

connectDB()

const app = express()

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)
app.use('/api/upload',uploadRoute)

app.get('/api/config/paypal',(req,res) =>
res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/Uploads',express.static(path.join(__dirname,'/Uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/FrontEnd/build')))
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'FrontEnd','build','index.html')))
}
else{
    app.get('/',(req,res)=>{
        res.send('api running...')
        
    })
}

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.blue.underline.bold))