const express=require('express')
const { connection } = require('./config/db')
const { userRoute } = require('./routes/user.routes')
const { authMiddleware } = require('./middleware/middleware')
const { productsRoute } = require('./routes/product.routes')
const { authorise } = require('./middleware/authorise')
const app=express()

app.use(express.json())



app.get('/',(req,res)=>{
    res.send("Hello This is home page")
})

app.use('/user', userRoute)
app.use(authMiddleware)
app.use("/prod", productsRoute)


app.listen(4500,async()=>{
    try {
        await connection
        console.log("DB is connected");
    } catch (err) {
        console.log("DB not connected");
        console.log(err);
    }
    console.log("Port is running");
})