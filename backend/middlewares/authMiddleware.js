import jwt from "jsonwebtoken"
const authMiddleware=(req,res,next)=>{
    
    
    const token = req.cookies.jwt
    
    if(!token){
        return res.status(402).json({message:"No token"})
    }
    try{
        console.log("Hello")
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        console.log("Hello",decoded)
        
        next()
    }
    catch(e){
       console.log("Hello Catch")
       console.log(e.message)
       return res.status(401).json({message:e.message})
    }
    


}
export default authMiddleware