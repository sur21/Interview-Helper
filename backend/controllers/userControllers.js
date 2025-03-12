import User from "../models/user.model.js"
import Interview from "../models/interview.model.js"
import bcrypt from "bcryptjs"
import token from "../utils/token.js";
const signup = async (req,res)=>{
    try{
        const {username,email,password,password_cofirmation}=req.body;
        if(password!==password_cofirmation){
            return res.status(400).json({message:"Password Does not match."})
        }
        const existingusername = await User.findOne({username})
        const existingemail = await User.findOne({email})
        if(existingusername || existingemail){
            return res.status(409).json({message:"User exist"})
        }
        const hashedpassword=await bcrypt.hash(password, 8);

        
        const newUser = new User({
            username,
            email,
            password:hashedpassword
        })
        await newUser.save()
        res.status(201).json({ message: "User registered successfully", username: username,email:email });
    }
    catch(e){
        res.status(500).json({message:e})
    }
}

const signin = async (req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUser=await User.findOne({username})
        if(!existingUser){
            return res.status(404).json({message:"User not found."})
        }
        const ispasswordValid = await bcrypt.compare(password,existingUser.password)
        if(!ispasswordValid){
            return res.status(400).json({message:"Password Invalid."})
        }
        token(res,existingUser)
        
        
    }
    catch(e){
        
        res.status(500).json({message:e.message
        })
    }
}

const logout = (req,res)=>{
     
      res.clearCookie("jwt",{
        httpOnly: true,  
        secure: true,    
        sameSite: "None", 
      }

      );
      

      return res.status(200).json({message:"Logout"})

}

const showprofile=async (req,res)=>{
    const username = req.params.username
    console.log("HEllo username")
   
    
    const uuid = req.body.id
    const interviewid = await Interview.findOne({uuid})
   
    if(!uuid){
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:"User not found 1"})
        }
        return res.status(203).json({message:"User details",user})
    }
    else{
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:"User not found 2"})
        }
        
        if(!interviewid){
            return res.status(405).json({message:"Id not found"})
        }
        return res.status(203).json({message:"User details",user,interviewid})
        
    }
}



export {signup,signin,logout,showprofile}