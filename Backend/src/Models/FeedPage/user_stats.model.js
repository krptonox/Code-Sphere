import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
    // id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each user statistics record.

    total_solved: {type:Number, default: 0},

    easy_solved: {type:Number, default: 0}, 

    medium_solved: {type:Number, default: 0}, 

    hard_solved: {type:Number, default: 0},

    current_streak: {type:Number, default: 0}, 

    longest_streak: {type:Number, default: 0}, 

    current_rating: {type:Number, default: 0}, 

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} 
},{
    timestamps:true 
})

export const UserStats = mongoose.model("UserStats", userStatsSchema);

