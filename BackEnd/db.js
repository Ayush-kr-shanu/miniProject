const mongoose=require('mongoose')
require('dotenv').config()

const connection=mongoose.connect('mongodb+srv://ayush:ayush@cluster0.lo4qsjy.mongodb.net/notesApi?retryWrites=true&w=majority')

module.exports={
    connection
}