import mongoose, { connect } from "mongoose";
import  Color  from "colors";

const connectDB = async () =>{
    
    try {
    
        const conn = await mongoose.connect(process.env.MONDGO,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Mongodb connected : ${conn.connection.host}`.bgMagenta)
        
    } catch (error) {
        console.error(`Error : ${error.message}`.red.underline.bold)
        process.exit(1)
        
    }
}
export default connectDB