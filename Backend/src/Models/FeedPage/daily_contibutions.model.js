import mongoose from "mongoose";

const dailtyContributionsSchema = new mongoose.Schema({
   

    status: {type:String, required:true}, 

    created_at: {type: Date, default: Date.now}, 

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} 
})

export const DailyContributions = mongoose.model("DailyContributions", dailtyContributionsSchema);

