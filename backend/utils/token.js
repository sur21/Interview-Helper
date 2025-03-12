
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path:".env.local"})
const token = (res,user)=>{
  try{
    const token = jwt.sign({id:user._id,username:user.username},process.env.SECRET_KEY,{expiresIn: '10d'})
    
   
  res.cookie("jwt", token, {
    httpOnly: true,  
    secure: true,    
    sameSite: "None", 
  });
    return res.status(200).json({ message: "User signed in successfully",username:user.username,email:user.email});
  }
  catch(e){
    res.status(500).json({ message: e.message });
  }
    

}
export default token