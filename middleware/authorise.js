const authorise= (permittedRole)=>{
    return (req,res,next)=>{
        const userRole=req.user.role
        if(permittedRole.includes(userRole)){
            next()
        }else{
            res.send("Unathorized")
        }
    }
}

module.exports={
    authorise
}