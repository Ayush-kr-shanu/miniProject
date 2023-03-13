const express = require('express');
const productsRoute = express.Router();
const {authMiddleware} = require('../middleware/middleware');
const {UserModel}=require('../models/user.model')
const {authorise}=require('../middleware/authorise')

productsRoute.get("/products", authMiddleware, authorise(["customer", "seller"]), (req,res)=>{
  res.status(200).send("This is product page")
})

productsRoute.get("/addproducts",  authMiddleware, authorise(["seller"]), (req,res)=>{
  res.status(200).send("This is Add-product page for seller only")
})

productsRoute.get("/deleteproducts",  authMiddleware, authorise(["seller"]), (req,res)=>{
  res.status(200).send("This is delete-product page for seller only")
})


module.exports={
   productsRoute
}