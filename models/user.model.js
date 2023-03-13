const mongoose = require("mongoose");
const bcrypt=require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
    enum: ["customer", "seller"]
  }
});

userSchema.pre('save', async function(next){
  try {
    //Generate salte here
    const salt= await bcrypt.genSalt(10)

    //Hash the password with salt
    const hashedPassword=await bcrypt.hash(this.password, salt)

    //set the hashed password
    this.password=hashedPassword

    next()
  } catch (err) {
    next(err)
  }
})

const UserModel=mongoose.model('user', userSchema)

module.exports={
    UserModel
}