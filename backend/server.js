import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app =express()
app.use(express.json());
const port =process.env.PORT||3000
//middle ware
app.use(express.json())
app.use(cors()) //allow to connect frontend with backend
connectDB();
connectCloudinary();
//end points
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    console.log("request aayii")
    res.send("Api working ")
   // console.log("Cloudinary Config:", process.env.CLOUD_NAME, process.env.CLOUD_API_KEY);

})
app.listen(port,()=> console.log("server started ",port))