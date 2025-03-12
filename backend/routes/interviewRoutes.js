import { Router } from "express";
import {saveinterview,updateinterview,showinterview} from "../controllers/interviewController.js";
const interviewroutes = Router()
interviewroutes.post("/savedetails",saveinterview)
interviewroutes.post("/updatedetails",updateinterview)
interviewroutes.post("/showdetails",showinterview)
export default interviewroutes