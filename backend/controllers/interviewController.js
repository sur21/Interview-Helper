import Interview from "../models/interview.model.js";
import jwt from "jsonwebtoken"
const saveinterview = async (req,res)=>{
    
    
    const token = req.cookies.jwt
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    const username = decoded.username

    try {    
        const {
            uuid,
            jobPosition,
            jobDescription,
            yearsOfExperience,
            parsedQuestions
        } = req.body;
        const interview = new Interview({
            uuid,
            username:username,
            jobposition: jobPosition,
            jobdescription: jobDescription,
            yearsofexperience: yearsOfExperience,
            questionsandanswers: parsedQuestions 
        });
        await interview.save();        
        res.status(201).json({ message: 'Interview saved successfully!', interview });
    } catch (error) {
        
        res.status(500).json({ message: 'Error saving interview', error: error.message });
    }

}
const updateinterview = async (req,res)=>{
    
    const {answers,id,feedback}=req.body
    
    
    const uuid=id
    
    
    const interview = await Interview.findOneAndUpdate(
        { uuid },
        { $set: { usersanswers: answers,feedback: feedback } },
        
    );


    
    res.status(201).json({message:"Updated Successfully"})
    

}


const showinterview=async (req,res)=>{
    
   
    
    if (!req.body || Object.keys(req.body).length === 0){
        
        const token = req.cookies.jwt
        
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const username = decoded.username
        const interviews = await Interview.find({ username }).sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(6); 
    
        res.status(200).json({message:interviews})
        }
        else{

            
            
        
        const {uuid }=req.body
        const interviews = await Interview.find({ uuid }).sort({ createdAt: -1 }) 
        .limit(6); 
        
        res.status(200).json({message:interviews})
        

        }
        
    
   
}
export  {saveinterview,updateinterview,showinterview}