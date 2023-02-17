const express=require('express')
const {connection}=require('./db')

//importing user router
const {userRoute}=require('./routes/user.routes')
//importing note routes
const {noteRouter}=require('./routes/note.route')

//authentication middleware import
const {authenticate}=require('./middleware/authenticate.middleware')

const app=express()


app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.use('/user',userRoute)
app.use(authenticate)
app.use('/note',noteRouter)



app.listen(4500,async()=>{
    try {
        await connection
         console.log('DB connected');

    } catch (err) {
        console.log(err);
    }
})