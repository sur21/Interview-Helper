import { Router } from "express";
import {signup,signin,logout,showprofile} from "../controllers/userControllers.js"
import authMiddleware from "../middlewares/authMiddleware.js"
const userroutes = Router()
userroutes.post("/register",signup)
userroutes.post("/signin",signin)
userroutes.post("/logout",logout)
userroutes.post("/validate/:username",authMiddleware,showprofile)
export default userroutes