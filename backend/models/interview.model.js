import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema(
    {
        uuid:{type:String},
        username:{type:String},
        jobposition:{type:String},
        jobdescription:{type:String},
        yearsofexperience:{type:Number},
        questionsandanswers:[{
            question:{type:String},
            answer:{type:String}
        }
        ],
        usersanswers: [
            {
                type: String,
                default: ""
            }
        ],
        feedback: [
            {
                rating: { type: String, default: "" }, 
                feedback: { type: String, default: "" }, 
              },
          ],
    },
    {
        timestamps:true
    }
)
const Interview = mongoose.model("Interview",interviewSchema)
export default Interview